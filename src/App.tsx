import { useState, useEffect } from "react";
import { LingoProviders, useUser, useProgress } from "./context/LingoContext";
import { parseHash } from "./utils/router";
import { WelcomePage, AuthFormPage } from "./pages/Auth/AuthPages";
import { OnboardingModal } from "./pages/Auth/OnboardingModal";
import { LearningPathPage } from "./pages/LearningPath/LearningPathPage";
import { GrammarLessonPage } from "./pages/Grammar/GrammarLessonPage";
import { InteractiveExercisePage } from "./pages/Exam/InteractiveExercisePage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { ErrorBoundary } from "./components/exam/ErrorBoundary";
import type { ActiveSkill } from "./types";

function AppContent() {
  const { setProfile } = useUser();
  const { progress } = useProgress();

  const [hash, setHash] = useState(window.location.hash || "#/welcome");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeSkill, setActiveSkill] = useState<ActiveSkill>("grammar");

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || "#/welcome");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (newHash: string) => {
    window.location.hash = newHash;
  };

  // Route parser
  const match = parseHash(hash);

  /**
   * On every route change, update the document title and move focus to the
   * main region. Without this, a screen reader user who activates a level
   * keeps the focus on the old page and never hears that the view changed.
   * Pages that manage their own focus (the exercise screen) are unaffected,
   * because focus() does nothing on an element that is not focusable.
   */
  useEffect(() => {
    const titles: Record<string, string> = {
      "#/welcome": "Welcome",
      "#/onboarding": "Getting started",
      "#/auth": "Create your profile",
      "#/dashboard": "Learning path",
      "#/profile": "Your profile",
    };
    document.title = `${titles[match.pattern] || "Lesson"} · LingoGuru`;

    const main = document.querySelector("main");
    if (main instanceof HTMLElement) {
      main.focus();
    }
  }, [hash, match.pattern]);

  // Check onboarding status
  const [isOnboardingDone, setIsOnboardingDone] = useState(() => {
    try {
      return localStorage.getItem("lingoGuru_v1_onboarding_done") === "true";
    } catch {
      return false;
    }
  });

  // Handle forcing user back to onboarding if not done
  useEffect(() => {
    if (!isOnboardingDone) {
      if (match.pattern !== "#/welcome" && match.pattern !== "#/onboarding" && match.pattern !== "#/auth") {
        navigate("#/welcome");
      }
    } else {
      if (match.pattern === "#/welcome") {
        navigate("#/dashboard");
      }
    }
  }, [hash, isOnboardingDone]);

  // Route Guards: Prevent entering locked level exercises or details
  const isLevelLocked = (skill: ActiveSkill, levelId: string) => {
    const sp = progress.find((p) => p.skill === skill);
    const lv = sp?.levels.find((l) => l.id === levelId);
    return lv ? lv.status === "locked" : true;
  };

  // Main Route Router switch
  switch (match.pattern) {
    case "#/welcome":
      return <WelcomePage onStart={() => navigate("#/auth")} />;

    case "#/onboarding":
      return (
        <OnboardingModal
          currentStep={onboardingStep}
          totalSteps={3}
          onNext={() => {
            if (onboardingStep < 3) {
              setOnboardingStep((prev) => prev + 1);
            } else {
              localStorage.setItem("lingoGuru_v1_onboarding_done", "true");
              setIsOnboardingDone(true);
              navigate("#/dashboard");
            }
          }}
          onBack={() => {
            if (onboardingStep > 1) {
              setOnboardingStep((prev) => prev - 1);
            } else {
              navigate("#/welcome");
            }
          }}
          onSkip={() => {
            localStorage.setItem("lingoGuru_v1_onboarding_done", "true");
            setIsOnboardingDone(true);
            navigate("#/dashboard");
          }}
        />
      );

    case "#/auth":
      return (
        <AuthFormPage
          onSubmit={(username, fullName, email, nativeLanguage) => {
            const initials = fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            
            // Set profile values and reset progress for new user
            setProfile(username, fullName, initials, email, nativeLanguage);

            if (!isOnboardingDone) {
              navigate("#/onboarding");
            } else {
              navigate("#/dashboard");
            }
          }}
        />
      );

    case "#/dashboard":
      return (
        <LearningPathPage
          activeSkill={activeSkill}
          onSkillChange={setActiveSkill}
          onLevelClick={(levelId) => {
            // Locked levels are explained in the page's live region by
            // LevelNode, so no disruptive browser alert is used here.
            if (!isLevelLocked(activeSkill, levelId)) {
              navigate(`#/learn/${activeSkill}/${levelId}/lesson`);
            }
          }}
          onNavigate={(route) => navigate(route)}
        />
      );

    case "#/learn/:skill/:levelId": {
      const { skill, levelId } = match.params;
      const actSkill = skill as ActiveSkill;
      if (isLevelLocked(actSkill, levelId)) {
        navigate("#/dashboard");
        return null;
      }
      return (
        <GrammarLessonPage
          levelId={levelId}
          skill={actSkill}
          onStartLevel={(topicId) => {
            navigate(`#/learn/${skill}/${levelId}/${topicId}/exercise`);
          }}
          onNavigate={(route) => navigate(route)}
        />
      );
    }

    case "#/learn/:skill/:levelId/lesson": {
      const { skill, levelId } = match.params;
      const actSkill = skill as ActiveSkill;
      if (isLevelLocked(actSkill, levelId)) {
        navigate("#/dashboard");
        return null;
      }
      return (
        <GrammarLessonPage
          levelId={levelId}
          skill={actSkill}
          onStartLevel={(topicId) => {
            navigate(`#/learn/${skill}/${levelId}/${topicId}/exercise`);
          }}
          onNavigate={(route) => navigate(route)}
        />
      );
    }

    case "#/learn/:skill/:levelId/:topicId/exercise": {
      const { skill, levelId, topicId } = match.params;
      const actSkill = skill as ActiveSkill;
      if (isLevelLocked(actSkill, levelId)) {
        navigate("#/dashboard");
        return null;
      }
      return (
        <ErrorBoundary>
          <InteractiveExercisePage
            levelId={levelId}
            topicId={topicId}
            skill={actSkill}
            onNavigate={(route) => navigate(route)}
          />
        </ErrorBoundary>
      );
    }

    case "#/profile":
      return <ProfilePage onNavigate={(route) => navigate(route)} />;

    default:
      return <WelcomePage onStart={() => navigate("#/auth")} />;
  }
}

export default function App() {
  return (
    <LingoProviders>
      {/* WCAG 2.4.1: Skip link accesible global para saltar la navegación e ir directamente al contenido principal */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:text-primary-500 focus:font-bold focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Saltar al contenido principal
      </a>
      <AppContent />
    </LingoProviders>
  );
}
