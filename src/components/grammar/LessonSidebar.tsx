import { useRef } from "react";
import { StatusMarker } from "../ui/StatusMarker";
import type { LessonTopic } from "../../types";
import { lessonTabId } from "../../utils/tabIds";

type LessonSidebarProps = {
  activeTopicId?: string;
  onTopicChange?: (topicId: string) => void;
  topics?: LessonTopic[];
  /** Id of the panel these tabs control (the lesson content). */
  panelId?: string;
  /** Called when a locked lesson is activated, so the page can explain why. */
  onBlockedTopicClick?: (label: string) => void;
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
];

const spokenStateByState: Record<LessonItem["state"], string> = {
  done: "completed",
  active: "available",
  blocked: "locked, finish the previous lesson to unlock it",
};

function LessonRow({
  item,
  index,
  total,
  active,
  panelId,
  onClick,
  onKeyDown,
  buttonRef,
}: {
  item: LessonItem;
  index: number;
  total: number;
  active: boolean;
  panelId?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef?: (element: HTMLButtonElement | null) => void;
}) {
  const isDone = item.state === "done";
  const isBlocked = item.state === "blocked";

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={lessonTabId(item.id)}
      aria-selected={active}
      aria-controls={panelId}
      aria-disabled={isBlocked || undefined}
      aria-label={`Lesson ${index + 1} of ${total}: ${item.label}. ${spokenStateByState[item.state]}`}
      /** Roving tabindex, so Tab moves from the lesson list into the lesson text. */
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`flex-1 h-[45px] border-0 p-0 flex items-center justify-center box-border cursor-pointer transition-all duration-200 min-w-[120px] md:w-full md:flex-none md:justify-start md:min-w-0 md:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 ${
        active
          ? "bg-primary-soft border-b-4 border-primary-500 md:border-b-0 md:border-l-4 md:border-primary-500"
          : "bg-transparent border-b-4 border-transparent hover:bg-background-app md:border-b-0 md:border-l-4 md:border-transparent"
      } ${isBlocked ? "cursor-not-allowed opacity-[0.65]" : ""}`}
    >
      <span className="flex items-center gap-[10px] px-4 box-border w-full justify-center md:justify-start md:pl-5 md:w-[199px]">
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
      </span>
    </button>
  );
}

/**
 * List of the sub-lessons of a level, implemented as an ARIA tab list.
 *
 * Arrow keys move between lessons and Tab moves forward into the lesson text,
 * so a keyboard user is never stuck inside the list.
 */
export function LessonSidebar({
  activeTopicId,
  onTopicChange,
  topics,
  panelId = "lesson-panel",
  onBlockedTopicClick,
}: LessonSidebarProps) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

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

  const selectItem = (item: LessonItem) => {
    if (item.state === "blocked") {
      onBlockedTopicClick?.(item.label);
      return;
    }
    onTopicChange?.(item.id);
  };

  /** Arrow keys move focus and selection to the next selectable lesson. */
  const moveFocus = (from: number, direction: 1 | -1) => {
    const total = items.length;
    for (let step = 1; step <= total; step += 1) {
      const index = (from + direction * step + total * step) % total;
      const candidate = items[index];
      if (!candidate) continue;
      buttonsRef.current[index]?.focus();
      if (candidate.state !== "blocked") {
        onTopicChange?.(candidate.id);
      }
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        moveFocus(index, 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(index, -1);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(-1, 1);
        break;
      case "End":
        event.preventDefault();
        moveFocus(items.length, -1);
        break;
      default:
        break;
    }
  };

  return (
    <aside
      className="w-full bg-surface-white border-b border-border-default flex flex-col shrink-0 box-border md:w-[240px] md:h-full md:border-r md:border-b-0"
      data-node-id="8:343"
      data-name="Sidebar"
    >
      <div className="flex flex-col box-border pt-4 w-full md:h-full md:pt-6">
        <div className="h-9 box-border pb-4 px-5">
          <span className="text-eyebrow">{eyebrowText}</span>
        </div>

        <div
          role="tablist"
          aria-label="Lessons of this level"
          aria-orientation="vertical"
          className="flex flex-row overflow-x-auto w-full md:flex-col md:overflow-x-visible md:h-[478px]"
          data-node-id="8:346"
          data-name="Inline content"
        >
          {items.map((item, index) => (
            <LessonRow
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              panelId={panelId}
              active={item.id === (activeTopicId ?? items[0]?.id)}
              buttonRef={(element) => {
                buttonsRef.current[index] = element;
              }}
              onClick={() => selectItem(item)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
