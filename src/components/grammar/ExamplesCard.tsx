import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

type ExamplePair = {
  source: string;
  translation: string;
};

type ExamplesCardProps = {
  title: string;
  examples: ExamplePair[];
};

const cardStyle: CSSProperties = {
  width: "100%",
  minHeight: 215,
  background: figmaTokens.colors.surface.softAmber,
  borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
  boxSizing: "border-box",
};

function ExampleRow({ example }: { example: ExamplePair }) {
  return (
    <div style={{ width: 331 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: figmaTokens.spacing[12],
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: figmaTokens.layout.grammarLesson.examplesRowLeftWidth,
            height: figmaTokens.layout.grammarLesson.examplesRowHeight,
            borderRadius: figmaTokens.layout.grammarLesson.examplesRowRadius,
            background: figmaTokens.colors.warning.soft,
            boxSizing: "border-box",
          }}
          data-node-id="81:49"
          data-name="Container"
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <p
              style={{
                position: "absolute",
                left: figmaTokens.layout.grammarLesson.examplesRowPaddingX,
                top: figmaTokens.layout.grammarLesson.examplesRowPaddingY,
                margin: 0,
                ...figmaTokens.typography.styles.label,
                color: figmaTokens.colors.text.primary,
                whiteSpace: "nowrap",
              }}
            >
              {example.source}
            </p>
          </div>
        </div>

        <span
          style={{
            width: figmaTokens.layout.grammarLesson.examplesRowArrowWidth,
            ...figmaTokens.typography.styles.caption,
            color: figmaTokens.layout.grammarLesson.examplesArrowColor,
            textAlign: "center",
            flexShrink: 0,
          }}
          data-node-id="81:51"
        >
          →
        </span>

        <div
          style={{
            width: figmaTokens.layout.grammarLesson.examplesRowRightWidth,
            height: 21,
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              ...figmaTokens.typography.styles.label,
              color:
                figmaTokens.layout.grammarLesson.examplesRowTranslationColor,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {example.translation}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExamplesCard({ title, examples }: ExamplesCardProps) {
  return (
    <section style={cardStyle} data-node-id="81:43" data-name="Container">
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: figmaTokens.layout.grammarLesson.examplesCardPadding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            paddingBottom:
              figmaTokens.layout.grammarLesson.examplesTitleGapBottom,
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              ...figmaTokens.typography.styles.eyebrow,
              color: figmaTokens.colors.warning[500],
            }}
            data-node-id="81:46"
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: figmaTokens.layout.grammarLesson.examplesRowGap,
            boxSizing: "border-box",
          }}
          data-node-id="81:47"
        >
          {examples.map((example) => (
            <ExampleRow key={example.source} example={example} />
          ))}
        </div>
      </div>
    </section>
  );
}
