import type { CSSProperties } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { figmaTokens } from "../../styles/tokens";
import { ObjectivesChecklist } from "../../components/grammar/ObjectivesChecklist";
import { ExamplesCard } from "../../components/grammar/ExamplesCard";
import { StartLevelButton } from "../../components/grammar/StartLevelButton";
import { LESSONS_DATABASE } from "../../config/lessonsData";
import type { ActiveSkill } from "../../types";
import { useProgress } from "../../context/LingoContext";

type LevelIntroPageProps = {
  levelId: string;
  skill: ActiveSkill;
  onStartLevel?: () => void;
  onNavigate: (route: string) => void;
};

const pageStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: figmaTokens.layout.levelIntro.pageHeight,
  background: figmaTokens.colors.background.app,
  overflow: "hidden",
  boxSizing: "border-box",
};

export function LevelIntroPage({
  levelId,
  onStartLevel = () => undefined,
  onNavigate,
}: LevelIntroPageProps) {
  const { progress } = useProgress();
  const topics = LESSONS_DATABASE[levelId] || [];
  const activeTopic = topics.find((t) => t.id === levelId) || topics[2] || topics[0];

  const allLevels = progress.flatMap((sp) => sp.units?.flatMap((u) => u.levels) || sp.levels || []);
  const currentLevel = allLevels.find((l) => l.id === levelId);
  const xpReward = currentLevel?.xpReward || 350;
  const exercisesCount = currentLevel?.exercisesCount || 5;
  const minutesLabel = currentLevel?.minutesLabel || "~4 mins";

  if (!activeTopic) {
    return <div style={{ padding: 40, textAlign: "center" }}>Level data not found.</div>;
  }

  const formulaNode = (
    <p
      style={{
        ...figmaTokens.typography.styles.body,
        fontSize: figmaTokens.layout.grammarLesson.ruleFormulaSize,
        lineHeight: `${figmaTokens.layout.grammarLesson.ruleFormulaLineHeight}px`,
        color: figmaTokens.colors.text.tertiary,
        margin: 0,
        whiteSpace: "nowrap",
      }}
    >
      {activeTopic.formula}
    </p>
  );

  return (
    <div
      style={pageStyle}
      data-node-id="8:466"
      data-name="Intro de Nivel / Nueva Gramática"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${figmaTokens.layout.levelIntro.leftColumnWidth}px ${figmaTokens.layout.levelIntro.rightColumnWidth}px`,
          width: "100%",
          minHeight: figmaTokens.layout.levelIntro.bodyHeight,
          paddingTop: figmaTokens.layout.levelIntro.headerHeight,
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            minHeight: figmaTokens.layout.levelIntro.bodyHeight,
            background: `linear-gradient(156.23008248917932deg, ${figmaTokens.layout.levelIntro.leftGradientStart} 8.4861%, ${figmaTokens.layout.levelIntro.leftGradientEnd} 91.514%)`,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: `${figmaTokens.layout.levelIntro.leftPaddingY}px ${figmaTokens.layout.levelIntro.leftPaddingX}px`,
            }}
          >
            <ObjectivesChecklist
              levelText={activeTopic.levelText}
              title={activeTopic.title}
              description={activeTopic.description}
              objectives={activeTopic.objectives}
            />
          </div>
        </section>

        <section
          style={{
            minHeight: figmaTokens.layout.levelIntro.bodyHeight,
            background: figmaTokens.colors.surface.white,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: `${figmaTokens.layout.levelIntro.rightPaddingY}px ${figmaTokens.layout.levelIntro.rightPaddingX}px`,
              display: "flex",
              flexDirection: "column",
              gap: figmaTokens.layout.levelIntro.contentGapTop,
            }}
          >
            {/* Dynamic Rule display block */}
            <section 
              style={{
                width: "100%",
                minHeight: 120,
                background: figmaTokens.colors.background.elevated,
                borderLeft: `6px solid ${figmaTokens.colors.primary[500]}`,
                borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
                padding: "20px 24px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ paddingBottom: 12 }}>
                <span style={figmaTokens.typography.styles.eyebrow}>MAIN RULE</span>
              </div>
              <div>{formulaNode}</div>
              <div style={{ paddingTop: 10 }}>
                <div style={{
                  background: figmaTokens.colors.surface.white,
                  borderRadius: figmaTokens.radii.sm,
                  padding: "4px 12px",
                  display: "inline-flex",
                  alignItems: "center",
                }}>
                  <span style={{ ...figmaTokens.typography.styles.mono, color: figmaTokens.colors.text.primary, fontSize: 13 }}>
                    {activeTopic.formulaLabel}
                  </span>
                </div>
              </div>
            </section>

            <ExamplesCard
              title="examples"
              examples={activeTopic.examples}
            />
            
            <div style={{ paddingTop: 8, boxSizing: "border-box" }}>
              <StartLevelButton
                onStart={onStartLevel}
                exercises={exercisesCount}
                minutes={minutesLabel}
                xp={`${xpReward} XP`}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
