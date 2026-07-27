import type { ChangeEvent } from "react";
import { Input } from "../ui/Input";
import { ReadableRegion } from "../ui/ReadableRegion";

type FillBlankExerciseProps = {
  prompt: string;
  value: string;
  isSubmitted: boolean;
  onChange: (value: string) => void;
  /** Label of the field, e.g. "Write the missing verb:". */
  answerLabel?: string;
  /** Format constraint shown under the field and announced with the field. */
  expectedFormat?: string;
  describedBy?: string;
};

/**
 * Typed answer exercise. The sentence is a focusable region and the field
 * carries an explicit label plus the expected format, so there is only one
 * possible reading of what has to be written.
 */
export function FillBlankExercise({
  prompt,
  value,
  isSubmitted,
  onChange,
  answerLabel = "Type your answer:",
  expectedFormat,
  describedBy,
}: FillBlankExerciseProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const formatId = expectedFormat ? "fill-blank-format" : undefined;
  const describedByIds = [describedBy, formatId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-4">
      <ReadableRegion label="Sentence to complete" className="w-full">
        <p className="text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm m-0 border-l-4 border-primary-500 text-left">
          {prompt}
        </p>
      </ReadableRegion>

      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="fill-blank-input" className="text-labelSmall text-text-secondary">
          {answerLabel}
        </label>
        <Input
          id="fill-blank-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          autoComplete="off"
          aria-describedby={describedByIds}
        />
        {expectedFormat && (
          <p id={formatId} className="text-caption text-text-secondary m-0">
            {expectedFormat}
          </p>
        )}
      </div>
    </div>
  );
}
