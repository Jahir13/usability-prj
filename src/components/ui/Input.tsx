import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        clsx(
          // Base input styles: 10px rounded, 1.5px border, DMSans font, 15px size (matching bodySmall / label), p-3 px-4 (standard height ~48px)
          "w-full p-3 px-4 rounded-sm border-[1.5px] border-border-default text-[15px] font-body outline-none box-border text-text-primary bg-surface-white transition-all",
          // Focus styles: unified focus behavior
          "focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20",
          // Disabled styles
          "disabled:bg-background-app disabled:text-text-secondary disabled:cursor-not-allowed"
        ),
        className
      )}
      {...props}
    />
  );
}
