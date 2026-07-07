import type { CSSProperties } from "react";
import { Pause } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

type GameNavProps = {
  progress: number;
  counter: number;
  onPause: () => void;
};

const navHeight = figmaTokens.spacing[48];
const pauseButtonGap = figmaTokens.spacing[8];
const progressTrackHeight = figmaTokens.spacing[8];
const progressSideInset = figmaTokens.spacing[16];
const counterSize = figmaTokens.spacing[64];

const pauseButtonStyle: CSSProperties = {
  border: 0,
  padding: 0,
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  gap: pauseButtonGap,
  color: figmaTokens.colors.text.primary,
  cursor: "pointer",
  flexShrink: 0,
};

const pauseIconStyle: CSSProperties = {
  display: "block",
};

function clampProgress(progress: number) {
  if (Number.isNaN(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

export function GameNav({ progress, counter, onPause }: GameNavProps) {
  const clampedProgress = clampProgress(progress);

  return (
    <div
      style={{
        height: navHeight,
        borderTop: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
      }}
      data-node-id="12:2563"
      data-name="GameNav"
    >
      <button
        type="button"
        onClick={onPause}
        style={{
          ...pauseButtonStyle,
          marginLeft: figmaTokens.spacing[16],
        }}
        aria-label="Pause"
        data-node-id="12:2587"
        data-name="Button"
      >
        <Pause
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          style={pauseIconStyle}
        />
        <span
          style={{
            ...figmaTokens.typography.styles.label,
            lineHeight: "20px",
          }}
        >
          Pause
        </span>
      </button>

      <div
        style={{
          flex: "1 1 auto",
          paddingLeft: progressSideInset,
          paddingRight: progressSideInset,
          boxSizing: "border-box",
        }}
        data-node-id="12:2589"
        data-name="Progress"
      >
        <div
          role="progressbar"
          aria-label="Progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clampedProgress)}
          style={{
            height: progressTrackHeight,
            width: "100%",
            background: figmaTokens.colors.background.muted,
            borderRadius: figmaTokens.radii.full,
            overflow: "hidden",
          }}
          data-node-id="12:2589"
          data-name="Bar"
        >
          <div
            style={{
              width: `${clampedProgress}%`,
              height: "100%",
              background: figmaTokens.colors.primary[500],
              borderRadius: figmaTokens.radii.full,
            }}
            data-node-id="12:2589"
            data-name="Fill"
          />
        </div>
      </div>

      <div
        style={{
          width: counterSize,
          height: counterSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: figmaTokens.colors.text.primary,
          flexShrink: 0,
          transform: "translateY(-8px)",
        }}
        aria-label={`Counter ${counter}`}
        data-node-id="12:2591"
        data-name="Counter"
      >
        <span style={figmaTokens.typography.styles.label}>{counter}</span>
      </div>
    </div>
  );
}
