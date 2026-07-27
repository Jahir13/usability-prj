import { useState } from "react";
import { AppHeader } from "../../components/layout/AppHeader";
import { LessonSidebar } from "../../components/grammar/LessonSidebar";
import { lessonTabId } from "../../utils/tabIds";
import { ObjectivesChecklist } from "../../components/grammar/ObjectivesChecklist";
import { RuleCard } from "../../components/grammar/RuleCard";
import { ExamplesCard } from "../../components/grammar/ExamplesCard";
import { StartLevelButton } from "../../components/grammar/StartLevelButton";
import { getLevelContent, getTopicExercises } from "../../config/lessonsData";
import type { ActiveSkill, LessonTopic } from "../../types";
import { useProgress } from "../../context/LingoContext";

type GrammarLessonPageProps = {
  levelId: string;
  skill: ActiveSkill;
  onStartLevel: (topicId: string) => void;
  onNavigate: (route: string) => void;
};

const PANEL_ID = "lesson-panel";

export function GrammarLessonPage({
  levelId,
  skill,
  onStartLevel,
  onNavigate,
}: GrammarLessonPageProps) {
  const { progress, completedIds } = useProgress();
  const rawTopics = getLevelContent(skill, levelId)?.lessonTopics || [];

  // A sub-lesson is "done" once its id is in completedIds. The first
  // not-yet-done sub-lesson becomes "active"; everything after it is
  // "blocked" until the previous one is completed.
  const firstActiveIndex = rawTopics.findIndex((t) => !completedIds.includes(t.id));
  const topics: LessonTopic[] = rawTopics.map((t, index) => {
    const isDone = completedIds.includes(t.id);
    const state: LessonTopic["state"] = isDone ? "done" : index === firstActiveIndex ? "active" : "blocked";
    return { ...t, state };
  });

  const allLevels = progress.flatMap((sp) => sp.units?.flatMap((u) => u.levels) || sp.levels || []);
  const currentLevel = allLevels.find((l) => l.id === levelId);

  // Default to the first active (not-yet-completed) sub-lesson; if the whole
  // level is already done, fall back to the last sub-lesson.
  const initialTopicId =
    topics.find((t) => t.state === "active")?.id || topics[topics.length - 1]?.id || "";
  const [activeTopicId, setActiveTopicId] = useState(initialTopicId);
  const [statusMessage, setStatusMessage] = useState("");

  const topicData = topics.find((t) => t.id === activeTopicId) || topics[0];

  if (!topicData) {
    return <div className="p-10 text-center">Lesson topic not found.</div>;
  }

  const topicIndex = topics.findIndex((t) => t.id === topicData.id);
  const exercisesCount =
    topicData.exercises?.length ||
    getTopicExercises(skill, levelId, topicData.id).length ||
    currentLevel?.exercisesCount ||
    5;
  const xpReward = topicData.xpReward || currentLevel?.xpReward || 350;
  const minutesLabel = topicData.minutesLabel || currentLevel?.minutesLabel || "~4 mins";

  const formulaNode = (
    <p className="text-body text-[16px] text-text-tertiary m-0 text-left">
      {topicData.formula}
    </p>
  );

  return (
    <div
      className="relative w-full min-h-screen bg-background-app box-border"
      data-node-id="8:340"
      data-name="Panel Central de Gramática"
    >
      <a href={`#${PANEL_ID}`} className="skip-link">
        Skip to the lesson content
      </a>

      <AppHeader
        onHomeClick={() => onNavigate("#/dashboard")}
        onProfileClick={() => onNavigate("#/profile")}
      />

      <div className="flex flex-col w-full box-border pt-16 md:flex-row md:items-stretch md:h-[calc(100vh-64px)]">
        <LessonSidebar
          activeTopicId={activeTopicId}
          onTopicChange={(topicId) => {
            setStatusMessage("");
            setActiveTopicId(topicId);
          }}
          topics={topics}
          panelId={PANEL_ID}
          onBlockedTopicClick={(label) =>
            setStatusMessage(`The lesson "${label}" is locked. Complete the previous lesson first.`)
          }
        />

        <main
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={lessonTabId(topicData.id)}
          tabIndex={-1}
          className="flex-1 min-w-0 box-border w-full flex flex-col items-center overflow-y-auto focus-visible:outline-none"
        >
          <div className="w-full max-w-[672px] box-border p-4 md:p-8 flex flex-col gap-5">
            <p className="text-caption text-text-secondary text-left m-0">
              Lesson {topicIndex + 1} of {topics.length} in this level. Press Tab to read
              the description, the rule and the examples; the arrow keys move between
              lessons.
            </p>

            <p role="status" aria-live="polite" className="text-caption text-danger-500 text-left m-0 min-h-[18px]">
              {statusMessage}
            </p>

            <ObjectivesChecklist
              levelText={topicData.levelText}
              title={topicData.title}
              description={topicData.description}
              objectives={topicData.objectives}
              headingLevel={1}
            />

            <div className="w-full box-border flex flex-col gap-6 py-6 md:p-12">
              <RuleCard formula={formulaNode} formulaLabel={topicData.formulaLabel} />

              <ExamplesCard title="examples" examples={topicData.examples} />

              <div className="pt-2 box-border">
                <StartLevelButton
                  onStart={() => onStartLevel(activeTopicId)}
                  exercises={exercisesCount}
                  minutes={minutesLabel}
                  xp={`${xpReward} XP`}
                  lessonTitle={topicData.title}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
