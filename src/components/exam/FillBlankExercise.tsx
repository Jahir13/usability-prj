import type { ChangeEvent } from "react";
import { figmaTokens } from "../../styles/tokens";

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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{
        ...figmaTokens.typography.styles.body,
        fontSize: 18,
        color: figmaTokens.colors.text.tertiary,
        background: figmaTokens.colors.background.app,
        padding: "16px 20px",
        borderRadius: figmaTokens.radii.sm,
        lineHeight: "28px",
        margin: 0,
        borderLeft: `4px solid ${figmaTokens.colors.primary[500]}`,
      }}>
        {prompt}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label 
          htmlFor="fill-blank-input" 
          style={{ 
            ...figmaTokens.typography.styles.labelSmall, 
            color: figmaTokens.colors.text.secondary 
          }}
        >
          Type your answer:
        </label>
        <input
          id="fill-blank-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          placeholder="Type the correct word..."
          autoComplete="off"
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: figmaTokens.radii.sm,
            border: `2px solid ${figmaTokens.colors.primary[500]}`,
            fontSize: 16,
            fontFamily: figmaTokens.typography.families.body,
            color: figmaTokens.colors.text.primary,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
