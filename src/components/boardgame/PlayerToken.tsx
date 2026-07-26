import type { BoardPlayer } from "../../types/boardGame";
import { getPlayerTokenColorClass, getPlayerTokenLabel } from "../../config/boardGameConfig";

type PlayerTokenProps = {
  player: BoardPlayer;
  size?: "sm" | "md";
};

// A "ficha" (token): color plus the player's initial, always redundant with
// visible player-name text elsewhere, so color is never the only cue.
export function PlayerToken({ player, size = "sm" }: PlayerTokenProps) {
  const sizeClass = size === "md" ? "w-9 h-9 text-label" : "w-6 h-6 text-caption";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full text-text-onPrimary font-bold shrink-0 border-2 border-surface-white shadow-sm ${sizeClass} ${getPlayerTokenColorClass(
        player.id
      )}`}
    >
      {getPlayerTokenLabel(player.id)}
    </span>
  );
}
