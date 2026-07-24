import type { ReactNode } from "react";

type ObjectivesChecklistProps = {
  levelText: string;
  title: string;
  description: string;
  objectives: string[];
};

function ObjectiveItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 box-border">
      <div className="w-[22px] h-[22px] mt-0.5 rounded-full bg-warning-500 flex items-center justify-center text-text-onPrimary shrink-0">
        <span className="text-caption">✓</span>
      </div>
      <p className="text-bodySmall text-text-primary leading-[22.5px] m-0 whitespace-nowrap">
        {children}
      </p>
    </div>
  );
}

export function ObjectivesChecklist({
  levelText,
  title,
  description,
  objectives,
}: ObjectivesChecklistProps) {
  return (
    <section className="w-full min-h-[396px] rounded-lg bg-surface-white box-border text-left" data-node-id="81:4" data-name="Container">
      <div className="w-full min-h-[396px] box-border py-8 px-16 flex flex-col justify-center">
        <div className="pb-6 box-border">
          <div
            className="inline-flex items-center h-[26px] px-3 rounded-full bg-primary-soft text-primary-500 box-border"
            data-node-id="81:6"
            data-name="Text"
          >
            <span className="text-captionUppercase">
              {levelText}
            </span>
          </div>
        </div>

        <div className="pb-4 box-border" data-node-id="81:8">
          <h1
            className="text-sectionTitle text-[40px] leading-[46px] text-text-primary m-0 whitespace-nowrap"
            data-node-id="81:10"
          >
            {title}
          </h1>
        </div>

        <div className="pb-8 box-border" data-node-id="81:11">
          <p
            className="text-body text-text-primary max-w-[420px] m-0"
            data-node-id="81:13"
          >
            {description}
          </p>
        </div>

        <div
          className="flex flex-col gap-3 box-border"
          data-node-id="81:14"
        >
          {objectives.map((objective) => (
            <ObjectiveItem key={objective}>{objective}</ObjectiveItem>
          ))}
        </div>
      </div>
    </section>
  );
}
