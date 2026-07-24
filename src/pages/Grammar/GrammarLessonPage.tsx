import { useState } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { LessonSidebar } from "../../components/grammar/LessonSidebar";
import { ObjectivesChecklist } from "../../components/grammar/ObjectivesChecklist";
import { RuleCard } from "../../components/grammar/RuleCard";
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
    return <div className="p-10 text-center">Lesson topic not found.</div>;
  }

  const formulaNode = (
    <p className="text-body text-[16px] text-text-tertiary m-0 whitespace-nowrap text-left">
      {topicData.formula}
    </p>
  );

  return (
    <div
      className="relative w-full min-h-screen bg-background-app box-border"
      data-node-id="8:340"
      data-name="Panel Central de Gramática"
    >
      <AppHeader 
        onHomeClick={() => onNavigate("#/dashboard")} 
        onProfileClick={() => onNavigate("#/profile")}
      />
      
      <div className="flex flex-col w-full box-border pt-16 md:flex-row md:items-stretch md:h-[calc(100vh-64px)]">
        <LessonSidebar 
          activeTopicId={activeTopicId} 
          onTopicChange={setActiveTopicId} 
          topics={topics}
        />
 
        <main className="flex-1 min-w-0 box-border w-full flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-[672px] box-border p-4 md:p-8 flex flex-col gap-5">
            <ObjectivesChecklist
              levelText={topicData.levelText}
              title={topicData.title}
              description={topicData.description}
              objectives={topicData.objectives}
            />
 
            <div className="w-full box-border flex flex-col gap-6 p-12">
              <RuleCard
                formula={formulaNode}
                formulaLabel={topicData.formulaLabel}
              />
 
              <ExamplesCard
                title="examples"
                examples={topicData.examples}
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
          </div>
        </main>
      </div>
    </div>
  );
}
