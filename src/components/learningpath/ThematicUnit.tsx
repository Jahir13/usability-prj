import { LevelNode, type LevelStatus } from "./LevelNode";

type ThematicUnitProps = {
  title: string;
  levels: Array<{
    id: string;
    title: string;
    status: LevelStatus;
    lessonsCount?: number;
  }>;
  onLevelClick?: (levelId: string) => void;
  onBlockedLevelClick?: (title: string) => void;
};

/**
 * A thematic unit and its levels.
 *
 * The unit name is a real heading (h3 under the "Learning Path" h2) and the
 * levels are a list, so screen reader users can jump between units and know
 * how many levels each one contains.
 */
export function ThematicUnit({
  title,
  levels,
  onLevelClick,
  onBlockedLevelClick,
}: ThematicUnitProps) {
  const headingId = `unit-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className="relative w-full box-border" aria-labelledby={headingId}>
      {/* WCAG 1.4.3: Usar text-warning-textAccessible (#B45309) sobre surface-softAmber para ratio 5.45:1 */}
      <h3
        id={headingId}
        className="inline-flex items-center h-[26px] rounded-full px-3 bg-surface-softAmber text-warning-textAccessible box-border text-left m-0 font-bold"
      >
        <span className="text-learningPathUnitTag">
          Thematic Unit: {title}
        </span>
      </h3>

      <ul className="flex flex-col gap-3 mt-4 box-border list-none p-0 m-0">
        {levels.map((level) => (
          <li key={level.id} className="m-0 p-0">
            <LevelNode
              id={level.id}
              title={level.title}
              status={level.status}
              lessonsCount={level.lessonsCount}
              onClick={() => onLevelClick?.(level.id)}
              onBlockedClick={onBlockedLevelClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
