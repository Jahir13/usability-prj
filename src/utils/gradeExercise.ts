import type { Exercise } from "../types";

export interface ExerciseAnswerState {
  selectedOption: string | null;
  inputText: string;
  reorderedWords: string[];
  recordingDone: boolean;
}

export function gradeExercise(exercise: Exercise, answer: ExerciseAnswerState): boolean {
  const { selectedOption, inputText, reorderedWords, recordingDone } = answer;

  if (exercise.type === "choice") {
    return selectedOption === exercise.correctAnswer;
  }
  if (exercise.type === "input") {
    return inputText.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
  }
  if (exercise.type === "reorder") {
    return reorderedWords.join(" ").toLowerCase() === exercise.correctAnswer.toLowerCase();
  }
  if (exercise.type === "speaking") {
    return recordingDone;
  }
  if (exercise.type === "listening") {
    const stripPunctuation = (s: string) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    return stripPunctuation(inputText.trim()) === stripPunctuation(exercise.correctAnswer);
  }
  return false;
}
