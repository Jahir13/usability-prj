import type { LucideIcon } from "lucide-react";
import { skillMetaList } from "../../config/skillMeta";

export type ActiveSkill = "grammar" | "speaking" | "listening" | "writing" | "games";

type SkillTabSidebarProps = {
  activeSkill: ActiveSkill;
  onSkillChange?: (skill: ActiveSkill) => void;
};

function SkillTabButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`flex-1 h-[51px] border-0 p-0 flex items-center justify-center box-border cursor-pointer transition-all duration-200 min-w-[100px] md:w-full md:flex-none md:justify-start md:min-w-0 md:border-b-0 ${
        active
          ? "bg-primary-soft border-b-4 border-primary-500 md:border-b-0 md:border-l-4 md:border-primary-500"
          : "bg-transparent border-b-4 border-transparent hover:bg-background-app md:border-b-0 md:border-l-4 md:border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 px-4 box-border w-full justify-center md:justify-start md:pl-6 md:w-[227px]">
        <span className="inline-flex w-[24.7px] h-[27px] items-center justify-center shrink-0">
          <Icon
            aria-hidden="true"
            focusable="false"
            className={active ? "text-primary-500" : "text-text-primary"}
            width={22}
            height={22}
            strokeWidth={2}
          />
        </span>
        <span className={`text-label whitespace-nowrap ${active ? "text-primary-500" : "text-text-primary"}`}>
          {label}
        </span>
      </div>
    </button>
  );
}

export function SkillTabSidebar({ activeSkill, onSkillChange }: SkillTabSidebarProps) {
  return (
    <aside className="w-full bg-surface-white border-b border-border-default flex flex-col shrink-0 box-border md:w-[280px] md:min-h-[calc(100vh-64px)] md:border-r md:border-b-0" data-node-id="12:1592" data-name="Sidebar">
      <div className="flex flex-row overflow-x-auto w-full md:flex-col md:overflow-x-visible md:pt-6">
        {skillMetaList.map((item) => (
          <SkillTabButton
            key={item.skill}
            icon={item.icon}
            label={item.label}
            active={item.skill === activeSkill}
            onClick={() => onSkillChange?.(item.skill)}
          />
        ))}
      </div>
    </aside>
  );
}
