import type { CSSProperties, ReactNode } from "react";
import { figmaTokens } from "../../styles/tokens";

type RuleCardProps = {
  title: string;
  formula: ReactNode;
};

const cardStyle: CSSProperties = {
  width: "100%",
  minHeight: 152,
  background: figmaTokens.colors.background.elevated,
  borderLeft: `${figmaTokens.layout.grammarLesson.ruleCardBorderWidth}px solid ${figmaTokens.colors.primary[500]}`,
  borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
  padding: `${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingY}px ${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingX}px ${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingY}px ${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingX}px`,
  boxSizing: "border-box",
};

export function RuleCard({ title, formula }: RuleCardProps) {
  return (
    <section style={cardStyle} data-node-id="81:33" data-name="Container">
      <div
        style={{
          paddingBottom:
            figmaTokens.layout.grammarLesson.ruleCardTitleGapBottom,
          boxSizing: "border-box",
        }}
      >
        <span
          style={figmaTokens.typography.styles.eyebrow}
          data-node-id="81:37"
        >
          {title}
        </span>
      </div>

      <div data-node-id="81:38" style={{ boxSizing: "border-box" }}>
        {formula}
      </div>

      <div style={{ paddingTop: 12, boxSizing: "border-box" }}>
        <div
          style={{
            background: figmaTokens.colors.surface.white,
            borderRadius:
              figmaTokens.layout.grammarLesson.ruleFormulaChipRadius,
            paddingLeft:
              figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingX,
            paddingRight:
              figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingX,
            paddingTop:
              figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingY,
            paddingBottom:
              figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingY,
            boxSizing: "border-box",
            display: "inline-flex",
            alignItems: "center",
          }}
          data-node-id="81:41"
          data-name="Container"
        >
          <span
            style={{
              ...figmaTokens.typography.styles.mono,
              color: figmaTokens.colors.text.primary,
              whiteSpace: "nowrap",
            }}
            data-node-id="81:42"
          >
            Subject + am/is/are + complement
          </span>
        </div>
      </div>
    </section>
  );
}
