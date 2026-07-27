import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type StatusMarkerStatus = "done" | "in-progress" | "blocked";

export interface StatusMarkerProps {
  status: StatusMarkerStatus;
  size?: "sm" | "lg";
  content?: string | number;
  className?: string;
}

export function StatusMarker({
  status,
  size = "lg",
  content,
  className,
}: StatusMarkerProps) {
  const isDone = status === "done";
  const isBlocked = status === "blocked";

  // Content fallbacks matching design markers
  const displayContent = content !== undefined 
    ? content 
    : isDone 
      ? "✓" 
      : isBlocked 
        ? "🔒" 
        : "?";

  return (
    <div
      className={twMerge(
        clsx(
          "rounded-full flex items-center justify-center shrink-0 box-border transition-all duration-200 ease-in-out",
          // Size classes
          {
            "w-12 h-12 text-learningPathLevelTitle": size === "lg",
            "w-5 h-5 text-caption rounded-[10px]": size === "sm", // rounded-sm is 10px, maps to sidebarItemIconRadius
          },
          /* WCAG 1.4.3: Status styles mapping con tokens accesibles */
          {
            "bg-surface-softGreen text-success-textAccessible": status === "done",
            "bg-primary-soft text-primary-accessible": status === "in-progress" && size === "sm",
            "bg-primary-soft text-primary-accessible border-2 border-primary-accessible animate-pulse": status === "in-progress" && size === "lg",
            "bg-background-muted text-text-secondaryAccessible": status === "blocked" && size === "sm",
            "bg-danger-soft text-danger-textAccessible opacity-80": status === "blocked" && size === "lg",
          }
        ),
        className
      )}
    >
      <span className={clsx({
        "font-bold": size === "lg",
        "font-medium": size === "sm",
      })}>
        {displayContent}
      </span>
    </div>
  );
}
