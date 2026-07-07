import { useState, type CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

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
  const [hoveredOpt, setHoveredOpt] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }} role="radiogroup" aria-label={prompt}>
        {options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isHovered = hoveredOpt === opt;
          
          const optionStyle: CSSProperties = {
            width: "100%",
            padding: "16px 20px",
            borderRadius: figmaTokens.radii.sm,
            border: `1.5px solid ${isSelected ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default}`,
            background: isSelected 
              ? figmaTokens.colors.primary.soft 
              : isHovered && !isSubmitted
                ? figmaTokens.colors.background.app
                : figmaTokens.colors.surface.white,
            color: figmaTokens.colors.text.primary,
            fontFamily: figmaTokens.typography.families.body,
            fontSize: 16,
            textAlign: "left",
            cursor: isSubmitted ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          };

          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isSubmitted}
              onClick={() => onSelect(opt)}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              style={optionStyle}
            >
              <span style={{ fontWeight: figmaTokens.typography.weights.medium }}>{opt}</span>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: figmaTokens.radii.full,
                border: `2px solid ${isSelected ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default}`,
                background: isSelected ? figmaTokens.colors.primary[500] : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: figmaTokens.colors.text.onPrimary,
                fontSize: 10,
              }}>
                {isSelected && "✓"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
