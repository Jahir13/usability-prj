import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

type StartLevelButtonProps = {
  onStart: () => void;
  exercises: number;
  minutes: string;
  xp: string;
};

const buttonStyle: CSSProperties = {
  width: figmaTokens.layout.grammarLesson.startButtonWidth,
  height: figmaTokens.layout.grammarLesson.startButtonHeight,
  borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
  border: 0,
  background: figmaTokens.colors.primary[500],
  boxShadow: figmaTokens.layout.grammarLesson.startButtonShadow,
  color: figmaTokens.colors.text.onPrimary,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
};

export function StartLevelButton({
  onStart,
  exercises,
  minutes,
  xp,
}: StartLevelButtonProps) {
  return (
    <div
      style={{
        width: figmaTokens.layout.grammarLesson.startButtonWidth,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <button
        type="button"
        onClick={onStart}
        style={buttonStyle}
        data-node-id="81:69"
        data-name="Button"
      >
        <span
          style={{
            ...figmaTokens.typography.styles.label,
            fontSize: figmaTokens.layout.grammarLesson.startButtonTextSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.startButtonTextLineHeight}px`,
            color: figmaTokens.colors.text.onPrimary,
            whiteSpace: "nowrap",
          }}
          data-node-id="81:70"
        >
          Start the level! →
        </span>
      </button>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: figmaTokens.layout.grammarLesson.metadataRowGap,
          paddingTop: 16,
          boxSizing: "border-box",
        }}
        data-node-id="81:71"
      >
        <span
          style={{
            ...figmaTokens.typography.styles.labelSmall,
            fontSize: figmaTokens.layout.grammarLesson.metadataTextSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.metadataTextLineHeight}px`,
            color: figmaTokens.colors.text.secondary,
            whiteSpace: "nowrap",
          }}
          data-node-id="81:73"
        >
          {exercises} exercises
        </span>
        <span
          style={{
            ...figmaTokens.typography.styles.labelSmall,
            fontSize: figmaTokens.layout.grammarLesson.metadataDotSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.metadataDotLineHeight}px`,
            color: figmaTokens.colors.border.default,
            whiteSpace: "nowrap",
          }}
          data-node-id="81:75"
          aria-hidden="true"
        >
          ·
        </span>
        <span
          style={{
            ...figmaTokens.typography.styles.labelSmall,
            fontSize: figmaTokens.layout.grammarLesson.metadataTextSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.metadataTextLineHeight}px`,
            color: figmaTokens.colors.text.secondary,
            whiteSpace: "nowrap",
          }}
          data-node-id="81:77"
        >
          {minutes}
        </span>
        <span
          style={{
            ...figmaTokens.typography.styles.labelSmall,
            fontSize: figmaTokens.layout.grammarLesson.metadataDotSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.metadataDotLineHeight}px`,
            color: figmaTokens.colors.border.default,
            whiteSpace: "nowrap",
          }}
          data-node-id="81:79"
          aria-hidden="true"
        >
          ·
        </span>
        <span
          style={{
            ...figmaTokens.typography.styles.labelSmall,
            fontSize: figmaTokens.layout.grammarLesson.metadataTextSize,
            lineHeight: `${figmaTokens.layout.grammarLesson.metadataTextLineHeight}px`,
            color: figmaTokens.colors.success[500],
            whiteSpace: "nowrap",
          }}
          data-node-id="81:81"
        >
          {xp}
        </span>
      </div>
    </div>
  );
}
