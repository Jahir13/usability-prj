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
            if (isLevelLocked(activeSkill, levelId)) {
              alert("This level is locked! Complete previous levels first.");
            } else {
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
        alert("This level is locked!");
        navigate("#/dashboard");
        return null;
      }
      return (
        <GrammarLessonPage
          levelId={levelId}
          skill={actSkill}
          onStartLevel={() => {
            navigate(`#/learn/${skill}/${levelId}/exercise`);
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
          onStartLevel={() => {
            navigate(`#/learn/${skill}/${levelId}/exercise`);
          }}
          onNavigate={(route) => navigate(route)}
        />
      );
    }

    case "#/learn/:skill/:levelId/exercise": {
      const { skill, levelId } = match.params;
      const actSkill = skill as ActiveSkill;
      if (isLevelLocked(actSkill, levelId)) {
        navigate("#/dashboard");
        return null;
      }
      return (
        <ErrorBoundary>
          <InteractiveExercisePage
            levelId={levelId}
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
      <AppContent />
    </LingoProviders>
  );
}
