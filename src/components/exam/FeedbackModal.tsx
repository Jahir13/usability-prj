import { CheckCircle2, XCircle } from "lucide-react";

type FeedbackModalProps = {
  isCorrect: boolean;
  correctAnswer: string;
  translation?: string;
  /** Why that answer is the correct one. */
  explanation?: string;
};

/**
 * Feedback after checking an answer.
 *
 * It is a live region, so the result is announced immediately, and it always
 * explains WHY the answer is correct instead of only showing the solution.
 */
export function FeedbackModal({
  isCorrect,
  correctAnswer,
  translation,
  explanation,
}: FeedbackModalProps) {
  return (
    <div
      className={`border-l-[5px] p-4 px-5 rounded-sm box-border flex items-start gap-4 animate-feedbackSlideIn ${
        isCorrect ? "bg-surface-softGreen border-success-500" : "bg-danger-soft border-danger-500"
      }`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      {isCorrect ? (
        <CheckCircle2 aria-hidden="true" size={24} className="text-success-textAccessible shrink-0" />
      ) : (
        <XCircle aria-hidden="true" size={24} className="text-danger-textAccessible shrink-0" />
      )}
      <div className="flex-1 text-left">
        {/* WCAG 1.4.3: Usar text-success-textAccessible (#166534 = 5.92:1) y text-danger-textAccessible (#C51D1D = 4.85:1) */}
        <h2 className={`m-0 mb-1 text-label font-bold ${isCorrect ? "text-success-textAccessible" : "text-danger-textAccessible"}`}>
          {isCorrect ? "Correct answer!" : "Incorrect answer"}
        </h2>
        {!isCorrect && (
          <p className="m-0 mb-2 text-bodySmall text-text-primary font-bold">
            Correct answer: <span className="underline">{correctAnswer}</span>
          </p>
        )}
        {explanation && (
          <p className="m-0 mb-2 text-bodySmall text-text-primary">
            Why: {explanation}
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
