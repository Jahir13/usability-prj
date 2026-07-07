import type { CSSProperties, ReactNode } from "react";
import { figmaTokens } from "../../styles/tokens";

type ObjectivesChecklistProps = {
  levelText: string;
  title: string;
  description: string;
  objectives: string[];
};

const cardStyle: CSSProperties = {
  width: "100%",
  height: figmaTokens.layout.grammarLesson.levelCardHeight,
  borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
  background: figmaTokens.colors.surface.white,
  boxSizing: "border-box",
};

function ObjectiveItem({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: figmaTokens.layout.grammarLesson.objectivesItemGap,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: figmaTokens.layout.grammarLesson.objectivesIconSize,
          height: figmaTokens.layout.grammarLesson.objectivesIconSize,
          marginTop: figmaTokens.layout.grammarLesson.objectivesIconOffsetTop,
          borderRadius:
            figmaTokens.layout.grammarLesson.objectivesIconBorderRadius,
          background: figmaTokens.colors.warning[500],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: figmaTokens.colors.text.onPrimary,
          flexShrink: 0,
        }}
      >
        <span style={figmaTokens.typography.styles.caption}>✓</span>
      </div>
      <p
        style={{
          ...figmaTokens.typography.styles.bodySmall,
          color: figmaTokens.colors.text.primary,
          lineHeight: `${figmaTokens.layout.grammarLesson.objectivesTextLineHeight}px`,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </p>
    </div>
  );
}

export function ObjectivesChecklist({
  levelText,
  title,
  description,
  objectives,
}: ObjectivesChecklistProps) {
  return (
    <section style={cardStyle} data-node-id="81:4" data-name="Container">
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: `${figmaTokens.layout.grammarLesson.levelCardPaddingY}px ${figmaTokens.layout.grammarLesson.levelCardPaddingX}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingBottom: 24, boxSizing: "border-box" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: figmaTokens.layout.grammarLesson.levelBadgeHeight,
              paddingLeft: figmaTokens.layout.grammarLesson.levelBadgePaddingX,
              paddingRight: figmaTokens.layout.grammarLesson.levelBadgePaddingX,
              borderRadius: figmaTokens.layout.grammarLesson.levelBadgeRadius,
              background: figmaTokens.layout.grammarLesson.levelBadgeBackground,
              boxSizing: "border-box",
            }}
            data-node-id="81:6"
            data-name="Text"
          >
            <span style={figmaTokens.typography.styles.captionUppercase}>
              {levelText}
            </span>
          </div>
        </div>

        <div
          style={{ paddingBottom: 16, boxSizing: "border-box" }}
          data-node-id="81:8"
        >
          <h1
            style={{
              ...figmaTokens.typography.styles.sectionTitle,
              fontSize: figmaTokens.layout.grammarLesson.levelTitleSize,
              lineHeight: `${figmaTokens.layout.grammarLesson.levelTitleLineHeight}px`,
              color: figmaTokens.colors.text.primary,
              margin: 0,
              whiteSpace: "nowrap",
            }}
            data-node-id="81:10"
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            paddingBottom: figmaTokens.layout.grammarLesson.levelIntroBottomGap,
            boxSizing: "border-box",
          }}
          data-node-id="81:11"
        >
          <p
            style={{
              ...figmaTokens.typography.styles.body,
              color: figmaTokens.colors.text.primary,
              maxWidth: figmaTokens.layout.grammarLesson.levelIntroMaxWidth,
              margin: 0,
            }}
            data-node-id="81:13"
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: figmaTokens.layout.grammarLesson.objectivesGap,
            boxSizing: "border-box",
          }}
          data-node-id="81:14"
        >
          {objectives.map((objective) => (
            <ObjectiveItem key={objective}>{objective}</ObjectiveItem>
          ))}
        </div>
      </div>
    </section>
  );
}
