import { Check } from "lucide-react";
import type { PlayerCount } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

const PLAYER_COUNT_OPTIONS: PlayerCount[] = [2, 3, 4, 5];

type PlayerCountPickerProps = {
  value: PlayerCount;
  onChange: (count: PlayerCount) => void;
};

export function PlayerCountPicker({ value, onChange }: PlayerCountPickerProps) {
  const strings = useBoardGameStrings();

  return (
    <div className="flex flex-col gap-2 text-left">
      <span id="player-count-label" className="text-labelSmall text-text-tertiary">
        {strings.setupPlayerCountLabel}
      </span>
      <div className="flex gap-3" role="radiogroup" aria-labelledby="player-count-label">
        {PLAYER_COUNT_OPTIONS.map((count) => {
          const isSelected = value === count;
          return (
            <button
              key={count}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(count)}
              className={`flex-1 h-14 rounded-sm border-[1.5px] font-body font-bold text-label flex items-center justify-center gap-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                isSelected
                  ? "border-primary-500 bg-primary-soft text-text-primary"
                  : "border-border-default bg-surface-white text-text-primary hover:bg-background-app"
              }`}
            >
              {count}
              {isSelected && <Check aria-hidden="true" size={16} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
