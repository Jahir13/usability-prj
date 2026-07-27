import type { Exercise, LessonTopic } from "../../types";

/**
 * Content of one level of the learning path.
 *
 * Every level is authored the same way: 3 sub-lessons with representative
 * names, each one owning its own bank of 3-5 exercises.
 *
 * `exercises` (level-wide bank) is kept only for backward compatibility with
 * the pre-migration format and should not be used by new content.
 */
export type LevelContent = {
  lessonTopics: LessonTopic[];
  exercises?: Exercise[];
};

export type SkillContent = Record<string, LevelContent>;
