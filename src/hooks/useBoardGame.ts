import { useCallback, useEffect, useReducer } from "react";
import type { BoardGameAction, BoardGameState, BoardPlayer, PlayerCount } from "../types/boardGame";
import { BOARD_LENGTH, CHALLENGE_BONUS_SQUARES, pickRandomChallengeExercise } from "../config/boardGameConfig";

declare global {
  interface Window {
    // Dev-only escape hatch so automated tests can force deterministic dice
    // rolls instead of relying on Math.random(). Never read outside DEV.
    __LINGOGURU_TEST_DICE__?: number[];
  }
}

function consumeTestDiceValue(): number | undefined {
  if (!import.meta.env.DEV) return undefined;
  const queue = window.__LINGOGURU_TEST_DICE__;
  if (!queue || queue.length === 0) return undefined;
  return queue.shift();
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The sequence of squares a token visibly hops through for a given move,
// in order (excludes the starting square, includes the final one). A move
// that would overshoot the finish walks up to it and back down instead.
function computeStepPath(fromPosition: number, distance: number): number[] {
  const finishIndex = BOARD_LENGTH - 1;
  const target = fromPosition + distance;
  const path: number[] = [];

  if (target <= finishIndex) {
    for (let sq = fromPosition + 1; sq <= target; sq++) path.push(sq);
  } else {
    for (let sq = fromPosition + 1; sq <= finishIndex; sq++) path.push(sq);
    const overshoot = target - finishIndex;
    for (let sq = finishIndex - 1; sq >= finishIndex - overshoot; sq--) path.push(sq);
  }
  return path;
}

const STEP_DELAY_MS = 480;
const ROLL_SHUFFLE_MS = 700;
const ROLL_RESULT_PAUSE_MS = 500;
// Pause after the token visibly lands on its final square, before the
// challenge modal (or the win/turn-pass state) appears — so arrival always
// reads as a distinct beat, not something that happens mid-hop.
const LANDING_PAUSE_MS = 550;

const initialState: BoardGameState = {
  phase: "setup",
  setupPlayerCount: 2,
  setupNames: ["", "", "", "", ""],
  players: [],
  currentPlayerIndex: 0,
  dice: { value: null, isRolling: false },
  turnLocked: false,
  isMoving: false,
  awaitingChallenge: false,
  activeChallenge: null,
  usedExerciseIds: [],
  announcement: null,
  winnerId: null,
};

function boardGameReducer(state: BoardGameState, action: BoardGameAction): BoardGameState {
  switch (action.type) {
    case "SET_PLAYER_COUNT":
      return { ...state, setupPlayerCount: action.payload };

    case "SET_PLAYER_NAME": {
      const setupNames = [...state.setupNames];
      setupNames[action.payload.index] = action.payload.name;
      return { ...state, setupNames };
    }

    case "CONFIRM_SETUP": {
      const players: BoardPlayer[] = Array.from({ length: state.setupPlayerCount }, (_, i) => ({
        id: `player-${i}`,
        name: state.setupNames[i]?.trim() || action.payload.defaultNames[i] || `Player ${i + 1}`,
        position: 0,
      }));
      return {
        ...state,
        phase: "playing",
        players,
        currentPlayerIndex: 0,
        dice: { value: null, isRolling: false },
        turnLocked: false,
        isMoving: false,
        awaitingChallenge: false,
        activeChallenge: null,
        usedExerciseIds: [],
        winnerId: null,
        announcement: { key: "turnStart", name: players[0].name },
      };
    }

    case "BEGIN_ROLL":
      return { ...state, dice: { ...state.dice, isRolling: true }, turnLocked: true };

    case "DICE_SETTLED":
      return { ...state, dice: { value: action.payload.value, isRolling: false }, isMoving: true };

    case "STEP_TOKEN": {
      const players = state.players.map((p, i) =>
        i === state.currentPlayerIndex ? { ...p, position: action.payload.square } : p
      );
      return { ...state, players };
    }

    case "FINISH_MOVE": {
      const currentPlayer = state.players[state.currentPlayerIndex];
      const { value, bounced } = action.payload;
      const isWin = currentPlayer.position === BOARD_LENGTH - 1;

      return {
        ...state,
        isMoving: false,
        awaitingChallenge: !isWin,
        phase: isWin ? "finished" : state.phase,
        winnerId: isWin ? currentPlayer.id : state.winnerId,
        announcement: isWin
          ? { key: "wonExact", name: currentPlayer.name, value }
          : bounced
            ? { key: "bounced", name: currentPlayer.name, value, square: currentPlayer.position }
            : { key: "moved", name: currentPlayer.name, value, square: currentPlayer.position },
      };
    }

    case "OPEN_CHALLENGE": {
      const currentPlayer = state.players[state.currentPlayerIndex];
      return {
        ...state,
        activeChallenge: { exercise: action.payload.exercise, playerId: currentPlayer.id },
        awaitingChallenge: false,
        usedExerciseIds: [...state.usedExerciseIds, action.payload.exercise.id],
      };
    }

    case "CLOSE_CHALLENGE_MODAL":
      return { ...state, activeChallenge: null };

    case "BEGIN_CHALLENGE_MOVE":
      return { ...state, isMoving: true };

    case "RESOLVE_CHALLENGE": {
      const currentPlayer = state.players[state.currentPlayerIndex];
      const { isCorrect } = action.payload;

      if (!isCorrect) {
        return {
          ...state,
          isMoving: false,
          awaitingChallenge: false,
          announcement: { key: "challengeIncorrect", name: currentPlayer.name },
        };
      }

      const isWin = currentPlayer.position === BOARD_LENGTH - 1;
      return {
        ...state,
        isMoving: false,
        awaitingChallenge: !isWin,
        phase: isWin ? "finished" : state.phase,
        winnerId: isWin ? currentPlayer.id : state.winnerId,
        announcement: isWin
          ? { key: "challengeCorrectWin", name: currentPlayer.name, bonus: CHALLENGE_BONUS_SQUARES }
          : { key: "challengeCorrectMoved", name: currentPlayer.name, bonus: CHALLENGE_BONUS_SQUARES, square: currentPlayer.position },
      };
    }

    case "ADVANCE_TURN": {
      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      return {
        ...state,
        currentPlayerIndex: nextIndex,
        dice: { value: null, isRolling: false },
        turnLocked: false,
        isMoving: false,
        awaitingChallenge: false,
        activeChallenge: null,
        announcement: { key: "turnStart", name: state.players[nextIndex].name },
      };
    }

    case "PLAY_AGAIN":
      return {
        ...state,
        phase: "setup",
        players: [],
        currentPlayerIndex: 0,
        dice: { value: null, isRolling: false },
        turnLocked: false,
        isMoving: false,
        awaitingChallenge: false,
        activeChallenge: null,
        usedExerciseIds: [],
        winnerId: null,
        announcement: null,
      };

    case "RESET_TO_SETUP":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export function useBoardGame() {
  const [state, dispatch] = useReducer(boardGameReducer, initialState);

  // Once a roll lands on a challenge square, sample a question and open it.
  useEffect(() => {
    if (state.phase !== "playing") return;
    if (!state.awaitingChallenge || state.activeChallenge) return;

    const exercise = pickRandomChallengeExercise(state.usedExerciseIds);
    dispatch({ type: "OPEN_CHALLENGE", payload: { exercise } });
  }, [state.phase, state.awaitingChallenge, state.activeChallenge, state.usedExerciseIds]);

  // After a resolved move that isn't a pending challenge or a win, pass the
  // turn along automatically once the announcement has had a moment to show.
  // Gated on isMoving too, so the turn never passes while a token is still
  // mid-hop across the board.
  useEffect(() => {
    if (state.phase !== "playing") return;
    if (!state.turnLocked || state.dice.isRolling || state.isMoving) return;
    if (state.awaitingChallenge || state.activeChallenge) return;

    const delay = prefersReducedMotion() ? 150 : 900;
    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "ADVANCE_TURN" });
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [state.phase, state.turnLocked, state.dice.isRolling, state.isMoving, state.awaitingChallenge, state.activeChallenge]);

  const rollDice = useCallback(() => {
    if (state.turnLocked || state.phase !== "playing") return;
    const startingPlayer = state.players[state.currentPlayerIndex];
    dispatch({ type: "BEGIN_ROLL" });

    const reduced = prefersReducedMotion();
    const shuffleDurationMs = reduced ? 0 : ROLL_SHUFFLE_MS;

    window.setTimeout(() => {
      const value = consumeTestDiceValue() ?? 1 + Math.floor(Math.random() * 6);
      dispatch({ type: "DICE_SETTLED", payload: { value } });

      const path = computeStepPath(startingPlayer.position, value);
      const bounced = startingPlayer.position + value > BOARD_LENGTH - 1;
      const resultPauseMs = reduced ? 0 : ROLL_RESULT_PAUSE_MS;

      window.setTimeout(() => {
        if (reduced || path.length === 0) {
          const finalSquare = path[path.length - 1] ?? startingPlayer.position;
          dispatch({ type: "STEP_TOKEN", payload: { square: finalSquare } });
          dispatch({ type: "FINISH_MOVE", payload: { value, bounced } });
          return;
        }

        path.forEach((square, i) => {
          window.setTimeout(() => {
            dispatch({ type: "STEP_TOKEN", payload: { square } });
          }, i * STEP_DELAY_MS);
        });
        window.setTimeout(
          () => {
            dispatch({ type: "FINISH_MOVE", payload: { value, bounced } });
          },
          (path.length - 1) * STEP_DELAY_MS + LANDING_PAUSE_MS
        );
      }, resultPauseMs);
    }, shuffleDurationMs);
  }, [state.turnLocked, state.phase, state.players, state.currentPlayerIndex]);

  const setPlayerCount = useCallback((count: PlayerCount) => {
    dispatch({ type: "SET_PLAYER_COUNT", payload: count });
  }, []);

  const setPlayerName = useCallback((index: number, name: string) => {
    dispatch({ type: "SET_PLAYER_NAME", payload: { index, name } });
  }, []);

  const confirmSetup = useCallback((defaultNames: string[]) => {
    dispatch({ type: "CONFIRM_SETUP", payload: { defaultNames } });
  }, []);

  const resolveChallenge = useCallback(
    (isCorrect: boolean) => {
      dispatch({ type: "CLOSE_CHALLENGE_MODAL" });

      if (!isCorrect) {
        dispatch({ type: "RESOLVE_CHALLENGE", payload: { isCorrect: false } });
        return;
      }

      dispatch({ type: "BEGIN_CHALLENGE_MOVE" });
      const currentPlayer = state.players[state.currentPlayerIndex];
      const path = computeStepPath(currentPlayer.position, CHALLENGE_BONUS_SQUARES);
      const reduced = prefersReducedMotion();

      if (reduced || path.length === 0) {
        const finalSquare = path[path.length - 1] ?? currentPlayer.position;
        dispatch({ type: "STEP_TOKEN", payload: { square: finalSquare } });
        dispatch({ type: "RESOLVE_CHALLENGE", payload: { isCorrect: true } });
        return;
      }

      path.forEach((square, i) => {
        window.setTimeout(() => {
          dispatch({ type: "STEP_TOKEN", payload: { square } });
        }, i * STEP_DELAY_MS);
      });
      window.setTimeout(
        () => {
          dispatch({ type: "RESOLVE_CHALLENGE", payload: { isCorrect: true } });
        },
        (path.length - 1) * STEP_DELAY_MS + LANDING_PAUSE_MS
      );
    },
    [state.players, state.currentPlayerIndex]
  );

  const playAgain = useCallback(() => dispatch({ type: "PLAY_AGAIN" }), []);
  const resetToSetup = useCallback(() => dispatch({ type: "RESET_TO_SETUP" }), []);

  return {
    state,
    rollDice,
    setPlayerCount,
    setPlayerName,
    confirmSetup,
    resolveChallenge,
    playAgain,
    resetToSetup,
  };
}
