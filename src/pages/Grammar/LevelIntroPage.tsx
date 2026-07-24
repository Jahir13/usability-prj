import { AppHeader } from "../../components/layout/AppHeader";
import { ObjectivesChecklist } from "../../components/grammar/ObjectivesChecklist";
import { RuleCard } from "../../components/grammar/RuleCard";
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
    return <div className="p-10 text-center">Level data not found.</div>;
  }

  const formulaNode = (
    <p className="text-body text-[16px] text-text-tertiary m-0 whitespace-nowrap text-left">
      {activeTopic.formula}
    </p>
  );

  return (
    <div
      className="relative w-full min-h-screen bg-background-app box-border"
      data-node-id="8:466"
      data-name="Intro de Nivel / Nueva Gramática"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      
      <div className="grid grid-cols-1 w-full box-border pt-16 md:grid-cols-[507px_475px] md:justify-center md:min-h-[calc(100vh-64px)]">
        <section className="box-border flex items-center justify-center w-full p-[32px_20px] md:min-h-[calc(100vh-64px)] md:p-[48px_64px] bg-[linear-gradient(156.23deg,_#4f6ef7_8.4861%,_#3451d1_91.514%)]">
          <div className="w-full max-w-[600px] box-border">
            <ObjectivesChecklist
              levelText={activeTopic.levelText}
              title={activeTopic.title}
              description={activeTopic.description}
              objectives={activeTopic.objectives}
            />
          </div>
        </section>

        <section className="box-border flex items-center justify-center w-full p-[32px_20px] md:min-h-[calc(100vh-64px)] md:p-[48px_48px] bg-surface-white">
          <div className="w-full max-w-[600px] box-border gap-6 flex flex-col">
            <RuleCard
              formula={formulaNode}
              formulaLabel={activeTopic.formulaLabel}
            />

            <ExamplesCard
              title="examples"
              examples={activeTopic.examples}
            />
            
            <div className="pt-2 box-border">
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
