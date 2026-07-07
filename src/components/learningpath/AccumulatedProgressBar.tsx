import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

type AccumulatedProgressBarProps = {
  progress: number;
};

function clampProgress(progress: number) {
  if (Number.isNaN(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

const cardStyle: CSSProperties = {
  width: "100%",
  background: figmaTokens.colors.surface.white,
  boxShadow: figmaTokens.layout.learningPath.accumulatedCardShadow,
  borderRadius: figmaTokens.layout.learningPath.accumulatedCardRadius,
  boxSizing: "border-box",
  padding: figmaTokens.layout.learningPath.accumulatedCardPadding,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

export function AccumulatedProgressBar({
  progress,
}: AccumulatedProgressBarProps) {
  const clampedProgress = clampProgress(progress);

  return (
    <div style={cardStyle} data-node-id="12:1630" data-name="Container">
      <span
        style={figmaTokens.typography.styles.learningPathHeading}
        data-node-id="12:1632"
      >
        Accumulated
      </span>
      <div
        style={{
          width: "100%",
          paddingTop: figmaTokens.layout.learningPath.accumulatedProgressGapTop,
          boxSizing: "border-box",
        }}
      >
        <div
          role="progressbar"
          aria-label="Accumulated progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clampedProgress)}
          style={{
            width: "100%",
            height:
              figmaTokens.layout.learningPath.accumulatedProgressTrackHeight,
            background: figmaTokens.colors.background.muted,
            borderRadius: figmaTokens.radii.full,
            overflow: "hidden",
          }}
          data-node-id="12:1634"
        >
          <div
            style={{
              width: `${clampedProgress}%`,
              height: "100%",
              background: figmaTokens.colors.primary[500],
              borderRadius: figmaTokens.radii.full,
            }}
            data-node-id="12:1635"
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          paddingTop: figmaTokens.layout.learningPath.accumulatedPercentGapTop,
          boxSizing: "border-box",
        }}
      >
        <span
          style={figmaTokens.typography.styles.label}
          data-node-id="12:1637"
        >
          {Math.round(clampedProgress)}% Completed
        </span>
      </div>
    </div>
  );
}
