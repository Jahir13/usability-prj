import { useState } from "react";
import { cva } from "class-variance-authority";
import { StatusMarker } from "../ui/StatusMarker";
import { clsx } from "clsx";

export type LevelStatus = "done" | "in-progress" | "blocked";

type LevelNodeProps = {
  id?: string;
  status: LevelStatus;
  title: string;
  /** Total number of lessons of the level, announced to screen readers. */
  lessonsCount?: number;
  onClick?: () => void;
  /** Called when a blocked level is activated, so the page can explain why. */
  onBlockedClick?: (title: string) => void;
};

function extractLevelNumber(title: string) {
  const match = title.match(/\b(\d+)\b/);
  return match ? match[1] : "?";
}

const statusLabelByStatus: Record<LevelStatus, string> = {
  done: "✓ Done",
  "in-progress": "In Progress",
  blocked: "Blocked",
};

/** Spoken version of the status, so the badge is not just a color/icon. */
const statusSpokenByStatus: Record<LevelStatus, string> = {
  done: "completed",
  "in-progress": "available, in progress",
  blocked: "locked, finish the previous level to unlock it",
};

/* WCAG 1.4.3: Ratios accesibles para badges (done: 5.92:1, in-progress: 5.58:1, blocked: 4.85:1) */
const badgeVariants = cva(
  "h-[26px] rounded-full flex items-center justify-center box-border px-[10px] shrink-0 font-bold",
  {
    variants: {
      status: {
        done: "bg-surface-softGreen text-success-textAccessible",
        "in-progress": "bg-primary-soft text-primary-accessible",
        blocked: "bg-danger-soft text-danger-textAccessible",
      },
    },
    defaultVariants: {
      status: "blocked",
    },
  }
);

const cardVariants = cva(
  "flex-auto min-w-0 bg-surface-white border rounded-lg box-border transition-all duration-200 ease-in-out",
  {
    variants: {
      status: {
        done: "border-border-default shadow-unitCardShadow opacity-100",
        "in-progress": "border-primary-500 shadow-unitCardActiveShadow opacity-100",
        blocked: "border-border-default shadow-unitCardShadow opacity-[0.65]",
      },
      hovered: {
        true: "border-primary-500 shadow-unitCardActiveShadow -translate-y-0.5",
        false: "translate-y-0",
      },
    },
    defaultVariants: {
      status: "blocked",
      hovered: false,
    },
  }
);

/**
 * One level of the learning path.
 *
 * It is a real <button>, so it is reachable with Tab and activated with Enter
 * or Space. Blocked levels stay focusable (with aria-disabled) instead of being
 * removed from the tab order: a screen reader user needs to know the level
 * exists and why it cannot be opened yet.
 */
export function LevelNode({
  status,
  title,
  lessonsCount,
  onClick,
  onBlockedClick,
}: LevelNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isBlocked = status === "blocked";
  const circleNumber = extractLevelNumber(title);

  const lessonsText = lessonsCount ? `, ${lessonsCount} lessons` : "";
  const accessibleName = `${title}${lessonsText}. ${statusSpokenByStatus[status]}`;

  const handleClick = () => {
    if (isBlocked) {
      onBlockedClick?.(title);
      return;
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-disabled={isBlocked || undefined}
      aria-label={accessibleName}
      onMouseEnter={() => !isBlocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !isBlocked && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`relative w-full flex items-center gap-4 z-[5] bg-transparent border-0 p-0 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
        isBlocked ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <span className="relative w-2 h-12 shrink-0 block">
        <StatusMarker
          status={status}
          size="lg"
          content={status === "in-progress" ? circleNumber : undefined}
          className={clsx("absolute left-[-40px] top-0", {
            "scale-[1.08]": isHovered && !isBlocked,
            "scale-100": !(isHovered && !isBlocked),
          })}
        />
      </span>

      <span className={cardVariants({ status, hovered: isHovered && !isBlocked })}>
        <span className="py-[17px] px-[21px] flex items-center justify-between gap-3 box-border">
          <span className="text-learningPathLevelTitle text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>

          <span className={badgeVariants({ status })} aria-hidden="true">
            <span className="text-learningPathLevelStatus">
              {statusLabelByStatus[status]}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
