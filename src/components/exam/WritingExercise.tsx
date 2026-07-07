import { useState } from "react";
import { figmaTokens } from "../../styles/tokens";

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
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Answer box */}
      <div 
        style={{
          minHeight: 56,
          width: "100%",
          border: `1.5px dashed ${figmaTokens.colors.border.default}`,
          background: figmaTokens.colors.background.app,
          borderRadius: figmaTokens.radii.sm,
          padding: "12px 16px",
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
        aria-label="Your constructed sentence"
      >
        {selectedWords.map((word) => (
          <button
            key={word}
            type="button"
            disabled={isSubmitted}
            onClick={() => onSelectWord(word)}
            style={{
              padding: "6px 12px",
              background: figmaTokens.colors.surface.white,
              border: `1.5px solid ${figmaTokens.colors.primary[500]}`,
              borderRadius: figmaTokens.radii.sm,
              cursor: isSubmitted ? "not-allowed" : "pointer",
              color: figmaTokens.colors.text.primary,
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            {word}
          </button>
        ))}
        {selectedWords.length === 0 && (
          <span style={{ color: figmaTokens.colors.text.secondary, fontSize: 14 }}>
            Tap the words below to build your sentence...
          </span>
        )}
      </div>

      {/* Pool of words */}
      <div 
        style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
        aria-label="Available words"
      >
        {options.map((word) => {
          const isUsed = selectedWords.includes(word);
          const isHovered = hoveredWord === word;

          return (
            <button
              key={word}
              type="button"
              disabled={isSubmitted || isUsed}
              onClick={() => onSelectWord(word)}
              onMouseEnter={() => setHoveredWord(word)}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                padding: "10px 18px",
                background: isUsed 
                  ? figmaTokens.colors.background.muted 
                  : isHovered
                    ? figmaTokens.colors.background.app
                    : figmaTokens.colors.surface.white,
                border: `1.5px solid ${isUsed ? "transparent" : figmaTokens.colors.border.default}`,
                borderRadius: figmaTokens.radii.sm,
                cursor: isSubmitted || isUsed ? "not-allowed" : "pointer",
                color: isUsed ? figmaTokens.colors.text.secondary : figmaTokens.colors.text.primary,
                opacity: isUsed ? 0.5 : 1,
                fontSize: 15,
                fontWeight: "500",
                boxShadow: isUsed ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.15s ease",
              }}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
