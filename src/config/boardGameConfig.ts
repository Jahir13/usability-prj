import type { Exercise } from "../types";
import type { BoardSquare } from "../types/boardGame";
import { EXERCISES_DATABASE } from "./lessonsData";

// Shorter than before: every intermediate square is now a challenge, so a
// smaller board keeps a full game (with 2-5 players each answering on
// nearly every turn) to a reasonable length.
export const BOARD_LENGTH = 20;
export const CHALLENGE_BONUS_SQUARES = 2;
export const WIN_XP_REWARD = 100;

function generateBoardSquares(length: number): BoardSquare[] {
  const squares: BoardSquare[] = [];
  for (let index = 0; index < length; index++) {
    if (index === 0) {
      squares.push({ index, type: "start" });
    } else if (index === length - 1) {
      squares.push({ index, type: "finish" });
    } else {
      squares.push({ index, type: "challenge" });
    }
  }
  return squares;
}

export const BOARD_SQUARES: BoardSquare[] = generateBoardSquares(BOARD_LENGTH);

// Challenge tiles only use choice/input/reorder exercises — speaking and
// listening need a mic/audio turn per player, which doesn't fit a shared
// device pass-and-play game.
const CHALLENGE_EXERCISE_POOL: Exercise[] = Object.values(EXERCISES_DATABASE)
  .flat()
  .filter((exercise) => exercise.type === "choice" || exercise.type === "input" || exercise.type === "reorder");

export function pickRandomChallengeExercise(excludeIds: string[]): Exercise {
  let pool = CHALLENGE_EXERCISE_POOL.filter((exercise) => !excludeIds.includes(exercise.id));
  if (pool.length === 0) {
    pool = CHALLENGE_EXERCISE_POOL;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// Player tokens ("fichas"): a small, fixed palette reused from the existing
// design tokens (not a new ad hoc color set), assigned by player index so
// it stays stable across renders. Color is always paired with the player's
// number, never the only way to tell players apart.
const PLAYER_TOKEN_COLORS = ["bg-primary-500", "bg-success-500", "bg-danger-500", "bg-warning-500", "bg-text-tertiary"];

function getPlayerIndex(playerId: string): number {
  return Number(playerId.split("-")[1]) || 0;
}

export function getPlayerTokenColorClass(playerId: string): string {
  return PLAYER_TOKEN_COLORS[getPlayerIndex(playerId) % PLAYER_TOKEN_COLORS.length];
}

// The token shows the player's number rather than a name initial: two
// players with similar default names (e.g. "Player 1"/"Player 2" or their
// translated equivalents) would otherwise get the same letter and become
// indistinguishable at a glance.
export function getPlayerTokenLabel(playerId: string): string {
  return String(getPlayerIndex(playerId) + 1);
}
