import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "soft-amber";
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          // Base card styles: 16px rounded (rounded-lg)
          "rounded-lg box-border",
          {
            "bg-surface-white border border-border-default shadow-unitCardShadow": variant === "default",
            "bg-background-elevated border-l-4 border-primary-500 border-t border-r border-b border-t-border-default border-r-border-default border-b-border-default": variant === "elevated",
            "bg-surface-softAmber border-0": variant === "soft-amber",
          }
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
