type ChoiceExerciseProps = {
  prompt: string;
  options: string[];
  selectedOption: string | null;
  isSubmitted: boolean;
  onSelect: (option: string) => void;
  /** Unique name for the radio group (one per exercise). */
  name: string;
  /** Id of the guidance region, wired with aria-describedby. */
  describedBy?: string;
};

/**
 * Multiple choice exercise built on real radio inputs inside a fieldset.
 *
 * With native radios the screen reader announces the sentence (the legend),
 * the position of each option ("2 of 3") and its checked state, and the arrow
 * keys move between options as users expect.
 */
export function ChoiceExercise({
  prompt,
  options,
  selectedOption,
  isSubmitted,
  onSelect,
  name,
  describedBy,
}: ChoiceExerciseProps) {
  return (
    <fieldset
      className="border-0 p-0 m-0 min-w-0 block"
      aria-describedby={describedBy}
      disabled={isSubmitted}
    >
      {/* The legend is the accessible name of the group: the sentence itself. */}
      <legend className="w-full text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm mb-5 border-l-4 border-primary-500 text-left box-border float-none">
        {prompt}
      </legend>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt;

          return (
            <label
              key={opt}
              className={`block ${isSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() => onSelect(opt)}
                className="sr-only peer"
              />
              <span
                className={`w-full p-4 px-5 rounded-sm border-[1.5px] text-text-primary font-body text-base text-left transition-all flex items-center justify-between box-border peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-500 ${
                  isSelected
                    ? "border-primary-500 bg-primary-soft"
                    : "border-border-default bg-surface-white hover:bg-background-app"
                }`}
              >
                <span className="font-medium">{opt}</span>
                <span
                  aria-hidden="true"
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-text-onPrimary text-[10px] shrink-0 ${
                    isSelected ? "border-primary-500 bg-primary-500" : "border-border-default bg-transparent"
                  }`}
                >
                  {isSelected && "✓"}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
