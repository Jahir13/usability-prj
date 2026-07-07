import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

export type ActiveSkill = "grammar" | "speaking" | "listening" | "writing";

type SkillTabSidebarProps = {
  activeSkill: ActiveSkill;
  onSkillChange?: (skill: ActiveSkill) => void;
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

const sidebarStyle: CSSProperties = {
  width: figmaTokens.layout.learningPath.sidebarWidth,
  minHeight: figmaTokens.layout.learningPath.sidebarBodyHeight,
  background: figmaTokens.colors.surface.white,
  borderRight: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
};

const listStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  paddingTop: figmaTokens.layout.sidebarPaddingY,
};

function SkillTabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        height: figmaTokens.layout.learningPath.skillTabRowHeight,
        border: 0,
        padding: 0,
        textAlign: "left",
        background: active
          ? figmaTokens.layout.learningPath.skillTabActiveBackground
          : isHovered
            ? figmaTokens.colors.background.app
            : "transparent",
        borderLeft: `${figmaTokens.borderWidths.active}px solid ${active ? figmaTokens.layout.learningPath.skillTabActiveBorder : figmaTokens.colors.decoration.black0}`,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: figmaTokens.layout.learningPath.skillTabRowGap,
          paddingLeft: figmaTokens.layout.learningPath.skillTabRowInsetLeft,
          width: figmaTokens.layout.learningPath.skillTabTextWidth,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            ...figmaTokens.typography.styles.learningPathSkillEmoji,
            display: "inline-flex",
            width: figmaTokens.layout.learningPath.skillTabIconWidth,
            height: figmaTokens.layout.learningPath.skillTabIconHeight,
            alignItems: "center",
            justifyContent: "center",
            color: figmaTokens.colors.text.primary,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            ...figmaTokens.typography.styles.label,
            color: active
              ? figmaTokens.colors.primary[500]
              : figmaTokens.colors.text.primary,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

import { useState } from "react";

export function SkillTabSidebar({ activeSkill, onSkillChange }: SkillTabSidebarProps) {
  return (
    <aside style={sidebarStyle} data-node-id="12:1592" data-name="Sidebar">
      <div style={listStyle}>
        {skillTabs.map((item) => (
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
