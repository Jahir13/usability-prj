type ChoiceExerciseProps = {
  prompt: string;
  options: string[];
  selectedOption: string | null;
  isSubmitted: boolean;
  onSelect: (option: string) => void;
};

export function ChoiceExercise({
  prompt,
  options,
  selectedOption,
  isSubmitted,
  onSelect,
}: ChoiceExerciseProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm m-0 border-l-4 border-primary-500 text-left">
        {prompt}
      </p>

      <div className="flex flex-col gap-3" role="radiogroup" aria-label={prompt}>
        {options.map((opt) => {
          const isSelected = selectedOption === opt;

          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isSubmitted}
              onClick={() => onSelect(opt)}
              className={`w-full p-4 px-5 rounded-sm border-[1.5px] text-text-primary font-body text-base text-left transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                isSubmitted ? "cursor-not-allowed" : "cursor-pointer"
              } ${
                isSelected
                  ? "border-primary-500 bg-primary-soft"
                  : "border-border-default bg-surface-white hover:bg-background-app"
              }`}
            >
              <span className="font-medium">{opt}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-text-onPrimary text-[10px] ${
                isSelected ? "border-primary-500 bg-primary-500" : "border-border-default bg-transparent"
              }`}>
                {isSelected && "✓"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
