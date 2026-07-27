import { useState } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  SkillTabSidebar,
  type ActiveSkill,
} from "../../components/learningpath/SkillTabSidebar";
import { skillTabId } from "../../utils/tabIds";
import { AccumulatedProgressBar } from "../../components/learningpath/AccumulatedProgressBar";
import { ThematicUnit } from "../../components/learningpath/ThematicUnit";
import { useProgress } from "../../context/LingoContext";
import { getLevelLessonsCount } from "../../config/lessonsData";
import type { LevelStatus } from "../../components/learningpath/LevelNode";

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

const PANEL_ID = "learning-path-panel";

export function LearningPathPage({
  activeSkill,
  onSkillChange,
  onLevelClick,
  onNavigate,
}: LearningPathPageProps) {
  const { progress } = useProgress();
  const activeSkillMeta = skillLabels[activeSkill];

  /** Message announced when someone activates a level that is still locked. */
  const [statusMessage, setStatusMessage] = useState("");

  const skillProgress = progress.find((p) => p.skill === activeSkill);
  const units = skillProgress?.units || [];
  const progressPercent = skillProgress?.completedPercent ?? 0;

  const handleLevelClick = (levelId: string) => {
    setStatusMessage("");
    onLevelClick(levelId);
  };

  return (
    <div
      className="relative w-full min-h-screen bg-background-app box-border overflow-hidden"
      data-node-id="12:1589"
      data-name="Home / Ruta de Aprendizaje Speaking"
    >
      {/*
        Skip link: first tab stop of the page, so keyboard and screen reader
        users can jump straight to the levels without walking the whole header.
      */}
      <a href={`#${PANEL_ID}`} className="skip-link">
        Skip to the learning path
      </a>

      <AppHeader
        onHomeClick={() => onNavigate("#/dashboard")}
        onProfileClick={() => onNavigate("#/profile")}
      />
      <div className="flex flex-col w-full box-border pt-16 md:flex-row md:items-stretch md:min-h-[calc(100vh-64px)]">
        <SkillTabSidebar
          activeSkill={activeSkill}
          onSkillChange={(skill) => {
            setStatusMessage("");
            onSkillChange(skill);
          }}
          panelId={PANEL_ID}
        />

        <main
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={skillTabId(activeSkill)}
          tabIndex={-1}
          className="flex-1 min-w-0 max-w-[800px] box-border w-full flex flex-col items-center overflow-y-auto focus-visible:outline-none"
        >
          <div className="w-full box-border p-4 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 w-full box-border text-left">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-full bg-background-subtle flex items-center justify-center shrink-0"
              >
                <span className="text-learningPathSkillEmoji text-text-primary">
                  {activeSkillMeta.icon}
                </span>
              </div>
              <h1 className="text-learningPathTitle text-text-primary text-left m-0">
                {activeSkillMeta.label}
              </h1>
            </div>

            <div className="pt-6 box-border">
              <AccumulatedProgressBar progress={progressPercent} />
            </div>

            <div className="pt-6 box-border text-left">
              <h2 className="text-learningPathHeading text-text-secondary text-left m-0">
                Learning Path
              </h2>
              <p className="text-caption text-text-secondary text-left mt-2 mb-0">
                Every level has 3 lessons. Use Tab to move through the levels and
                Enter to open the one that is available.
              </p>
            </div>

            {/* Live region: explains a blocked level without a browser alert. */}
            <p role="status" aria-live="polite" className="text-caption text-danger-500 text-left mt-3 mb-0 min-h-[18px]">
              {statusMessage}
            </p>

            <div className="relative w-full pl-10 pt-5 box-border">
              <div
                aria-hidden="true"
                className="absolute left-[23px] top-[44px] w-[2px] h-[458px] bg-background-muted z-0"
                data-node-id="12:1709"
                data-name="Container"
              />

              <div className="relative z-10 flex flex-col gap-4 box-border">
                {units.map((unit) => {
                  const mappedLevels = unit.levels.map((level) => ({
                    ...level,
                    lessonsCount: getLevelLessonsCount(activeSkill, level.id),
                    status: (level.status === "done"
                      ? "done"
                      : level.status === "current"
                        ? "in-progress"
                        : "blocked") as LevelStatus,
                  }));
                  return (
                    <ThematicUnit
                      key={unit.title}
                      title={unit.title}
                      levels={mappedLevels}
                      onLevelClick={handleLevelClick}
                      onBlockedLevelClick={(title) =>
                        setStatusMessage(
                          `${title} is locked. Finish the previous level of ${activeSkillMeta.label} to unlock it.`
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>

            <div className="pt-10 box-border">
              <div className="border-t border-border-default pt-6 flex justify-center items-center w-full box-border">
                <span className="text-caption text-text-secondary">
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
