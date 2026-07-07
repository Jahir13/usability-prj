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
  instruction: string;
  prompt: string;
  options?: string[];
  correctAnswer: string;
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
}

export interface Lesson {
  id: string; // e.g. 'verb-to-be'
  levelId: string; // e.g. 'grammar-l4'
  title: string;
  levelText: string;
  topics: LessonTopic[];
}
