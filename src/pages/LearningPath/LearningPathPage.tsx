import type { CSSProperties } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { figmaTokens } from "../../styles/tokens";
import {
  SkillTabSidebar,
  type ActiveSkill,
} from "../../components/learningpath/SkillTabSidebar";
import { AccumulatedProgressBar } from "../../components/learningpath/AccumulatedProgressBar";
import { ThematicUnit } from "../../components/learningpath/ThematicUnit";
import { useProgress } from "../../context/LingoContext";

type LearningPathPageProps = {
  activeSkill: ActiveSkill;
  onSkillChange: (skill: ActiveSkill) => void;
  onLevelClick: (levelId: string) => void;
  onNavigate: (route: string) => void;
};

const skillLabels: Record<ActiveSkill, { icon: string; label: string }> = {
  grammar: { icon: "📖", label: "Grammar" },
  speaking: { icon: "🎤", label: "Speaking" },
  listening: { icon: "👂", label: "Listening" },
  writing: { icon: "✍️", label: "Writing" },
};

const pageStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: figmaTokens.layout.learningPath.pageHeight,
  background: figmaTokens.colors.background.app,
  boxSizing: "border-box",
  overflow: "hidden",
};

export function LearningPathPage({ 
  activeSkill, 
  onSkillChange,
  onLevelClick,
  onNavigate,
}: LearningPathPageProps) {
  const { progress } = useProgress();
  const activeSkillMeta = skillLabels[activeSkill];
  
  const skillProgress = progress.find((p) => p.skill === activeSkill);
  const units = skillProgress?.units || [];
  const progressPercent = skillProgress?.completedPercent ?? 0;

  return (
    <div
      style={pageStyle}
      data-node-id="12:1589"
      data-name="Home / Ruta de Aprendizaje Speaking"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          paddingTop: figmaTokens.layout.learningPath.headerHeight,
          boxSizing: "border-box",
        }}
      >
        <SkillTabSidebar activeSkill={activeSkill} onSkillChange={onSkillChange} />

        <main
          style={{
            flex: "1 1 auto",
            minWidth: 0,
            maxWidth: figmaTokens.layout.learningPath.mainMaxWidth,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              minHeight: figmaTokens.layout.learningPath.sidebarBodyHeight,
              padding: figmaTokens.layout.learningPath.mainPadding,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: figmaTokens.layout.learningPath.learningPathHeaderGap,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: figmaTokens.radii.full,
                  background: figmaTokens.colors.background.subtle,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={figmaTokens.typography.styles.learningPathSkillEmoji}
                >
                  {activeSkillMeta.icon}
                </span>
              </div>
              <h1 style={figmaTokens.typography.styles.learningPathTitle}>
                {activeSkillMeta.label}
              </h1>
            </div>

            <div
              style={{
                paddingTop:
                  figmaTokens.layout.learningPath.learningPathSectionGapTop,
                boxSizing: "border-box",
              }}
            >
              <AccumulatedProgressBar progress={progressPercent} />
            </div>

            <div
              style={{
                paddingTop:
                  figmaTokens.layout.learningPath.learningPathSectionGapTop,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  ...figmaTokens.typography.styles.learningPathHeading,
                  color: figmaTokens.colors.text.secondary,
                }}
              >
                Learning Path
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                paddingLeft: 40,
                paddingTop: 20,
                boxSizing: "border-box",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: figmaTokens.layout.learningPath.levelConnectorLeft,
                  top: figmaTokens.layout.learningPath.levelConnectorTop,
                  width: figmaTokens.layout.learningPath.levelConnectorWidth,
                  height: figmaTokens.layout.learningPath.levelConnectorHeight,
                  background: figmaTokens.colors.background.muted,
                  zIndex: figmaTokens.layout.learningPath.levelConnectorZIndex,
                }}
                data-node-id="12:1709"
                data-name="Container"
              />

              <div
                style={{
                  position: "relative",
                  zIndex: figmaTokens.layout.learningPath.levelContentZIndex,
                  display: "flex",
                  flexDirection: "column",
                  gap: figmaTokens.spacing[16],
                  boxSizing: "border-box",
                }}
              >
                {units.map((unit) => {
                  const mappedLevels = unit.levels.map((level) => ({
                    ...level,
                    status: (level.status === "done" 
                      ? "done" 
                      : level.status === "current" 
                        ? "in-progress" 
                        : "blocked") as any
                  }));
                  return (
                    <ThematicUnit
                      key={unit.title}
                      title={unit.title}
                      levels={mappedLevels}
                      onLevelClick={onLevelClick}
                    />
                  );
                })}
              </div>
            </div>

            <div
              style={{
                paddingTop: figmaTokens.layout.learningPath.footerPaddingTop,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  borderTop: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
                  paddingTop: figmaTokens.layout.learningPath.footerDividerTop,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <span style={figmaTokens.typography.styles.caption}>
                  © 2026 LingoGuru
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
