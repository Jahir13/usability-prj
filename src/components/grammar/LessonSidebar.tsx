type LessonSidebarProps = {
  activeTopicId?: string;
  onTopicChange?: (topicId: string) => void;
  topics?: LessonTopic[];
};

type LessonItem = {
  id: string;
  label: string;
  state: "done" | "active" | "blocked";
  marker: string;
};

const defaultLessonItems: LessonItem[] = [
  { id: "introduction", label: "Introduction", state: "done", marker: "✓" },
  { id: "verb-forms", label: "Verb Forms", state: "done", marker: "✓" },
  { id: "verb-to-be", label: "Verb To Be", state: "active", marker: "3" },
  {
    id: "negative-sentences",
    label: "Negative sentences",
    state: "blocked",
    marker: "4",
  },
  { id: "questions", label: "Questions", state: "blocked", marker: "5" },
  { id: "contractions", label: "Contractions", state: "blocked", marker: "6" },
];

import { StatusMarker } from "../ui/StatusMarker";

function LessonRow({ 
  item, 
  active,
  onClick,
}: { 
  item: LessonItem; 
  active: boolean;
  onClick?: () => void;
}) {
  const isDone = item.state === "done";
  const isBlocked = item.state === "blocked";

  const handleClick = () => {
    if (isBlocked) {
      alert("This sub-topic is locked! Please practice the 'Verb To Be' first.");
      return;
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={handleClick}
      className={`flex-1 h-[45px] border-0 p-0 flex items-center justify-center box-border cursor-pointer transition-all duration-200 min-w-[120px] md:w-full md:flex-none md:justify-start md:min-w-0 md:border-b-0 ${
        active 
          ? "bg-primary-soft border-b-4 border-primary-500 md:border-b-0 md:border-l-4 md:border-primary-500" 
          : "bg-transparent border-b-4 border-transparent hover:bg-background-app md:border-b-0 md:border-l-4 md:border-transparent"
      } ${isBlocked ? "cursor-not-allowed opacity-[0.65]" : ""}`}
    >
      <div className="flex items-center gap-[10px] px-4 box-border w-full justify-center md:justify-start md:pl-5 md:w-[199px]">
        <StatusMarker
          status={isDone ? "done" : active ? "in-progress" : "blocked"}
          size="sm"
          content={item.marker}
        />

        <span
          className={`text-label whitespace-nowrap ${
            active ? "text-primary-500" : "text-text-primary"
          } ${isBlocked ? "opacity-65" : "opacity-100"}`}
        >
          {item.label}
        </span>
      </div>
    </button>
  );
}

import type { LessonTopic } from "../../types";

export function LessonSidebar({
  activeTopicId = "verb-to-be",
  onTopicChange,
  topics,
}: LessonSidebarProps) {
  const items: LessonItem[] = topics
    ? topics.map((t) => ({
        id: t.id,
        label: t.label,
        state: t.state,
        marker: t.marker,
      }))
    : defaultLessonItems;

  const activeTopic = topics?.find((t) => t.id === activeTopicId) || topics?.[0];
  const eyebrowText = activeTopic ? activeTopic.levelText : "LESSON";

  return (
    <aside className="w-full bg-surface-white border-b border-border-default flex flex-col shrink-0 box-border md:w-[240px] md:h-full md:border-r md:border-b-0" data-node-id="8:343" data-name="Sidebar">
      <div className="flex flex-col box-border pt-4 w-full md:h-full md:pt-6">
        <div className="h-9 box-border pb-4 px-5">
          <span className="text-eyebrow">{eyebrowText}</span>
        </div>

        <div className="flex flex-row overflow-x-auto w-full md:flex-col md:overflow-x-visible md:h-[478px]" data-node-id="8:346" data-name="Inline content">
          {items.map((item) => (
            <LessonRow
              key={item.id}
              item={item}
              active={item.id === activeTopicId}
              onClick={() => onTopicChange?.(item.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
