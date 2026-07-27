import { useEffect, useRef, useState } from "react";
import type { ActiveChallenge } from "../../types/boardGame";
import { gradeExercise } from "../../utils/gradeExercise";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import { ChoiceExercise } from "../exam/ChoiceExercise";
import { FillBlankExercise } from "../exam/FillBlankExercise";
import { WritingExercise } from "../exam/WritingExercise";
import { FeedbackModal } from "../exam/FeedbackModal";
import { Button } from "../ui/Button";

type ChallengeModalProps = {
  challenge: ActiveChallenge | null;
  currentPlayerName: string;
  onResolve: (isCorrect: boolean) => void;
};

// Copies PauseModal's focus-trap / Escape / focus-restore pattern verbatim,
// with one rule change: there is no way to skip the question. Before an
// answer is submitted, Escape does nothing — answering is the only way
// forward, same as clicking "Submit answer" once an option is chosen.
// After an answer is submitted, Escape behaves like "Continue", so there is
// still always a reachable action and never a silent dismiss.
export function ChallengeModal({ challenge, currentPlayerName, onResolve }: ChallengeModalProps) {
  const strings = useBoardGameStrings();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isOpen = challenge !== null;

  // No reset-on-change effect needed: the parent mounts a fresh
  // ChallengeModal (keyed by exercise id) for every new challenge, so this
  // component's local answer state always starts clean already.
  const handleSubmit = () => {
    if (!challenge) return;
    const correct = gradeExercise(challenge.exercise, { selectedOption, inputText, reorderedWords, recordingDone: false });
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  // Keep a ref to the latest submit/resolve behavior so the focus-trap effect
  // below only needs to run on open/close, not on every keystroke.
  const latestRef = useRef({ isSubmitted, isCorrect, onResolve });
  useEffect(() => {
    latestRef.current = { isSubmitted, isCorrect, onResolve };
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement;
    headingRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const { isSubmitted: submitted, isCorrect: correct, onResolve: resolve } = latestRef.current;
        if (submitted) {
          resolve(correct);
        }
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);

  if (!challenge) return null;

  const { exercise } = challenge;

  const isAnswerMissing =
    (exercise.type === "choice" && !selectedOption) ||
    (exercise.type === "input" && !inputText) ||
    (exercise.type === "reorder" && reorderedWords.length === 0);

  const handleWordSelect = (word: string) => {
    setReorderedWords((prev) => (prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]));
  };

  return (
    <div className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm flex items-center justify-center z-[9999] box-border p-4">
      <div
        ref={containerRef}
        className="w-full max-w-[560px] bg-surface-white rounded-lg border border-border-default shadow-2xl p-6 box-border flex flex-col gap-5 animate-modalFadeIn text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-title"
      >
        <div>
          <h3
            id="challenge-title"
            ref={headingRef}
            tabIndex={-1}
            className="font-heading font-bold text-[20px] text-text-primary m-0 mb-1 focus-visible:outline-none"
          >
            {strings.challengeHeading(currentPlayerName)}
          </h3>
          <p className="text-bodySmall text-text-tertiary m-0" lang="en">
            {exercise.instruction}
          </p>
        </div>

        {/* The exercise itself is always in English (the language being
            learned) even when the rest of this dialog is shown in the
            player's native language — marked explicitly so screen readers
            switch pronunciation for this passage (WCAG 3.1.2). */}
        <div lang="en">
          {exercise.type === "choice" && exercise.options && (
            <ChoiceExercise
              prompt={exercise.prompt}
              options={exercise.options}
              selectedOption={selectedOption}
              isSubmitted={isSubmitted}
              onSelect={setSelectedOption}
            />
          )}
          {exercise.type === "input" && (
            <FillBlankExercise
              prompt={exercise.prompt}
              value={inputText}
              isSubmitted={isSubmitted}
              onChange={setInputText}
            />
          )}
          {exercise.type === "reorder" && exercise.options && (
            <WritingExercise
              options={exercise.options}
              selectedWords={reorderedWords}
              isSubmitted={isSubmitted}
              onSelectWord={handleWordSelect}
            />
          )}

          {isSubmitted && (
            <FeedbackModal
              isCorrect={isCorrect}
              correctAnswer={exercise.correctAnswer}
              translation={exercise.translation}
            />
          )}
        </div>

        <div className="flex gap-3 w-full">
          {!isSubmitted ? (
            <Button type="button" variant="primary" size="md" className="w-full" disabled={isAnswerMissing} onClick={handleSubmit}>
              {strings.challengeSubmit}
            </Button>
          ) : (
            <Button type="button" variant="primary" size="md" className="w-full" onClick={() => onResolve(isCorrect)}>
              {strings.challengeContinue}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
