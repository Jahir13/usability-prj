import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ReadableRegionProps {
  /** Accessible name announced when the region receives focus. */
  label: string;
  children: ReactNode;
  className?: string;
  /** HTML id, useful to wire the region with aria-describedby. */
  id?: string;
  /** Set to false for a region that should be announced but not focusable. */
  focusable?: boolean;
}

/**
 * Wrapper for blocks of explanatory text (objectives, rules, examples, hints).
 *
 * Interactive controls are reachable with Tab by default, but static text is
 * not: a keyboard-only user who tabs through the page jumps from button to
 * button and never reads the lesson. Giving the text block `role="group"`,
 * an accessible name and `tabIndex={0}` puts it in the tab order as a single
 * stop, so the whole explanation is read out before the next control.
 */
export function ReadableRegion({
  label,
  children,
  className,
  id,
  focusable = true,
}: ReadableRegionProps) {
  return (
    <section
      id={id}
      role="group"
      aria-label={label}
      tabIndex={focusable ? 0 : undefined}
      className={twMerge(
        clsx(
          "box-border rounded-lg",
          focusable &&
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
        ),
        className
      )}
    >
      {children}
    </section>
  );
}
