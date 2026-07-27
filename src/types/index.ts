export type LevelStatus = "done" | "current" | "locked";

export type ActiveSkill = "grammar" | "speaking" | "listening" | "writing";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  nativeLanguage: string;
  createdAt: string;
}

export interface Level {
  id: string;
  title: string;
  xpReward: number;
  status: LevelStatus;
  exercisesCount?: number;
  minutesLabel?: string;
  xpValue?: number;
}

export interface ThematicUnit {
  id: string;
  title: string;
  levels: Level[];
}

export interface SkillProgress {
  percent: number; // percent completed (starts at 0)
  completedPercent: number; // compatible version
  levels: Level[];
  skill: ActiveSkill;
  units: ThematicUnit[];
}

export interface UserProgress {
  totalXP: number;          // starts at 0
  currentStreak: number;    // starts at 0
  skills: {
    grammar: SkillProgress;
    listening: SkillProgress;
    speaking: SkillProgress;
    writing: SkillProgress;
  };
}

export interface User {
  username: string;
  fullName: string;
  avatarInitials: string;
  xp: number;
  level: number;
  streak: number;
  email?: string;
  nativeLanguage?: string;
  settings: {
    sound: boolean;
    notifications: boolean;
    streakReminder: boolean;
  };
}

export type ExerciseType = "choice" | "input" | "reorder" | "speaking" | "listening";

export interface Exercise {
  id: string;
  type: ExerciseType;
  /** Short imperative task: exactly what the learner must produce. */
  instruction: string;
  /**
   * Extra guidance that removes ambiguity ("write only the missing verb",
   * "use every word once"). Rendered as a focusable "How to answer" region and
   * wired to the answer field through aria-describedby.
   */
  hint?: string;
  prompt: string;
  /** Label of the answer field, e.g. "Write the missing verb:". */
  answerLabel?: string;
  /** Format constraint shown under the field, e.g. "One word, no punctuation." */
  expectedFormat?: string;
  /** Placeholder for typed answers; it should model the expected shape. */
  placeholder?: string;
  options?: string[];
  correctAnswer: string;
  /**
   * Other spellings or forms accepted as correct (contractions, synonyms).
   * Compared after normalization (lowercase, trimmed, punctuation removed).
   */
  acceptedAnswers?: string[];
  /**
   * When true, capital letters and punctuation are part of the answer and are
   * graded (used by the punctuation lessons). When false/absent the answer is
   * compared after lowercasing and removing punctuation.
   */
  strictFormat?: boolean;
  /** Why that answer is the only correct one; shown in the feedback panel. */
  explanation?: string;
  translation?: string;
  audioText?: string;
}

export interface ExerciseResult {
  exerciseId: string;
  givenAnswer: string;
  isCorrect: boolean;
}

export interface LessonTopic {
  id: string;
  label: string;
  state: "done" | "active" | "blocked";
  marker: string;
  levelText: string;
  title: string;
  description: string;
  objectives: string[];
  formula: string;
  formulaLabel: string;
  examples: Array<{ source: string; translation: string }>;
  /**
   * Own exercise bank for this specific sub-lesson (3-5 items recommended).
   * Optional for backward compatibility with levels not migrated yet:
   * when absent, the interface falls back to the level's shared exercise bank.
   */
  exercises?: Exercise[];
  /**
   * XP awarded when this specific sub-lesson is completed (level xpReward split across its lessons).
   * Optional for backward compatibility; falls back to the level's xpReward when absent.
   */
  xpReward?: number;
  /** Minutes label shown on the Start button for this specific sub-lesson. */
  minutesLabel?: string;
}

export interface Lesson {
  id: string; // e.g. 'verb-to-be'
  levelId: string; // e.g. 'grammar-l4'
  title: string;
  levelText: string;
  topics: LessonTopic[];
}
