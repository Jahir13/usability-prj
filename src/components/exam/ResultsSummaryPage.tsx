import { Trophy, Award, Zap, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type ResultsSummaryPageProps = {
  score: number;
  total: number;
  xpEarned: number;
  levelTitle: string;
  onContinue: () => void;
  onRepeat: () => void;
  continueLabel?: string;
};

export function ResultsSummaryPage({
  score,
  total,
  xpEarned,
  levelTitle,
  onContinue,
  onRepeat,
  continueLabel = "Next Level",
}: ResultsSummaryPageProps) {
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6);

  return (
    <Card className="max-w-[560px] w-full mx-auto my-10 p-10 text-center flex flex-col items-center gap-8 animate-resultsFadeIn">
      <div className={`w-[100px] h-[100px] rounded-full flex items-center justify-center ${
        isGood ? "bg-surface-softGreen text-success-textAccessible" : "bg-primary-soft text-primary-accessible"
      }`}>
        {isPerfect ? <Trophy size={48} aria-hidden="true" /> : <Award size={48} aria-hidden="true" />}
      </div>

      <div>
        <h1 className="font-heading font-extrabold text-[32px] m-0 mb-2">
          {isPerfect ? "Perfect Score!" : isGood ? "Great Job!" : "Keep Practicing!"}
        </h1>
        {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E = 6.47:1) */}
        <p className="text-body text-text-secondaryAccessible m-0">
          You completed the <strong>{levelTitle}</strong> grammar practice exercises.
        </p>
      </div>

      <div className="flex gap-6 w-full justify-center">
        <div className="bg-background-app p-4 px-6 rounded-sm flex flex-col items-center flex-1">
          <span className="text-caption text-text-secondaryAccessible font-bold">SCORE</span>
          <span className="text-brand text-2xl text-text-primary">
            {score} / {total}
          </span>
        </div>

        <div className="bg-surface-softGreen p-4 px-6 rounded-sm flex flex-col items-center flex-1">
          {/* WCAG 1.4.3: Usar text-success-textAccessible (#166534 = 5.92:1) */}
          <span className="text-caption text-success-textAccessible font-bold">XP EARNED</span>
          <span className="text-brand text-2xl text-success-textAccessible font-bold flex items-center gap-1">
            <Zap size={20} className="fill-success-textAccessible text-success-textAccessible" aria-hidden="true" /> +{xpEarned}
          </span>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-3">
        <Button
          type="button"
          onClick={onRepeat}
          variant="secondary"
          size="lg"
          className="flex-1 inline-flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Repeat Level
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          variant="primary"
          size="lg"
          className="flex-[1.5] inline-flex items-center justify-center gap-2"
        >
          {continueLabel}
          <ArrowRight size={18} />
        </Button>
      </div>
    </Card>
  );
}

