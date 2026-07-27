import type { ReactNode } from "react";
import { ReadableRegion } from "../ui/ReadableRegion";

type RuleCardProps = {
  title?: string;
  formula: ReactNode;
  formulaLabel: string;
};

/**
 * The rule of the lesson. Focusable region: the pattern and its formula are
 * the core explanation and must be reachable with the keyboard.
 */
export function RuleCard({ title = "MAIN RULE", formula, formulaLabel }: RuleCardProps) {
  return (
    <ReadableRegion
      label={`${title}: ${formulaLabel}`}
      className="w-full min-h-[120px] py-6 px-[28px] text-left bg-background-elevated border-l-4 border-primary-500 border-t border-r border-b border-t-border-default border-r-border-default border-b-border-default"
    >
      <div className="pb-3 text-left">
        {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) sobre background.elevated (#F0F1F8) para ratio 6.10:1 */}
        <h2 className="text-eyebrow text-text-secondaryAccessible font-bold m-0">{title}</h2>
      </div>

      <div className="box-border text-left">{formula}</div>

      <div className="pt-3 box-border text-left">
        <div className="bg-surface-white rounded-xl px-3 py-2 box-border inline-flex items-center">
          <span className="text-mono text-text-primary">{formulaLabel}</span>
        </div>
      </div>
    </ReadableRegion>
  );
}
