import { Trophy } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

type WinnerScreenProps = {
  winnerName: string;
  onPlayAgain: () => void;
  onBackToGames: () => void;
};

export function WinnerScreen({ winnerName, onPlayAgain, onBackToGames }: WinnerScreenProps) {
  const strings = useBoardGameStrings();

  return (
    <Card className="max-w-[480px] w-full mx-auto my-10 p-8 flex flex-col items-center text-center gap-5">
      <div role="alert" aria-live="polite" className="flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-16 h-16 rounded-full bg-surface-softGreen flex items-center justify-center">
          <Trophy width={32} height={32} strokeWidth={2} className="text-success-500" />
        </div>
        <h2 className="font-heading font-bold text-[24px] text-text-primary m-0">{strings.winnerHeading(winnerName)}</h2>
        <p className="text-bodySmall text-text-tertiary m-0">{strings.winnerSubtitle}</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button type="button" variant="primary" size="lg" onClick={onPlayAgain} className="w-full">
          {strings.winnerPlayAgain}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={onBackToGames} className="w-full">
          {strings.winnerBackToGames}
        </Button>
      </div>
    </Card>
  );
}
