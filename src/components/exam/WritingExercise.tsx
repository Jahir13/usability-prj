type WritingExerciseProps = {
  options: string[];
  /** Indices of `options` already placed in the answer, in order. */
  selectedIndexes: number[];
  isSubmitted: boolean;
  onToggleWord: (index: number) => void;
  describedBy?: string;
};

/**
 * Reorder exercise.
 *
 * Selection is tracked by index instead of by text, so a sentence can repeat a
 * word ("is", "the") without breaking. Each button says what it does ("Add ...
 * to the sentence" / "Remove ..."), and the sentence being built is announced
 * through a polite live region.
 */
export function WritingExercise({
  options,
  selectedIndexes,
  isSubmitted,
  onToggleWord,
  describedBy,
}: WritingExerciseProps) {
  const builtSentence = selectedIndexes.map((index) => options[index]).join(" ");

  return (
    <div className="flex flex-col gap-5" aria-describedby={describedBy}>
      {/* Answer box */}
      <div
        role="group"
        aria-label="Your sentence"
        className="min-h-[56px] w-full border-[1.5px] border-dashed border-border-default bg-background-app rounded-sm py-3 px-4 box-border flex flex-wrap gap-2 items-center text-left"
      >
        {selectedIndexes.map((optionIndex, position) => (
          <button
            key={`${optionIndex}-${position}`}
            type="button"
            disabled={isSubmitted}
            onClick={() => onToggleWord(optionIndex)}
            aria-label={`Remove "${options[optionIndex]}" from position ${position + 1} of your sentence`}
            className="px-3 py-1.5 bg-surface-white border-[1.5px] border-primary-500 rounded-sm text-bodySmall font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed"
          >
            {options[optionIndex]}
          </button>
        ))}
        {selectedIndexes.length === 0 && (
          /* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) para ratio 6.10:1 sobre background.app */
          <span className="text-text-secondaryAccessible font-medium text-sm">
            Select the words below, in order, to build your sentence...
          </span>
        )}
      </div>

      {/* Spoken feedback of the sentence built so far. */}
      <p role="status" aria-live="polite" className="sr-only">
        {builtSentence ? `Your sentence: ${builtSentence}` : "Your sentence is empty."}
      </p>

      {/* Pool of words */}
      <div role="group" aria-label="Available words" className="flex flex-wrap gap-2 justify-center">
        {options.map((word, index) => {
          const isUsed = selectedIndexes.includes(index);

          return (
            <button
              key={`${word}-${index}`}
              type="button"
              disabled={isSubmitted || isUsed}
              onClick={() => onToggleWord(index)}
              aria-label={`Add "${word}" to the sentence`}
              className={`px-[18px] py-2.5 rounded-sm text-bodySmall font-medium transition-all ${
                isSubmitted || isUsed
                  ? "bg-background-muted text-text-secondaryAccessible border-transparent opacity-50 cursor-not-allowed shadow-none"
                  : "bg-surface-white border-[1.5px] border-border-default text-text-primary hover:bg-background-app cursor-pointer shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
