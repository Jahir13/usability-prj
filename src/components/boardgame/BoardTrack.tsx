import type { CSSProperties } from "react";
import { BOARD_SQUARES } from "../../config/boardGameConfig";
import type { BoardPlayer } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import { BoardSquareItem } from "./BoardSquareItem";
import { PlayerToken } from "./PlayerToken";

type BoardTrackProps = {
  players: BoardPlayer[];
};

const ROW_LENGTH = 4;
const ROW_HEIGHT = 150;
const WAVE_AMPLITUDE = 14;
const TILE_WIDTH_PCT = 100 / ROW_LENGTH;
// Generous estimate of a tile's rendered height (icon + label + up to two
// lines of "on this square" text) — used purely to keep the first/last row
// from being clipped by the board's rounded, overflow-hidden frame.
const TILE_HEIGHT_ESTIMATE = 150;
const TOP_PAD = TILE_HEIGHT_ESTIMATE / 2 + WAVE_AMPLITUDE;

// Squares stay in strict document order 0..N so a screen reader (and Tab
// order) reads the track as one increasing sequence. Only the visual
// placement follows a winding, snake-like path: a gentle wave across each
// row, with rows alternating direction (and wave phase) so they flow into
// one another like a single curving road instead of a rigid grid.
function getSquareCenter(index: number): { leftPct: number; topPx: number } {
  const row = Math.floor(index / ROW_LENGTH);
  const colInRow = index % ROW_LENGTH;
  const goingRight = row % 2 === 0;
  const visualCol = goingRight ? colInRow : ROW_LENGTH - 1 - colInRow;

  const leftPct = (visualCol + 0.5) * TILE_WIDTH_PCT;
  const waveT = ROW_LENGTH > 1 ? visualCol / (ROW_LENGTH - 1) : 0.5;
  const hump = Math.sin(waveT * Math.PI) * WAVE_AMPLITUDE;
  const topPx = TOP_PAD + row * ROW_HEIGHT + (goingRight ? -hump : hump);

  return { leftPct, topPx };
}

// Smooth "connect the dots" curve: each original point becomes a control
// point for a quadratic curve through the midpoints, which reads as one
// continuous winding line rather than sharp zig-zag segments.
function buildPathD(count: number): string {
  if (count === 0) return "";
  const points = Array.from({ length: count }, (_, i) => getSquareCenter(i));

  let d = `M ${points[0].leftPct} ${points[0].topPx}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.leftPct + curr.leftPct) / 2;
    const midY = (prev.topPx + curr.topPx) / 2;
    d += ` Q ${prev.leftPct} ${prev.topPx} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.leftPct} ${last.topPx}`;
  return d;
}

export function BoardTrack({ players }: BoardTrackProps) {
  const strings = useBoardGameStrings();
  const rows = Math.ceil(BOARD_SQUARES.length / ROW_LENGTH);
  const containerHeight = TOP_PAD + (rows - 1) * ROW_HEIGHT + WAVE_AMPLITUDE + TILE_HEIGHT_ESTIMATE / 2;
  const pathD = buildPathD(BOARD_SQUARES.length);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-primary-soft to-surface-softOrange p-4 md:p-6 box-border shadow-inner overflow-hidden">
      {/* The <ol> below must only ever contain <li> children (BoardSquareItem) —
          the connecting path and the token overlay are purely decorative and
          sit outside it, sharing this positioning context instead. */}
      <div className="relative w-full" style={{ height: containerHeight }}>
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 100 ${containerHeight}`}
          preserveAspectRatio="none"
        >
          <path d={pathD} className="stroke-surface-white" strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d={pathD} className="stroke-primary-500/25" strokeWidth={10} fill="none" strokeLinecap="round" />
        </svg>

        <ol aria-label={strings.boardLabel} className="list-none m-0 p-0 box-border">
          {BOARD_SQUARES.map((square) => {
            const { leftPct, topPx } = getSquareCenter(square.index);
            const style: CSSProperties = {
              position: "absolute",
              left: `${leftPct}%`,
              top: topPx,
              transform: "translate(-50%, -50%)",
              width: `${TILE_WIDTH_PCT * 0.72}%`,
              minWidth: 92,
            };
            return (
              <BoardSquareItem
                key={square.index}
                index={square.index}
                type={square.type}
                playersHere={players.filter((p) => p.position === square.index)}
                style={style}
              />
            );
          })}
        </ol>

        {/* Decorative token overlay: glides between squares via a CSS
            transition on left/top as `position` changes. Purely visual —
            each BoardSquareItem already names who's on it in plain text. */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {players.map((player, playerIndex) => {
            const { leftPct, topPx } = getSquareCenter(player.position);
            const fanOffset = (playerIndex - (players.length - 1) / 2) * 12;
            return (
              <div
                key={player.id}
                className="absolute transition-all duration-300 ease-out motion-reduce:transition-none"
                style={{
                  left: `${leftPct}%`,
                  top: topPx - 24,
                  transform: `translate(calc(-50% + ${fanOffset}px), -50%)`,
                }}
              >
                <PlayerToken player={player} size="sm" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
