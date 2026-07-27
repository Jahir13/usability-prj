import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check, Lock } from "lucide-react";

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
  const iconSize = size === "lg" ? 20 : 12;

  // Real SVG icons instead of emoji glyphs, so the marker renders the same
  // way everywhere. It's always paired with a visible text status label at
  // the call site, so this marker itself is decorative (aria-hidden below).
  const displayContent =
    content !== undefined ? (
      content
    ) : isDone ? (
      <Check width={iconSize} height={iconSize} strokeWidth={3} />
    ) : isBlocked ? (
      <Lock width={iconSize} height={iconSize} strokeWidth={2.5} />
    ) : (
      "?"
    );

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        clsx(
          "rounded-full flex items-center justify-center shrink-0 box-border transition-all duration-200 ease-in-out",
          // Size classes
          {
            "w-12 h-12 text-learningPathLevelTitle": size === "lg",
            "w-5 h-5 text-caption rounded-[10px]": size === "sm", // rounded-sm is 10px, maps to sidebarItemIconRadius
          },
          // Status styles mapping to design system tokens
          {
            "bg-surface-softGreen text-success-500": status === "done",
            "bg-primary-soft text-primary-500": status === "in-progress" && size === "sm",
            "bg-primary-soft text-primary-500 border-2 border-primary-500 animate-pulse": status === "in-progress" && size === "lg",
            "bg-background-muted text-text-secondary": status === "blocked" && size === "sm",
            "bg-danger-soft text-danger-500 opacity-70": status === "blocked" && size === "lg",
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
