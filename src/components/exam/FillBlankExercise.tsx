import type { ChangeEvent } from "react";
import { Input } from "../ui/Input";

type FillBlankExerciseProps = {
  prompt: string;
  value: string;
  isSubmitted: boolean;
  onChange: (value: string) => void;
};

export function FillBlankExercise({
  prompt,
  value,
  isSubmitted,
  onChange,
}: FillBlankExerciseProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm m-0 border-l-4 border-primary-500 text-left">
        {prompt}
      </p>

      <div className="flex flex-col gap-2 text-left">
        <label 
          htmlFor="fill-blank-input" 
          className="text-labelSmall text-text-secondary"
        >
          Type your answer:
        </label>
        <Input
          id="fill-blank-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          placeholder="Type the correct word..."
          autoComplete="off"
        />
      </div>
    </div>
  );
}
