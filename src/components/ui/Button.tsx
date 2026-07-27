import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-primary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={twMerge(
        clsx(
          // Base button styles
          "inline-flex items-center justify-center font-body font-bold border-0 cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          // Variant classes mapping to figma tokens / design system styles
          {
            "bg-primary-500 text-text-onPrimary shadow-primaryCta hover:scale-[1.02] active:scale-95 hover:shadow-[0_6px_20px_rgba(79,110,247,0.4)] focus-visible:ring-primary-500":
              variant === "primary",
            "bg-surface-white border border-border-default text-text-tertiary hover:bg-background-app active:scale-95 focus-visible:ring-border-default":
              variant === "secondary",
            "bg-surface-white border border-primary-500 text-primary-500 hover:bg-primary-soft active:scale-95 focus-visible:ring-primary-500":
              variant === "outline-primary",
            "bg-transparent border border-border-default text-danger-500 hover:bg-danger-soft active:scale-95 focus-visible:ring-danger-500":
              variant === "danger",
            "bg-transparent border-0 text-text-tertiary hover:opacity-80 active:scale-95 focus-visible:ring-primary-500":
              variant === "ghost",
          },
          // Size classes mapping to button heights in design tokens
          {
            "h-9 px-4 text-labelSmall rounded-full": size === "sm",
            "h-12 px-6 text-label rounded-full": size === "md",
            "h-[52px] px-8 text-base rounded-full": size === "lg",
            "h-14 px-8 text-[17px] leading-[25.5px] rounded-full": size === "xl",
          },
          // Disabled states
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:shadow-none"
        ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
