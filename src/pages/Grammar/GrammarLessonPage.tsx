import { useState, type CSSProperties } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { figmaTokens } from "../../styles/tokens";
import { LessonSidebar } from "../../components/grammar/LessonSidebar";
import { ObjectivesChecklist } from "../../components/grammar/ObjectivesChecklist";
import { ExamplesCard } from "../../components/grammar/ExamplesCard";
import { StartLevelButton } from "../../components/grammar/StartLevelButton";
import { LESSONS_DATABASE } from "../../config/lessonsData";
import type { ActiveSkill } from "../../types";
import { useProgress } from "../../context/LingoContext";

type GrammarLessonPageProps = {
  levelId: string;
  skill: ActiveSkill;
  onStartLevel: () => void;
  onNavigate: (route: string) => void;
};

const pageStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: figmaTokens.layout.grammarLesson.pageHeight,
  background: figmaTokens.colors.background.app,
  overflow: "hidden",
  boxSizing: "border-box",
};

export function GrammarLessonPage({
  levelId,
  onStartLevel,
  onNavigate,
}: GrammarLessonPageProps) {
  const { progress } = useProgress();
  const topics = LESSONS_DATABASE[levelId] || [];

  const allLevels = progress.flatMap((sp) => sp.units?.flatMap((u) => u.levels) || sp.levels || []);
  const currentLevel = allLevels.find((l) => l.id === levelId);
  const xpReward = currentLevel?.xpReward || 350;
  const exercisesCount = currentLevel?.exercisesCount || 5;
  const minutesLabel = currentLevel?.minutesLabel || "~4 mins";
  
  // Set the first topic matching the levelId as active, or default to the first one
  const initialTopicId = topics.some(t => t.id === levelId) ? levelId : topics[0]?.id || "";
  const [activeTopicId, setActiveTopicId] = useState(initialTopicId);
  
  const topicData = topics.find((t) => t.id === activeTopicId) || topics[0];

  if (!topicData) {
    return <div style={{ padding: 40, textAlign: "center" }}>Lesson topic not found.</div>;
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
      {topicData.formula}
    </p>
  );

  return (
    <div
      style={pageStyle}
      data-node-id="8:340"
      data-name="Panel Central de Gramática"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          paddingTop: figmaTokens.layout.grammarLesson.headerHeight,
          boxSizing: "border-box",
        }}
      >
        <LessonSidebar 
          activeTopicId={activeTopicId} 
          onTopicChange={setActiveTopicId} 
          topics={topics}
        />

        <main
          style={{
            flex: "1 1 auto",
            minWidth: 0,
            height: figmaTokens.layout.grammarLesson.sidebarBodyHeight,
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: figmaTokens.layout.grammarLesson.contentWidth,
              boxSizing: "border-box",
              padding: figmaTokens.layout.grammarLesson.contentPadding,
              display: "flex",
              flexDirection: "column",
              gap: figmaTokens.layout.grammarLesson.contentGap,
            }}
          >
            <ObjectivesChecklist
              levelText={topicData.levelText}
              title={topicData.title}
              description={topicData.description}
              objectives={topicData.objectives}
            />

            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                padding: `${figmaTokens.layout.grammarLesson.ruleCardPaddingY}px ${figmaTokens.layout.grammarLesson.ruleCardPaddingX}px`,
              }}
            >
              {/* Dynamic rule card */}
              <section 
                style={{
                  width: "100%",
                  minHeight: 152,
                  background: figmaTokens.colors.background.elevated,
                  borderLeft: `${figmaTokens.layout.grammarLesson.ruleCardBorderWidth}px solid ${figmaTokens.colors.primary[500]}`,
                  borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
                  padding: `${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingY}px ${figmaTokens.layout.grammarLesson.ruleCardInnerPaddingX}px`,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ paddingBottom: figmaTokens.layout.grammarLesson.ruleCardTitleGapBottom }}>
                  <span style={figmaTokens.typography.styles.eyebrow}>MAIN RULE</span>
                </div>

                <div style={{ boxSizing: "border-box" }}>
                  {formulaNode}
                </div>

                <div style={{ paddingTop: 12, boxSizing: "border-box" }}>
                  <div
                    style={{
                      background: figmaTokens.colors.surface.white,
                      borderRadius: figmaTokens.layout.grammarLesson.ruleFormulaChipRadius,
                      padding: `${figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingY}px ${figmaTokens.layout.grammarLesson.ruleFormulaChipPaddingX}px`,
                      boxSizing: "border-box",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ ...figmaTokens.typography.styles.mono, color: figmaTokens.colors.text.primary }}>
                      {topicData.formulaLabel}
                    </span>
                  </div>
                </div>
              </section>

              <ExamplesCard
                title="examples"
                examples={topicData.examples}
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
          </div>
        </main>
      </div>
    </div>
  );
}
