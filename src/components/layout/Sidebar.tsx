import { useState, type CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";
import { useUser, useProgress } from "../../context/LingoContext";

type SidebarProps = {
  activeRoute: string;
  onNavigate: (route: string) => void;
};

type LessonItem = {
  route: string;
  label: string;
  xp: string;
  state: "completed" | "active" | "locked";
  indicator: string;
};

const itemTextStyle: CSSProperties = {
  ...figmaTokens.typography.styles.label,
  color: figmaTokens.colors.text.primary,
  whiteSpace: "nowrap",
};

const xpStyle: CSSProperties = {
  ...figmaTokens.typography.styles.caption,
  color: figmaTokens.colors.text.secondary,
  whiteSpace: "nowrap",
};

function LessonIndicator({ item }: { item: LessonItem }) {
  if (item.state === "active") {
    return (
      <div
        style={{
          width: figmaTokens.layout.sidebarItemIconSize,
          height: figmaTokens.layout.sidebarItemIconSize,
          borderRadius: figmaTokens.radii.full,
          background: figmaTokens.colors.background.subtle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: figmaTokens.colors.primary[500],
          ...figmaTokens.typography.styles.avatarInitials,
        }}
      >
        {item.indicator}
      </div>
    );
  }

  const background =
    item.state === "completed"
      ? figmaTokens.colors.surface.softGreen
      : figmaTokens.colors.background.muted;
  const color =
    item.state === "completed"
      ? figmaTokens.colors.success[500]
      : figmaTokens.colors.text.secondary;

  return (
    <div
      style={{
        width: figmaTokens.layout.sidebarItemIconSize,
        height: figmaTokens.layout.sidebarItemIconSize,
        borderRadius: figmaTokens.radii.full,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        ...figmaTokens.typography.styles.avatarInitials,
      }}
    >
      {item.indicator}
    </div>
  );
}

function LessonRow({
  item,
  active,
  onNavigate,
}: {
  item: LessonItem;
  active: boolean;
  onNavigate: (route: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = item.state === "locked";
  const rowHeight = active
    ? figmaTokens.layout.sidebarItemHeight + 1
    : figmaTokens.layout.sidebarItemHeight;

  const handleClick = () => {
    if (isLocked) {
      alert("This lesson is locked! Complete previous levels first.");
      return;
    }
    onNavigate(item.route);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        height: rowHeight,
        border: 0,
        padding: 0,
        textAlign: "left",
        background: active
          ? figmaTokens.colors.background.subtle
          : isHovered && !isLocked
            ? figmaTokens.colors.background.app
            : "transparent",
        borderLeft: `${figmaTokens.borderWidths.active}px solid ${active ? figmaTokens.colors.primary[500] : figmaTokens.colors.decoration.black0}`,
        opacity: isLocked ? figmaTokens.opacity.disabledLesson : 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: isLocked ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
      }}
      aria-current={active ? "page" : undefined}
    >
      <div
        style={{
          width: 279,
          display: "flex",
          alignItems: "center",
          gap: figmaTokens.layout.sidebarItemGap,
          paddingLeft: figmaTokens.layout.sidebarItemLeftInset,
          paddingRight: figmaTokens.borderWidths.hairline,
          boxSizing: "border-box",
        }}
      >
        <LessonIndicator item={item} />
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: figmaTokens.spacing[12],
            }}
          >
            <span
              style={{
                ...itemTextStyle,
                color: active
                  ? figmaTokens.colors.primary[500]
                  : figmaTokens.colors.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.label}
            </span>
            <span style={xpStyle}>{item.xp}</span>
          </div>
          {active ? (
            <div
              style={{
                marginTop: figmaTokens.spacing[4],
                width: 137.922,
                height: figmaTokens.borderWidths.active,
                borderRadius: figmaTokens.radii.full,
                background: figmaTokens.colors.background.muted,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: 82.75,
                  height: figmaTokens.borderWidths.active,
                  borderRadius: figmaTokens.radii.full,
                  background: figmaTokens.colors.primary[500],
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}

export function Sidebar({ activeRoute, onNavigate }: SidebarProps) {
  const { user } = useUser();
  const { progress } = useProgress();

  const grammarProgress = progress.find((p) => p.skill === "grammar");
  const levels = grammarProgress?.levels || [];

  const lessonItems: LessonItem[] = levels.map((l, index) => {
    const isDone = l.status === "done";
    const isActive = l.status === "current";
    return {
      route: l.id,
      label: l.title.replace(/^Level \d+ — /, ""),
      xp: `${l.xpReward} XP`,
      state: isDone ? "completed" : isActive ? "active" : "locked",
      indicator: isDone ? "✓" : isActive ? String(index + 1) : "🔒",
    };
  });

  const levelLabel =
    user.level === 4
      ? "Advanced"
      : user.level === 3
        ? "Intermediate"
        : user.level === 2
          ? "Elementary"
          : "Beginner";

  return (
    <aside
      style={{
        width: figmaTokens.layout.homeSidebarWidth,
        minHeight: figmaTokens.layout.sidebarBodyHeight,
        background: figmaTokens.colors.surface.white,
        borderRight: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
      data-node-id="8:62"
      data-name="Sidebar"
    >
      <div
        style={{
          padding: `${figmaTokens.layout.sidebarPaddingY}px ${figmaTokens.layout.sidebarPaddingX}px ${figmaTokens.spacing[12]}px`,
          display: "flex",
          flexDirection: "column",
          gap: figmaTokens.layout.sidebarTopBlockGap,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: figmaTokens.layout.sidebarItemGap,
          }}
        >
          <div
            style={{
              width: figmaTokens.layout.sidebarItemIconSize + 20,
              height: figmaTokens.layout.sidebarItemIconSize + 20,
              borderRadius: figmaTokens.radii.full,
              background: figmaTokens.colors.primary[500],
              color: figmaTokens.colors.primary.onPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...figmaTokens.typography.styles.avatarInitials,
              flexShrink: 0,
            }}
          >
            {user.avatarInitials || "?"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                ...figmaTokens.typography.styles.bodySmall,
                fontWeight: figmaTokens.typography.weights.bold,
                color: figmaTokens.colors.text.primary,
              }}
            >
              {user.fullName || "New User"}
            </span>
            <span
              style={{
                ...figmaTokens.typography.styles.labelSmall,
                color: figmaTokens.colors.text.secondary,
              }}
            >
              Level {user.level} · {levelLabel}
            </span>
          </div>
        </div>

        <div
          style={{
            background: figmaTokens.colors.background.subtle,
            height: figmaTokens.layout.sidebarBadgeHeight,
            borderRadius: figmaTokens.radii.full,
            padding: `4px ${figmaTokens.layout.sidebarBadgePaddingX}px`,
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              ...figmaTokens.typography.styles.caption,
              color: figmaTokens.colors.primary[500],
            }}
          >
            ⚡ {user.xp.toLocaleString()} total XP
          </span>
        </div>
      </div>

      <div
        style={{
          paddingTop: figmaTokens.layout.sidebarSectionGapTop,
          paddingBottom: figmaTokens.layout.sidebarDividerGapBottom,
        }}
      >
        <div
          style={{
            height: figmaTokens.borderWidths.hairline,
            background: figmaTokens.colors.border.default,
            width: "100%",
          }}
        />
      </div>

      <nav
        style={{ display: "flex", flexDirection: "column", width: "100%" }}
        aria-label="Lessons"
      >
        {lessonItems.map((item) => (
          <LessonRow
            key={item.route}
            item={item}
            active={activeRoute === item.route}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
}
