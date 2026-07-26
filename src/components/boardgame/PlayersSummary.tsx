import type { BoardPlayer } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import { PlayerToken } from "./PlayerToken";

type PlayersSummaryProps = {
  players: BoardPlayer[];
  currentPlayerId: string;
};

// Plain (non-live) quick-scan list of every player's square, so positions
// are always available as text without reading through all the board squares.
export function PlayersSummary({ players, currentPlayerId }: PlayersSummaryProps) {
  const strings = useBoardGameStrings();

  return (
    <ul aria-label={strings.playersListLabel} className="flex flex-col gap-2 list-none m-0 p-0 text-left">
      {players.map((player) => {
        const isCurrent = player.id === currentPlayerId;
        return (
          <li
            key={player.id}
            className={`flex items-center gap-3 rounded-sm border p-3 ${
              isCurrent ? "border-primary-500 bg-primary-soft" : "border-border-default bg-surface-white"
            }`}
          >
            <PlayerToken player={player} size="sm" />
            <span className={`text-label flex-1 text-text-primary ${isCurrent ? "font-bold" : ""}`}>
              {player.name}
              {isCurrent ? ` ${strings.currentTurnTag}` : ""}
            </span>
            <span className="text-labelSmall text-text-tertiary">{strings.squareLabel(player.position)}</span>
          </li>
        );
      })}
    </ul>
  );
}
