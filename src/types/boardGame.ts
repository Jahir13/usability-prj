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
//
// Simplified rule: rolling only proposes a move — nothing moves until the
// question is answered. Answer correctly and you advance by the rolled
// value (bouncing back if it overshoots the finish); answer incorrectly
// (there is no skip) and you stay exactly where you were.
export type BoardGameAnnouncement =
  | { key: "turnStart"; name: string }
  | { key: "correctAdvance"; name: string; value: number; square: number; bounced: boolean; won: boolean }
  | { key: "incorrectStay"; name: string; value: number; square: number };

export interface BoardGameState {
  phase: GamePhase;
  setupPlayerCount: PlayerCount;
  setupNames: string[];
  players: BoardPlayer[];
  currentPlayerIndex: number;
  dice: { value: number | null; isRolling: boolean };
  turnLocked: boolean;
  // True while a token is visibly hopping across squares after a correct
  // answer — gates the auto-advance-turn effect so the turn doesn't pass
  // mid-animation.
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
  | { type: "OPEN_CHALLENGE"; payload: { exercise: Exercise } }
  | { type: "CLOSE_CHALLENGE_MODAL" }
  | { type: "STEP_TOKEN"; payload: { square: number } }
  | { type: "BEGIN_CHALLENGE_MOVE" }
  | { type: "CORRECT_ADVANCE"; payload: { value: number; bounced: boolean } }
  | { type: "INCORRECT_STAY"; payload: { value: number } }
  | { type: "ADVANCE_TURN" }
  | { type: "PLAY_AGAIN" }
  | { type: "RESET_TO_SETUP" };
