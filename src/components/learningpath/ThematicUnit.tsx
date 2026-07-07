import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";
import { LevelNode, type LevelStatus } from "./LevelNode";

type ThematicUnitProps = {
  title: string;
  levels: Array<{
    id: string;
    title: string;
    status: LevelStatus;
  }>;
  onLevelClick?: (levelId: string) => void;
};

const wrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
};

export function ThematicUnit({ title, levels, onLevelClick }: ThematicUnitProps) {
  return (
    <section style={wrapperStyle}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: figmaTokens.layout.learningPath.unitTagHeight,
          borderRadius: figmaTokens.layout.learningPath.unitTagRadius,
          paddingLeft: figmaTokens.layout.learningPath.unitTagPaddingX,
          paddingRight: figmaTokens.layout.learningPath.unitTagPaddingX,
          background: figmaTokens.colors.surface.softAmber,
          color: figmaTokens.colors.warning[500],
          boxSizing: "border-box",
        }}
      >
        <span style={figmaTokens.typography.styles.learningPathUnitTag}>
          Thematic Unit: {title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: figmaTokens.layout.learningPath.unitListGap,
          marginTop:
            figmaTokens.layout.learningPath.learningPathSectionMarginBottom,
          boxSizing: "border-box",
        }}
      >
        {levels.map((level) => (
          <LevelNode
            key={level.id}
            id={level.id}
            title={level.title}
            status={level.status}
            onClick={() => onLevelClick?.(level.id)}
          />
        ))}
      </div>
    </section>
  );
}
