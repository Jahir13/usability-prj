import { useEffect, useRef, useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from "lucide-react";
import type { BoardPlayer } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import { Button } from "../ui/Button";
import { PlayerToken } from "./PlayerToken";

const DICE_FACES = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

type DiceRollerProps = {
  value: number | null;
  isRolling: boolean;
  disabled: boolean;
  currentPlayer: BoardPlayer;
  onRoll: () => void;
};

export function DiceRoller({ value, isRolling, disabled, currentPlayer, onRoll }: DiceRollerProps) {
  const strings = useBoardGameStrings();
  const [shuffleFace, setShuffleFace] = useState(1);
  const intervalRef = useRef<number | undefined>(undefined);

  // While the die is "rolling", rapidly cycle through faces for a tactile,
  // game-like feel instead of a single static swap to the final value.
  // Skipped under prefers-reduced-motion, where the final value just appears.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isRolling && !prefersReducedMotion) {
      intervalRef.current = window.setInterval(() => {
        setShuffleFace((prev) => (prev % 6) + 1);
      }, 90);
    }
    return () => {
      if (intervalRef.current !== undefined) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [isRolling]);

  const displayValue = isRolling ? shuffleFace : value;
  const DiceIcon = displayValue ? DICE_FACES[displayValue - 1] : Dices;

  return (
    <div className="flex items-center gap-4">
      <div
        aria-hidden="true"
        className={`w-16 h-16 rounded-xl border-2 border-primary-500/40 bg-surface-white flex items-center justify-center shrink-0 shadow-md ${
          isRolling ? "animate-diceRoll motion-reduce:animate-none" : "animate-fadeInUp"
        }`}
      >
        <DiceIcon width={36} height={36} strokeWidth={1.75} className="text-primary-500" />
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={disabled}
        onClick={onRoll}
        aria-label={strings.rollDiceAriaLabel(currentPlayer.name)}
        className="inline-flex items-center gap-3"
      >
        <PlayerToken player={currentPlayer} size="sm" />
        {strings.rollDiceButton}
      </Button>
    </div>
  );
}
