import type { CSSProperties } from "react";
import { CircleHelp, Flag, Trophy, type LucideIcon } from "lucide-react";
import type { BoardPlayer, BoardSquareType } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

const SQUARE_ICONS: Record<BoardSquareType, LucideIcon> = {
  start: Flag,
  challenge: CircleHelp,
  finish: Trophy,
};

// Two alternating tints for challenge squares purely for visual rhythm —
// meaning is still carried entirely by the icon + text label, never color.
const CHALLENGE_TINTS = ["border-warning-500 bg-surface-softAmber", "border-primary-500/60 bg-primary-soft"];

const SQUARE_STYLES: Record<Exclude<BoardSquareType, "challenge">, string> = {
  start: "border-primary-500 bg-primary-soft",
  finish: "border-success-500 bg-surface-softGreen",
};

type BoardSquareItemProps = {
  index: number;
  type: BoardSquareType;
  playersHere: BoardPlayer[];
  style?: CSSProperties;
};

// Tokens themselves render in a separate overlay layer (see BoardTrack) so
// they can glide smoothly between squares; this tile still names who is
// here in plain text, so that information never depends on seeing the
// animated tokens land.
export function BoardSquareItem({ index, type, playersHere, style }: BoardSquareItemProps) {
  const strings = useBoardGameStrings();
  const Icon = SQUARE_ICONS[type];
  const label = type === "start" ? strings.squareStart : type === "finish" ? strings.squareFinish : strings.squareChallenge;
  const colorClass = type === "challenge" ? CHALLENGE_TINTS[index % CHALLENGE_TINTS.length] : SQUARE_STYLES[type];

  return (
    <li
      style={style}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-2 min-h-[92px] box-border text-center shadow-sm ${colorClass}`}
    >
      <Icon aria-hidden="true" width={16} height={16} className="text-text-tertiary shrink-0" />
      <span className="text-caption text-text-tertiary leading-tight">
        {strings.squareLabel(index)}
        {label ? ` — ${label}` : ""}
      </span>
      {playersHere.length > 0 && (
        <span className="text-caption text-text-primary font-medium leading-tight">
          {strings.squareOccupancy(playersHere.map((p) => p.name).join(", "))}
        </span>
      )}
    </li>
  );
}
