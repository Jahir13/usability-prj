import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

export type LevelStatus = "done" | "in-progress" | "blocked";

type LevelNodeProps = {
  id?: string;
  status: LevelStatus;
  title: string;
  onClick?: () => void;
};

function extractLevelNumber(title: string) {
  const match = title.match(/\b(\d+)\b/);
  return match ? match[1] : "?";
}

const statusLabelByStatus: Record<LevelStatus, string> = {
  done: "✓ Done",
  "in-progress": "In Progress",
  blocked: "Blocked",
};

const circleStyle: CSSProperties = {
  width: figmaTokens.layout.learningPath.levelMarkerSize,
  height: figmaTokens.layout.learningPath.levelMarkerSize,
  borderRadius: figmaTokens.radii.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxSizing: "border-box",
};

const statusBadgeStyle: CSSProperties = {
  height: figmaTokens.layout.learningPath.levelBadgeHeight,
  borderRadius: figmaTokens.layout.learningPath.levelBadgeRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  paddingLeft: figmaTokens.layout.learningPath.levelBadgePaddingX,
  paddingRight: figmaTokens.layout.learningPath.levelBadgePaddingX,
  flexShrink: 0,
};

import { useState } from "react";

export function LevelNode({ status, title, onClick }: LevelNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDone = status === "done";
  const isProgress = status === "in-progress";
  const isBlocked = status === "blocked";
  const circleNumber = extractLevelNumber(title);

  const circle = isDone
    ? {
        background: figmaTokens.colors.surface.softGreen,
        color: figmaTokens.colors.success[500],
        content: "✓",
      }
    : isProgress
      ? {
          background: figmaTokens.colors.background.subtle,
          color: figmaTokens.colors.primary[500],
          border: `${figmaTokens.layout.learningPath.levelMarkerBorderWidth}px solid ${figmaTokens.colors.primary[500]}`,
          content: circleNumber,
        }
      : {
          background: figmaTokens.colors.danger.soft,
          color: figmaTokens.colors.danger[500],
          content: "🔒",
        };

  const badgeBackground = isDone
    ? figmaTokens.colors.surface.softGreen
    : isProgress
      ? figmaTokens.colors.background.subtle
      : figmaTokens.colors.danger.soft;

  const badgeColor = isDone
    ? figmaTokens.colors.success[500]
    : isProgress
      ? figmaTokens.colors.primary[500]
      : figmaTokens.colors.danger[500];

  return (
    <div
      onClick={!isBlocked ? onClick : undefined}
      onMouseEnter={() => !isBlocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: figmaTokens.layout.learningPath.levelRowGap,
        zIndex: figmaTokens.layout.learningPath.levelContentZIndex,
        cursor: isBlocked ? "not-allowed" : "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 8,
          height: figmaTokens.layout.learningPath.levelMarkerSize,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `-${figmaTokens.layout.learningPath.levelMarkerOffsetLeft}px`,
            top: 0,
            ...circleStyle,
            background: circle.background,
            color: circle.color,
            border: circle.border,
            opacity: isBlocked ? 0.7 : 1,
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          <span style={figmaTokens.typography.styles.learningPathLevelTitle}>
            {circle.content}
          </span>
        </div>
      </div>

      <div
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          background: figmaTokens.colors.surface.white,
          border: `${figmaTokens.borderWidths.hairline}px solid ${isProgress || isHovered ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default}`,
          boxShadow: isProgress || isHovered
            ? figmaTokens.layout.learningPath.unitCardActiveShadow
            : figmaTokens.layout.learningPath.unitCardShadow,
          borderRadius: figmaTokens.layout.learningPath.unitCardRadius,
          opacity: isBlocked
            ? figmaTokens.layout.learningPath.unitCardDisabledOpacity
            : 1,
          boxSizing: "border-box",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            padding: `${figmaTokens.layout.learningPath.unitCardPaddingY}px ${figmaTokens.layout.learningPath.unitCardPaddingX}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: figmaTokens.spacing[12],
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              ...figmaTokens.typography.styles.learningPathLevelTitle,
              color: figmaTokens.colors.text.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>

          <span
            style={{
              ...statusBadgeStyle,
              background: badgeBackground,
              color: badgeColor,
            }}
          >
            <span style={figmaTokens.typography.styles.learningPathLevelStatus}>
              {statusLabelByStatus[status]}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
