import { useRef } from "react";
import { skillTabId } from "../../utils/tabIds";

export type ActiveSkill = "grammar" | "speaking" | "listening" | "writing";

type SkillTabSidebarProps = {
  activeSkill: ActiveSkill;
  onSkillChange?: (skill: ActiveSkill) => void;
  /** Id of the panel these tabs control (the learning path list). */
  panelId?: string;
};

type SkillTabItem = {
  skill: ActiveSkill;
  icon: string;
  label: string;
};

const skillTabs: SkillTabItem[] = [
  { skill: "grammar", icon: "📖", label: "Grammar" },
  { skill: "speaking", icon: "🎤", label: "Speaking" },
  { skill: "listening", icon: "👂", label: "Listening" },
  { skill: "writing", icon: "✍️", label: "Writing" },
];

function SkillTabButton({
  icon,
  label,
  skill,
  active,
  panelId,
  onClick,
  onKeyDown,
  buttonRef,
}: {
  icon: string;
  label: string;
  skill: ActiveSkill;
  active: boolean;
  panelId?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef?: (element: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={skillTabId(skill)}
      aria-selected={active}
      aria-controls={panelId}
      /**
       * Roving tabindex: only the selected tab is a tab stop. Tab therefore
       * moves OUT of the tab list and into the levels, and the arrow keys move
       * between skills. This is what makes the path usable with the keyboard
       * only: before, focus was trapped cycling through the four skills.
       */
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`flex-1 h-[51px] border-0 p-0 flex items-center justify-center box-border cursor-pointer transition-all duration-200 min-w-[100px] md:w-full md:flex-none md:justify-start md:min-w-0 md:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 ${
        active
          ? "bg-primary-soft border-b-4 border-primary-500 md:border-b-0 md:border-l-4 md:border-primary-500"
          : "bg-transparent border-b-4 border-transparent hover:bg-background-app md:border-b-0 md:border-l-4 md:border-transparent"
      }`}
    >
      <span className="flex items-center gap-3 px-4 box-border w-full justify-center md:justify-start md:pl-6 md:w-[227px]">
        <span
          aria-hidden="true"
          className="inline-flex w-[24.7px] h-[27px] items-center justify-center text-text-primary text-learningPathSkillEmoji"
        >
          {icon}
        </span>
        <span className={`text-label whitespace-nowrap ${active ? "text-primary-500" : "text-text-primary"}`}>
          {label}
        </span>
      </span>
    </button>
  );
}

/**
 * Skill selector implemented as a real ARIA tab list.
 *
 * The four skills switch the content of the same panel, so tab semantics are
 * the correct pattern: arrow keys move between skills, Home/End jump to the
 * first/last one, and Tab leaves the group towards the levels.
 */
export function SkillTabSidebar({
  activeSkill,
  onSkillChange,
  panelId = "learning-path-panel",
}: SkillTabSidebarProps) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const target = skillTabs[(index + skillTabs.length) % skillTabs.length];
    onSkillChange?.(target.skill);
    buttonsRef.current[(index + skillTabs.length) % skillTabs.length]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(skillTabs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <aside
      className="w-full bg-surface-white border-b border-border-default flex flex-col shrink-0 box-border md:w-[280px] md:min-h-[calc(100vh-64px)] md:border-r md:border-b-0"
      data-node-id="12:1592"
      data-name="Sidebar"
    >
      <div
        role="tablist"
        aria-label="Language skills"
        aria-orientation="vertical"
        className="flex flex-row overflow-x-auto w-full md:flex-col md:overflow-x-visible md:pt-6"
      >
        {skillTabs.map((item, index) => (
          <SkillTabButton
            key={item.skill}
            skill={item.skill}
            icon={item.icon}
            label={item.label}
            panelId={panelId}
            active={item.skill === activeSkill}
            buttonRef={(element) => {
              buttonsRef.current[index] = element;
            }}
            onClick={() => onSkillChange?.(item.skill)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>
    </aside>
  );
}
