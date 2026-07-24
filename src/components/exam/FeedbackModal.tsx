import { CheckCircle2, XCircle } from "lucide-react";

type FeedbackModalProps = {
  isCorrect: boolean;
  correctAnswer: string;
  translation?: string;
};

export function FeedbackModal({
  isCorrect,
  correctAnswer,
  translation,
}: FeedbackModalProps) {
  return (
    <div 
      className={`border-l-[5px] p-4 px-5 rounded-sm box-border flex items-start gap-4 animate-feedbackSlideIn ${
        isCorrect 
          ? "bg-surface-softGreen border-success-500" 
          : "bg-danger-soft border-danger-500"
      }`}
      role="alert"
      aria-live="polite"
    >
      {isCorrect ? (
        <CheckCircle2 size={24} className="text-success-500 shrink-0" />
      ) : (
        <XCircle size={24} className="text-danger-500 shrink-0" />
      )}
      <div className="flex-1 text-left">
        <h4 className={`m-0 mb-1 text-label ${
          isCorrect ? "text-success-500" : "text-danger-500"
        }`}>
          {isCorrect ? "Correct answer!" : "Incorrect answer"}
        </h4>
        {!isCorrect && (
          <p className="m-0 mb-2 text-bodySmall text-text-primary font-bold">
            Correct answer: <span className="underline">{correctAnswer}</span>
          </p>
        )}
        {translation && (
          <p className="m-0 text-bodySmall text-text-tertiary italic">
            Translation: {translation}
          </p>
        )}
      </div>
    </div>
  );
}
