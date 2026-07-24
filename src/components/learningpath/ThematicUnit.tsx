import { LevelNode, type LevelStatus } from "./LevelNode";

type ThematicUnitProps = {
  title: string;
  levels: Array<{
    id: string;
    title: string;
    status: LevelStatus;
  }>;
  onLevelClick?: (levelId: string) => void;
};

export function ThematicUnit({ title, levels, onLevelClick }: ThematicUnitProps) {
  return (
    <section className="relative w-full box-border">
      <div className="inline-flex items-center h-[26px] rounded-full px-3 bg-surface-softAmber text-warning-500 box-border text-left">
        <span className="text-learningPathUnitTag">
          Thematic Unit: {title}
        </span>
      </div>

      <div className="flex flex-col gap-3 mt-4 box-border">
        {levels.map((level) => (
          <LevelNode
            key={level.id}
            id={level.id}
            title={level.title}
            status={level.status}
            onClick={() => onLevelClick?.(level.id)}
          />
        ))}
      </div>
    </section>
  );
}
