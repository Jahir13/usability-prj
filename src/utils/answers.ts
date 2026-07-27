import type { Exercise } from "../types";

/**
 * Normalizes a typed answer before comparing it.
 *
 * Default mode is forgiving: it ignores letter case, punctuation and extra
 * spaces, so the learner is graded on the language and not on typing details.
 *
 * When the exercise sets `strictFormat` (punctuation lessons) capital letters
 * and punctuation are part of what is being taught, so only the surrounding
 * and duplicated whitespace is normalized.
 */
export function normalizeAnswer(value: string, strictFormat = false): string {
  const collapsed = value.replace(/\s+/g, " ").trim();

  if (strictFormat) {
    return collapsed;
  }

  return collapsed
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Apostrophes are optional in the forgiving mode: "dont" === "don't". */
function withoutApostrophes(value: string) {
  return value.replace(/['’]/g, "");
}

/**
 * Compares a typed answer with the expected one and with every alternative
 * listed in `acceptedAnswers`.
 */
export function isTypedAnswerCorrect(exercise: Exercise, givenAnswer: string): boolean {
  const strict = exercise.strictFormat === true;
  const given = normalizeAnswer(givenAnswer, strict);
  const candidates = [exercise.correctAnswer, ...(exercise.acceptedAnswers || [])];

  return candidates.some((candidate) => {
    const expected = normalizeAnswer(candidate, strict);
    if (given === expected) return true;
    if (strict) return false;
    return withoutApostrophes(given) === withoutApostrophes(expected);
  });
}

/**
 * Compares the sentence built in a reorder exercise (already joined with
 * single spaces) with the expected sentence.
 */
export function isReorderAnswerCorrect(exercise: Exercise, builtSentence: string): boolean {
  return isTypedAnswerCorrect(exercise, builtSentence);
}
