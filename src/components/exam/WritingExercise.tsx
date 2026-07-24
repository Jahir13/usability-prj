type WritingExerciseProps = {
  options: string[];
  selectedWords: string[];
  isSubmitted: boolean;
  onSelectWord: (word: string) => void;
};

export function WritingExercise({
  options,
  selectedWords,
  isSubmitted,
  onSelectWord,
}: WritingExerciseProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Answer box */}
      <div 
        className="min-h-[56px] w-full border-[1.5px] border-dashed border-border-default bg-background-app rounded-sm py-3 px-4 box-border flex flex-wrap gap-2 items-center text-left"
        aria-label="Your constructed sentence"
      >
        {selectedWords.map((word) => (
          <button
            key={word}
            type="button"
            disabled={isSubmitted}
            onClick={() => onSelectWord(word)}
            className="px-3 py-1.5 bg-surface-white border-[1.5px] border-primary-500 rounded-sm text-bodySmall font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed"
          >
            {word}
          </button>
        ))}
        {selectedWords.length === 0 && (
          <span className="text-text-secondary text-sm">
            Tap the words below to build your sentence...
          </span>
        )}
      </div>

      {/* Pool of words */}
      <div 
        className="flex flex-wrap gap-2 justify-center"
        aria-label="Available words"
      >
        {options.map((word) => {
          const isUsed = selectedWords.includes(word);

          return (
            <button
              key={word}
              type="button"
              disabled={isSubmitted || isUsed}
              onClick={() => onSelectWord(word)}
              className={`px-[18px] py-2.5 rounded-sm text-bodySmall font-medium transition-all ${
                isSubmitted || isUsed
                  ? "bg-background-muted text-text-secondary border-transparent opacity-50 cursor-not-allowed shadow-none"
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
