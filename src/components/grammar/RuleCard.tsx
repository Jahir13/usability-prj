import type { ReactNode } from "react";
import { Card } from "../ui/Card";

type RuleCardProps = {
  title?: string;
  formula: ReactNode;
  formulaLabel: string;
};

export function RuleCard({ title = "MAIN RULE", formula, formulaLabel }: RuleCardProps) {
  return (
    <Card variant="elevated" className="w-full min-h-[120px] py-6 px-[28px] text-left">
      <div className="pb-3 text-left">
        <span className="text-eyebrow text-text-secondary">
          {title}
        </span>
      </div>

      <div className="box-border text-left">
        {formula}
      </div>

      <div className="pt-3 box-border text-left">
        <div className="bg-surface-white rounded-xl px-3 py-2 box-border inline-flex items-center">
          <span className="text-mono text-text-primary whitespace-nowrap">
            {formulaLabel}
          </span>
        </div>
      </div>
    </Card>
  );
}

