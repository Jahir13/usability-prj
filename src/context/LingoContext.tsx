import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { User, SkillProgress, LevelStatus, ActiveSkill } from "../types";

// --- STORAGE CONSTANTS ---
const STORAGE_VERSION = "v1";
const USER_KEY = `lingoGuru_${STORAGE_VERSION}_user`;

// --- DEFAULT STATE DEFINITIONS ---
const defaultUser: User = {
  username: "",
  fullName: "",
  avatarInitials: "",
  xp: 0,
  level: 1,
  streak: 0,
  settings: {
    sound: true,
    notifications: true,
    streakReminder: true,
  },
};

const initialSkillUnits = (activeSkill: ActiveSkill, completedLevels: string[]): SkillProgress => {
  const isBasicGreetingsDone = completedLevels.includes("basic-greetings");
  const isSimplePresentDone = completedLevels.includes("simple-present");
  const isPronounsDone = completedLevels.includes("pronouns");
  const isVerbToBeDone = completedLevels.includes("verb-to-be");
  const isBasicQuestionsDone = completedLevels.includes("basic-questions");
  const isPresentContinuousDone = completedLevels.includes("present-continuous");
  const isSimplePastDone = completedLevels.includes("simple-past");

  const isSpeakingL1Done = completedLevels.includes("speaking-l1");
  const isSpeakingL2Done = completedLevels.includes("speaking-l2");
  const isSpeakingL3Done = completedLevels.includes("speaking-l3");
  const isSpeakingL4Done = completedLevels.includes("speaking-l4");

  const isListeningL1Done = completedLevels.includes("listening-l1");
  const isListeningL2Done = completedLevels.includes("listening-l2");
  const isListeningL3Done = completedLevels.includes("listening-l3");
  const isListeningL4Done = completedLevels.includes("listening-l4");

  const isWritingL1Done = completedLevels.includes("writing-l1");
  const isWritingL2Done = completedLevels.includes("writing-l2");
  const isWritingL3Done = completedLevels.includes("writing-l3");
  const isWritingL4Done = completedLevels.includes("writing-l4");

  let units = [];

  switch (activeSkill) {
    case "grammar":
      units = [
        {
          id: "grammar-u1",
          title: "Basics of Sentence Construction",
          levels: [
            { id: "basic-greetings", title: "Level 1 — Basic greetings", status: (isBasicGreetingsDone ? "done" : "current") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100, xpReward: 100 },
            { id: "simple-present", title: "Level 2 — Simple Present", status: (isSimplePresentDone ? "done" : isBasicGreetingsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150, xpReward: 150 },
            { id: "pronouns", title: "Level 3 — Pronouns", status: (isPronounsDone ? "done" : isSimplePresentDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200, xpReward: 200 },
            { id: "verb-to-be", title: "Level 4 — Verb To Be", status: (isVerbToBeDone ? "done" : isPronounsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 350, xpReward: 350 },
          ],
        },
        {
          id: "grammar-u2",
          title: "Complex Sentence Structures",
          levels: [
            { id: "basic-questions", title: "Level 5 — Basic Questions", status: (isBasicQuestionsDone ? "done" : isVerbToBeDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 400, xpReward: 400 },
            { id: "present-continuous", title: "Level 6 — Present Continuous", status: (isPresentContinuousDone ? "done" : isBasicQuestionsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 450, xpReward: 450 },
            { id: "simple-past", title: "Level 7 — Simple Past", status: (isSimplePastDone ? "done" : isPresentContinuousDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 500, xpReward: 500 },
          ],
        },
      ];
      break;
    case "speaking":
      units = [
        {
          id: "speaking-u1",
          title: "Introduce Yourself",
          levels: [
            { id: "speaking-l1", title: "Level 1 — Introduce Your Name", status: (isSpeakingL1Done ? "done" : isBasicGreetingsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100, xpReward: 100 },
            { id: "speaking-l2", title: "Level 2 — Talk About Hobbies", status: (isSpeakingL2Done ? "done" : isSpeakingL1Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150, xpReward: 150 },
          ],
        },
        {
          id: "speaking-u2",
          title: "Social Situations",
          levels: [
            { id: "speaking-l3", title: "Level 3 — Small Talk", status: (isSpeakingL3Done ? "done" : isSpeakingL2Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200, xpReward: 200 },
            { id: "speaking-l4", title: "Level 4 — Ordering Food", status: (isSpeakingL4Done ? "done" : isSpeakingL3Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250, xpReward: 250 },
          ],
        },
      ];
      break;
    case "listening":
      units = [
        {
          id: "listening-u1",
          title: "Everyday Comprehension",
          levels: [
            { id: "listening-l1", title: "Level 1 — Numbers & Dates", status: (isListeningL1Done ? "done" : isBasicGreetingsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100, xpReward: 100 },
            { id: "listening-l2", title: "Level 2 — Asking Directions", status: (isListeningL2Done ? "done" : isListeningL1Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150, xpReward: 150 },
          ],
        },
        {
          id: "listening-u2",
          title: "Media & Culture",
          levels: [
            { id: "listening-l3", title: "Level 3 — Movie Dialogues", status: (isListeningL3Done ? "done" : isListeningL2Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200, xpReward: 200 },
            { id: "listening-l4", title: "Level 4 — News Broadcasts", status: (isListeningL4Done ? "done" : isListeningL3Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250, xpReward: 250 },
          ],
        },
      ];
      break;
    case "writing":
      units = [
        {
          id: "writing-u1",
          title: "Construct Basic Sentences",
          levels: [
            { id: "writing-l1", title: "Level 1 — Punctuation Basics", status: (isWritingL1Done ? "done" : isBasicGreetingsDone ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100, xpReward: 100 },
            { id: "writing-l2", title: "Level 2 — Writing Email Drafts", status: (isWritingL2Done ? "done" : isWritingL1Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150, xpReward: 150 },
          ],
        },
        {
          id: "writing-u2",
          title: "Paragraph Construction",
          levels: [
            { id: "writing-l3", title: "Level 3 — Argumentative Paragraphs", status: (isWritingL3Done ? "done" : isWritingL2Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200, xpReward: 200 },
            { id: "writing-l4", title: "Level 4 — Storytelling", status: (isWritingL4Done ? "done" : isWritingL3Done ? "current" : "locked") as LevelStatus, exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250, xpReward: 250 },
          ],
        },
      ];
      break;
  }

  // Calculate percentage dynamically
  const allLevels = units.flatMap((u) => u.levels);
  const doneLevels = allLevels.filter((l) => l.status === "done").length;
  const completedPercent = allLevels.length > 0 ? Math.round((doneLevels / allLevels.length) * 100) : 0;

  return {
    skill: activeSkill,
    completedPercent,
    percent: completedPercent,
    levels: allLevels,
    units,
  };
};

const getInitialProgress = (completedLevels: string[]): SkillProgress[] => {
  return [
    initialSkillUnits("grammar", completedLevels),
    initialSkillUnits("speaking", completedLevels),
    initialSkillUnits("listening", completedLevels),
    initialSkillUnits("writing", completedLevels),
  ];
};

// --- USER CONTEXT ---
type UserAction =
  | { type: "ADD_XP"; payload: number }
  | { type: "INCREMENT_STREAK" }
  | { type: "UPDATE_SETTINGS"; payload: Partial<User["settings"]> }
  | { type: "SET_PROFILE"; payload: { username: string; fullName: string; avatarInitials: string; email?: string; nativeLanguage?: string } };

function userReducer(state: User, action: UserAction): User {
  switch (action.type) {
    case "ADD_XP": {
      const newXp = state.xp + action.payload;
      const newLevel = newXp >= 2000 ? 4 : newXp >= 1000 ? 3 : newXp >= 500 ? 2 : 1;
      return { ...state, xp: newXp, level: newLevel };
    }
    case "INCREMENT_STREAK":
      return { ...state, streak: state.streak + 1 };
    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case "SET_PROFILE":
      return {
        ...state,
        username: action.payload.username,
        fullName: action.payload.fullName,
        avatarInitials: action.payload.avatarInitials,
        email: action.payload.email || "",
        nativeLanguage: action.payload.nativeLanguage || "",
        xp: action.payload.username ? state.xp : 0,
        streak: action.payload.username ? state.streak : 0,
        level: action.payload.username ? state.level : 1,
      };
    default:
      return state;
  }
}

interface UserContextType {
  user: User;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  updateSettings: (settings: Partial<User["settings"]>) => void;
  setProfile: (username: string, fullName: string, initials: string, email?: string, nativeLanguage?: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// --- PROGRESS CONTEXT ---
type ProgressAction =
  | { type: "COMPLETE_LEVEL"; payload: { skill: ActiveSkill; levelId: string } }
  | { type: "LOAD_COMPLETED"; payload: string[] };

function progressReducer(state: SkillProgress[], action: ProgressAction): SkillProgress[] {
  switch (action.type) {
    case "COMPLETE_LEVEL": {
      const { skill, levelId } = action.payload;
      return state.map((sp) => {
        if (sp.skill !== skill) return sp;

        let targetLevelFound = false;
        let updatedNext = false;

        const updatedUnits = sp.units.map((unit) => {
          const updatedLevels = unit.levels.map((level) => {
            if (level.id === levelId) {
              targetLevelFound = true;
              return { ...level, status: "done" as const };
            }
            if (targetLevelFound && !updatedNext) {
              if (level.status === "locked") {
                updatedNext = true;
                return { ...level, status: "current" as const };
              }
            }
            return level;
          });
          return { ...unit, levels: updatedLevels };
        });

        const flatLevels = updatedUnits.flatMap((u) => u.levels);
        const nextIndex = flatLevels.findIndex((l) => l.id === levelId) + 1;
        if (nextIndex > 0 && nextIndex < flatLevels.length) {
          const nextLevel = flatLevels[nextIndex];
          if (nextLevel && nextLevel.status === "locked") {
            updatedUnits.forEach((u) => {
              const matched = u.levels.find((l) => l.id === nextLevel.id);
              if (matched) {
                matched.status = "current";
              }
            });
          }
        }

        const allLevels = updatedUnits.flatMap((u) => u.levels);
        const doneLevels = allLevels.filter((l) => l.status === "done").length;
        const completedPercent = allLevels.length > 0 ? Math.round((doneLevels / allLevels.length) * 100) : 0;

        return { ...sp, units: updatedUnits, completedPercent };
      });
    }
    case "LOAD_COMPLETED": {
      const completed = action.payload;
      return [
        initialSkillUnits("grammar", completed),
        initialSkillUnits("speaking", completed),
        initialSkillUnits("listening", completed),
        initialSkillUnits("writing", completed),
      ];
    }
    default:
      return state;
  }
}

interface ProgressContextType {
  progress: SkillProgress[];
  completeLevel: (skill: ActiveSkill, levelId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// --- EXERCISE SESSION CONTEXT ---
interface ExerciseSessionState {
  levelId: string;
  exercises: any[];
  currentExerciseIndex: number;
  results: any[];
  elapsedTime: number;
  isPaused: boolean;
  isFinished: boolean;
}

const initialSessionState: ExerciseSessionState = {
  levelId: "",
  exercises: [],
  currentExerciseIndex: 0,
  results: [],
  elapsedTime: 0,
  isPaused: false,
  isFinished: false,
};

type SessionAction =
  | { type: "START_SESSION"; payload: { levelId: string; exercises: any[] } }
  | { type: "SUBMIT_ANSWER"; payload: any }
  | { type: "TICK_TIMER" }
  | { type: "TOGGLE_PAUSE"; payload?: boolean }
  | { type: "NEXT_EXERCISE" }
  | { type: "RESET_SESSION" };

function sessionReducer(state: ExerciseSessionState, action: SessionAction): ExerciseSessionState {
  switch (action.type) {
    case "START_SESSION":
      return {
        ...initialSessionState,
        levelId: action.payload.levelId,
        exercises: action.payload.exercises,
        isFinished: false,
      };
    case "SUBMIT_ANSWER": {
      const newResults = [...state.results, action.payload];
      return {
        ...state,
        results: newResults,
      };
    }
    case "TICK_TIMER":
      if (state.isPaused || state.isFinished) return state;
      return { ...state, elapsedTime: state.elapsedTime + 1 };
    case "TOGGLE_PAUSE":
      return { ...state, isPaused: action.payload !== undefined ? action.payload : !state.isPaused };
    case "NEXT_EXERCISE": {
      const nextIdx = state.currentExerciseIndex + 1;
      const isFinished = nextIdx >= state.exercises.length;
      return {
        ...state,
        currentExerciseIndex: isFinished ? state.currentExerciseIndex : nextIdx,
        isFinished,
      };
    }
    case "RESET_SESSION":
      return initialSessionState;
    default:
      return state;
  }
}

interface ExerciseSessionContextType {
  session: ExerciseSessionState;
  startSession: (levelId: string, exercises: any[]) => void;
  submitAnswer: (exerciseId: string, givenAnswer: string, isCorrect: boolean) => void;
  tickTimer: () => void;
  togglePause: (paused?: boolean) => void;
  nextExercise: () => void;
  resetSession: () => void;
}

const ExerciseSessionContext = createContext<ExerciseSessionContextType | undefined>(undefined);

const UserProvider = UserContext.Provider;
const ProgressProvider = ProgressContext.Provider;
const ExerciseSessionProvider = ExerciseSessionContext.Provider;

// --- EXPORTED PROVIDER ---
export function LingoProviders({ children }: { children: React.ReactNode }) {
  const [user, userDispatch] = useReducer(userReducer, defaultUser, (initial) => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  const [completedLevelIds, setCompletedLevelIds] = useReducer(
    (state: string[], action: { type: "ADD" | "LOAD" | "CLEAR"; payload?: string | string[] }) => {
      if (action.type === "ADD") {
        const item = action.payload as string;
        if (state.includes(item)) return state;
        const newState = [...state, item];
        localStorage.setItem(`lingoGuru_${STORAGE_VERSION}_completed_ids`, JSON.stringify(newState));
        return newState;
      } else if (action.type === "CLEAR") {
        localStorage.removeItem(`lingoGuru_${STORAGE_VERSION}_completed_ids`);
        return [];
      } else {
        return action.payload as string[];
      }
    },
    [],
    () => {
      try {
        const saved = localStorage.getItem(`lingoGuru_${STORAGE_VERSION}_completed_ids`);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
  );

  const [progress, progressDispatch] = useReducer(progressReducer, completedLevelIds, (completed) => {
    return getInitialProgress(completed);
  });

  const [session, sessionDispatch] = useReducer(sessionReducer, initialSessionState);

  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to write user to localStorage", e);
    }
  }, [user]);

  useEffect(() => {
    progressDispatch({ type: "LOAD_COMPLETED", payload: completedLevelIds });
  }, [completedLevelIds]);

  useEffect(() => {
    if (session.exercises.length === 0 || session.isFinished || session.isPaused) return;
    const interval = setInterval(() => {
      sessionDispatch({ type: "TICK_TIMER" });
    }, 1000);
    return () => clearInterval(interval);
  }, [session.exercises.length, session.isFinished, session.isPaused]);

  const userActions: UserContextType = {
    user,
    addXp: (amount) => userDispatch({ type: "ADD_XP", payload: amount }),
    incrementStreak: () => userDispatch({ type: "INCREMENT_STREAK" }),
    updateSettings: (settings) => userDispatch({ type: "UPDATE_SETTINGS", payload: settings }),
    setProfile: (username, fullName, avatarInitials, email, nativeLanguage) => {
      userDispatch({ type: "SET_PROFILE", payload: { username, fullName, avatarInitials, email, nativeLanguage } });
      setCompletedLevelIds({ type: "CLEAR" });
    },
  };

  const progressActions: ProgressContextType = {
    progress,
    completeLevel: (skill, levelId) => {
      setCompletedLevelIds({ type: "ADD", payload: levelId });
      progressDispatch({ type: "COMPLETE_LEVEL", payload: { skill, levelId } });
    },
  };

  const sessionActions: ExerciseSessionContextType = {
    session,
    startSession: (levelId, exercises) => sessionDispatch({ type: "START_SESSION", payload: { levelId, exercises } }),
    submitAnswer: (exerciseId, givenAnswer, isCorrect) =>
      sessionDispatch({ type: "SUBMIT_ANSWER", payload: { exerciseId, givenAnswer, isCorrect } }),
    tickTimer: () => sessionDispatch({ type: "TICK_TIMER" }),
    togglePause: (paused) => sessionDispatch({ type: "TOGGLE_PAUSE", payload: paused }),
    nextExercise: () => sessionDispatch({ type: "NEXT_EXERCISE" }),
    resetSession: () => sessionDispatch({ type: "RESET_SESSION" }),
  };

  return (
    <UserProvider value={userActions}>
      <ProgressProvider value={progressActions}>
        <ExerciseSessionProvider value={sessionActions}>
          {children}
        </ExerciseSessionProvider>
      </ProgressProvider>
    </UserProvider>
  );
}

// --- CONTEXT HOOKS ---
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within LingoProviders");
  }
  return context;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within LingoProviders");
  }
  return context;
}

export function useExerciseSession() {
  const context = useContext(ExerciseSessionContext);
  if (!context) {
    throw new Error("useExerciseSession must be used within LingoProviders");
  }
  return context;
}
