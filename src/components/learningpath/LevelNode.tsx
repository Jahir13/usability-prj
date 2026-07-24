import { useState } from "react";
import { cva } from "class-variance-authority";
import { StatusMarker } from "../ui/StatusMarker";
import { clsx } from "clsx";

export type LevelStatus = "done" | "in-progress" | "blocked";

type LevelNodeProps = {
  id?: string;
  status: LevelStatus;
  title: string;
  onClick?: () => void;
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

const badgeVariants = cva(
  "h-[26px] rounded-full flex items-center justify-center box-border px-[10px] shrink-0",
  {
    variants: {
      status: {
        done: "bg-surface-softGreen text-success-500",
        "in-progress": "bg-primary-soft text-primary-500",
        blocked: "bg-danger-soft text-danger-500",
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

export function LevelNode({ status, title, onClick }: LevelNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isBlocked = status === "blocked";
  const circleNumber = extractLevelNumber(title);

  return (
    <div
      onClick={!isBlocked ? onClick : undefined}
      onMouseEnter={() => !isBlocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex items-center gap-4 z-[5] ${isBlocked ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="relative w-2 h-12 shrink-0">
        <StatusMarker
          status={status}
          size="lg"
          content={status === "in-progress" ? circleNumber : undefined}
          className={clsx("absolute left-[-40px] top-0", {
            "scale-[1.08]": isHovered && !isBlocked,
            "scale-100": !(isHovered && !isBlocked),
          })}
        />
      </div>

      <div className={cardVariants({ status, hovered: isHovered && !isBlocked })}>
        <div className="py-[17px] px-[21px] flex items-center justify-between gap-3 box-border">
          <span className="text-learningPathLevelTitle text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>

          <span className={badgeVariants({ status })}>
            <span className="text-learningPathLevelStatus">
              {statusLabelByStatus[status]}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

