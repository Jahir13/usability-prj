import type { ActiveSkill, Exercise, LessonTopic } from "../types";
import type { LevelContent } from "./content/contentTypes";
import { GRAMMAR_LEVELS_1_TO_4 } from "./content/grammarLevels1to4";
import { GRAMMAR_LEVELS_5_TO_7 } from "./content/grammarLevels5to7";
import { SPEAKING_CONTENT } from "./content/speaking";
import { LISTENING_CONTENT } from "./content/listening";
import { WRITING_CONTENT } from "./content/writing";

export type { LevelContent } from "./content/contentTypes";

export type ContentDatabase = Record<ActiveSkill, Record<string, LevelContent>>;

/**
 * Single source of truth for lesson and exercise content.
 *
 * Every level of every skill follows the same structure: 3 sub-lessons with
 * representative names, each one owning a bank of 3-5 exercises. The content
 * itself lives in ./content/* so each skill can be maintained separately.
 */
export const CONTENT_DATABASE: ContentDatabase = {
  grammar: {
    ...GRAMMAR_LEVELS_1_TO_4,
    ...GRAMMAR_LEVELS_5_TO_7,
  },
  speaking: SPEAKING_CONTENT,
  listening: LISTENING_CONTENT,
  writing: WRITING_CONTENT,
};

function buildLessonDatabase(database: ContentDatabase) {
  const lessons: Record<string, LessonTopic[]> = {};

  for (const skillLevels of Object.values(database)) {
    for (const [levelId, content] of Object.entries(skillLevels)) {
      lessons[levelId] = content.lessonTopics;
    }
  }

  return lessons;
}

function buildExerciseDatabase(database: ContentDatabase) {
  const exercises: Record<string, Exercise[]> = {};

  for (const skillLevels of Object.values(database)) {
    for (const [levelId, content] of Object.entries(skillLevels)) {
      exercises[levelId] = content.exercises || content.lessonTopics.flatMap((t) => t.exercises || []);
    }
  }

  return exercises;
}

export const LESSONS_DATABASE = buildLessonDatabase(CONTENT_DATABASE);
export const EXERCISES_DATABASE = buildExerciseDatabase(CONTENT_DATABASE);

export function getLevelContent(skill: ActiveSkill, levelId: string) {
  return CONTENT_DATABASE[skill]?.[levelId];
}

/**
 * Resolves the exercise bank of one specific sub-lesson (topic) of a level.
 * Falls back to the level-wide bank only for legacy content that has not been
 * migrated to per-lesson banks.
 */
export function getTopicExercises(skill: ActiveSkill, levelId: string, topicId: string): Exercise[] {
  const content = getLevelContent(skill, levelId);
  if (!content) return [];
  const topic = content.lessonTopics.find((t) => t.id === topicId);
  if (topic?.exercises && topic.exercises.length > 0) return topic.exercises;
  return content.exercises || [];
}

/** Number of sub-lessons of a level (used for progress labels). */
export function getLevelLessonsCount(skill: ActiveSkill, levelId: string): number {
  return getLevelContent(skill, levelId)?.lessonTopics.length ?? 0;
}
