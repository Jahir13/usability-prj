import { AppHeader } from "../../components/layout/AppHeader";
import {
  SkillTabSidebar,
  type ActiveSkill,
} from "../../components/learningpath/SkillTabSidebar";
import { AccumulatedProgressBar } from "../../components/learningpath/AccumulatedProgressBar";
import { ThematicUnit } from "../../components/learningpath/ThematicUnit";
import { useProgress } from "../../context/LingoContext";
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
      className="relative w-full min-h-screen bg-background-app box-border overflow-hidden"
      data-node-id="12:1589"
      data-name="Home / Ruta de Aprendizaje Speaking"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      <div className="flex flex-col w-full box-border pt-16 md:flex-row md:items-stretch md:min-h-[calc(100vh-64px)]">
        <SkillTabSidebar activeSkill={activeSkill} onSkillChange={onSkillChange} />

        <main className="flex-1 min-w-0 max-w-[800px] box-border w-full flex flex-col items-center overflow-y-auto">
          <div className="w-full box-border p-4 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 w-full box-border text-left">
              <div className="w-10 h-10 rounded-full bg-background-subtle flex items-center justify-center shrink-0">
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
              <div className="text-learningPathHeading text-text-secondary text-left">
                Learning Path
              </div>
            </div>

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
                    status: (level.status === "done" 
                      ? "done" 
                      : level.status === "current" 
                        ? "in-progress" 
                        : "blocked") as LevelStatus
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
