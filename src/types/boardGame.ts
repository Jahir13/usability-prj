import type { Exercise } from "./index";

export type PlayerCount = 2 | 3 | 4 | 5;

// Every square along the path is a challenge except the two fixed endpoints.
export type BoardSquareType = "start" | "challenge" | "finish";

export interface BoardSquare {
  index: number;
  type: BoardSquareType;
}

export interface BoardPlayer {
  id: string;
  name: string;
  position: number;
}

export type GamePhase = "setup" | "playing" | "finished";

export interface ActiveChallenge {
  exercise: Exercise;
  playerId: string;
}

// Announcements are structured data, not pre-formatted strings, so the
// turn banner can render them in the user's selected native language at
// display time (the reducer itself has no access to that preference).
export type BoardGameAnnouncement =
  | { key: "turnStart"; name: string }
  | { key: "moved"; name: string; value: number; square: number }
  | { key: "bounced"; name: string; value: number; square: number }
  | { key: "wonExact"; name: string; value: number }
  | { key: "challengeCorrectMoved"; name: string; bonus: number; square: number }
  | { key: "challengeCorrectWin"; name: string; bonus: number }
  | { key: "challengeIncorrect"; name: string };

export interface BoardGameState {
  phase: GamePhase;
  setupPlayerCount: PlayerCount;
  setupNames: string[];
  players: BoardPlayer[];
  currentPlayerIndex: number;
  dice: { value: number | null; isRolling: boolean };
  turnLocked: boolean;
  // True while a token is visibly hopping across squares (after the dice
  // value is shown, or after a correct challenge's bonus move) — gates the
  // auto-advance-turn effect so the turn doesn't pass mid-animation.
  isMoving: boolean;
  awaitingChallenge: boolean;
  activeChallenge: ActiveChallenge | null;
  usedExerciseIds: string[];
  announcement: BoardGameAnnouncement | null;
  winnerId: string | null;
}

export type BoardGameAction =
  | { type: "SET_PLAYER_COUNT"; payload: PlayerCount }
  | { type: "SET_PLAYER_NAME"; payload: { index: number; name: string } }
  | { type: "CONFIRM_SETUP"; payload: { defaultNames: string[] } }
  | { type: "BEGIN_ROLL" }
  | { type: "DICE_SETTLED"; payload: { value: number } }
  | { type: "STEP_TOKEN"; payload: { square: number } }
  | { type: "FINISH_MOVE"; payload: { value: number; bounced: boolean } }
  | { type: "OPEN_CHALLENGE"; payload: { exercise: Exercise } }
  | { type: "CLOSE_CHALLENGE_MODAL" }
  | { type: "BEGIN_CHALLENGE_MOVE" }
  | { type: "RESOLVE_CHALLENGE"; payload: { isCorrect: boolean } }
  | { type: "ADVANCE_TURN" }
  | { type: "PLAY_AGAIN" }
  | { type: "RESET_TO_SETUP" };
