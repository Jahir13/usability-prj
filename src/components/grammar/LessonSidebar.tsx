import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

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

const sidebarStyle: CSSProperties = {
  width: figmaTokens.layout.grammarLesson.sidebarWidth,
  minHeight: figmaTokens.layout.grammarLesson.sidebarBodyHeight,
  background: figmaTokens.colors.surface.white,
  borderRight: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
  boxSizing: "border-box",
  flexShrink: 0,
};

function LessonRow({ 
  item, 
  active,
  onClick,
}: { 
  item: LessonItem; 
  active: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => !isBlocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: figmaTokens.layout.grammarLesson.sidebarItemHeight,
        border: 0,
        padding: 0,
        background: active
          ? figmaTokens.layout.grammarLesson.sidebarItemActiveBackground
          : isHovered
            ? figmaTokens.colors.background.app
            : "transparent",
        borderLeft: `${figmaTokens.layout.grammarLesson.sidebarItemActiveBorderWidth}px solid ${active ? figmaTokens.colors.primary[500] : figmaTokens.colors.decoration.black0}`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        cursor: isBlocked ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: figmaTokens.layout.grammarLesson.sidebarItemGap,
          paddingLeft: figmaTokens.layout.grammarLesson.sidebarItemInsetX,
          width: 199,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: figmaTokens.layout.grammarLesson.sidebarItemIconSize,
            height: figmaTokens.layout.grammarLesson.sidebarItemIconSize,
            borderRadius:
              figmaTokens.layout.grammarLesson.sidebarItemIconRadius,
            background: isDone
              ? figmaTokens.colors.success.soft
              : active
                ? figmaTokens.colors.primary.soft
                : figmaTokens.colors.background.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDone
              ? figmaTokens.colors.success[500]
              : active
                ? figmaTokens.colors.primary[500]
                : figmaTokens.colors.text.secondary,
            flexShrink: 0,
          }}
        >
          <span style={figmaTokens.typography.styles.caption}>
            {item.marker}
          </span>
        </div>

        <span
          style={{
            ...figmaTokens.typography.styles.label,
            color: active
              ? figmaTokens.colors.primary[500]
              : figmaTokens.colors.text.primary,
            opacity: isBlocked ? 0.65 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
      </div>
    </button>
  );
}

import { useState } from "react";
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
    <aside style={sidebarStyle} data-node-id="8:343" data-name="Sidebar">
      <div
        style={{
          minHeight: figmaTokens.layout.grammarLesson.sidebarBodyHeight,
          boxSizing: "border-box",
          paddingTop: figmaTokens.layout.grammarLesson.sidebarTopPaddingY,
          paddingRight: 1,
        }}
      >
        <div
          style={{
            height: figmaTokens.layout.grammarLesson.sidebarHeadingHeight,
            boxSizing: "border-box",
            paddingBottom:
              figmaTokens.layout.grammarLesson.sidebarHeadingGapBottom,
            paddingLeft: figmaTokens.layout.grammarLesson.sidebarHeadingInsetX,
            paddingRight: figmaTokens.layout.grammarLesson.sidebarHeadingInsetX,
          }}
        >
          <span style={figmaTokens.typography.styles.eyebrow}>{eyebrowText}</span>
        </div>

        <div
          style={{
            position: "relative",
            height: figmaTokens.layout.grammarLesson.sidebarListHeight,
            width: "100%",
            boxSizing: "border-box",
          }}
          data-node-id="8:346"
          data-name="Inline content"
        >
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
