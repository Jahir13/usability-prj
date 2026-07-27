import type { ReactNode } from "react";
import { ReadableRegion } from "../ui/ReadableRegion";

type ObjectivesChecklistProps = {
  levelText: string;
  title: string;
  description: string;
  objectives: string[];
  /** Heading level used for the lesson title (h1 on the lesson page). */
  headingLevel?: 1 | 2;
  /** Id, so other elements can reference this block with aria-describedby. */
  id?: string;
};

function ObjectiveItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 box-border m-0">
      {/* WCAG 1.4.3: Usar bg-warning-textAccessible (#B45309) para texto blanco ✓ con ratio 6.10:1 */}
      <span
        aria-hidden="true"
        className="w-[22px] h-[22px] mt-0.5 rounded-full bg-warning-textAccessible flex items-center justify-center text-text-onPrimary shrink-0"
      >
        <span className="text-caption font-bold">✓</span>
      </span>
      <p className="text-bodySmall text-text-primary leading-[22.5px] m-0">
        {children}
      </p>
    </li>
  );
}

/**
 * Lesson header: level tag, title, description and objectives.
 *
 * The whole block is a single focusable region so that a keyboard user tabbing
 * through the lesson actually hears what the lesson is about, instead of
 * jumping straight to the "Start the level" button.
 */
export function ObjectivesChecklist({
  levelText,
  title,
  description,
  objectives,
  headingLevel = 1,
  id,
}: ObjectivesChecklistProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <ReadableRegion
      id={id}
      label={`Lesson description: ${title}`}
      className="w-full min-h-[396px] bg-surface-white text-left"
    >
      <div className="w-full min-h-[396px] box-border py-8 px-6 md:px-16 flex flex-col justify-center">
        <div className="pb-6 box-border">
          {/* WCAG 1.4.3: Usar text-primary-accessible (#3550DC) sobre bg-primary-soft (#EEF1FD) para ratio 5.58:1 */}
          <p
            className="inline-flex items-center h-[26px] px-3 rounded-full bg-primary-soft text-primary-accessible font-bold box-border m-0"
            data-node-id="81:6"
            data-name="Text"
          >
            <span className="text-captionUppercase">{levelText}</span>
          </p>
        </div>

        <div className="pb-4 box-border" data-node-id="81:8">
          <Heading className="text-sectionTitle text-[32px] leading-[40px] md:text-[40px] md:leading-[46px] text-text-primary m-0">
            {title}
          </Heading>
        </div>

        <div className="pb-8 box-border" data-node-id="81:11">
          <p className="text-body text-text-primary max-w-[480px] m-0" data-node-id="81:13">
            {description}
          </p>
        </div>

        {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) para ratio 6.47:1 */}
        <h2 className="text-eyebrow text-text-secondaryAccessible font-bold m-0 pb-3">What you will learn</h2>

        <ul className="flex flex-col gap-3 box-border list-none p-0 m-0" data-node-id="81:14">
          {objectives.map((objective) => (
            <ObjectiveItem key={objective}>{objective}</ObjectiveItem>
          ))}
        </ul>
      </div>
    </ReadableRegion>
  );
}
