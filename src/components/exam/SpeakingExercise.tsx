import { Mic, CheckCircle2, Keyboard } from "lucide-react";
import { Input } from "../ui/Input";
import { ReadableRegion } from "../ui/ReadableRegion";

type SpeakingExerciseProps = {
  prompt: string;
  isRecording: boolean;
  recordingDone: boolean;
  isSubmitted: boolean;
  onStartRecording: () => void;
  /** Whether the person is currently answering via the keyboard fallback. */
  useTypedAnswer: boolean;
  typedAnswer: string;
  onToggleTypedAnswer: () => void;
  onTypedAnswerChange: (value: string) => void;
  answerLabel?: string;
  expectedFormat?: string;
  describedBy?: string;
};

/**
 * Speaking exercise with a keyboard alternative: the sentence to produce is a
 * focusable region, and anyone who cannot use the microphone can type the same
 * sentence instead.
 */
export function SpeakingExercise({
  prompt,
  isRecording,
  recordingDone,
  isSubmitted,
  onStartRecording,
  useTypedAnswer,
  typedAnswer,
  onToggleTypedAnswer,
  onTypedAnswerChange,
  answerLabel = "Type what you would say aloud:",
  expectedFormat,
  describedBy,
}: SpeakingExerciseProps) {
  const formatId = expectedFormat ? "speaking-format" : undefined;
  const describedByIds = [describedBy, formatId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-5 items-center">
      <ReadableRegion label="Sentence to say aloud" className="w-full">
        <p className="text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm m-0 border-l-4 border-primary-500 w-full box-border text-left">
          {prompt}
        </p>
      </ReadableRegion>

      {!useTypedAnswer ? (
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            disabled={isSubmitted || isRecording}
            onClick={onStartRecording}
            aria-describedby={describedBy}
            aria-label={isRecording ? "Recording your voice" : "Record your voice"}
            className={`w-[72px] h-[72px] rounded-full border-0 flex items-center justify-center text-text-onPrimary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
              isSubmitted || isRecording ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"
            } ${
              isRecording
                ? "bg-danger-500 shadow-dangerGlow animate-speakingPulse"
                : "bg-primary-500 shadow-primaryGlow hover:shadow-primaryGlowHover"
            }`}
          >
            <Mic aria-hidden="true" size={32} />
          </button>

          {/* WCAG 1.4.3: Ratios accesibles para texto y estados */}
          <span
            role="status"
            aria-live="polite"
            className={`text-labelSmall font-medium ${isRecording ? "text-danger-textAccessible" : "text-text-secondaryAccessible"}`}
          >
            {isRecording
              ? "Recording... speak now"
              : recordingDone
                ? "Recording captured! Press Check Answer below."
                : "Press to record, or type your answer instead"}
          </span>

          {recordingDone && (
            <div className="inline-flex items-center gap-2 bg-surface-softGreen text-success-textAccessible p-2 px-4 rounded-full text-sm font-bold animate-fadeInUp">
              <CheckCircle2 aria-hidden="true" size={16} /> Audio successfully analyzed
            </div>
          )}

          <button
            type="button"
            disabled={isSubmitted}
            onClick={onToggleTypedAnswer}
            className="inline-flex items-center gap-2 text-labelSmall text-primary-accessible font-medium underline underline-offset-2 bg-transparent border-0 cursor-pointer p-1 rounded-sm hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Keyboard size={16} aria-hidden="true" />
            I'd rather type my answer
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full items-center">
          <div className="flex flex-col gap-2 w-full text-left">
            <label htmlFor="speaking-typed-input" className="text-labelSmall text-text-secondaryAccessible font-medium">
              {answerLabel}
            </label>
            <Input
              id="speaking-typed-input"
              type="text"
              disabled={isSubmitted}
              value={typedAnswer}
              onChange={(e) => onTypedAnswerChange(e.target.value)}
              autoComplete="off"
              aria-describedby={describedByIds}
            />
            {expectedFormat && (
              <p id={formatId} className="text-caption text-text-secondaryAccessible m-0">
                {expectedFormat}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isSubmitted}
            onClick={onToggleTypedAnswer}
            className="inline-flex items-center gap-2 text-labelSmall text-primary-accessible font-medium underline underline-offset-2 bg-transparent border-0 cursor-pointer p-1 rounded-sm hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Mic size={16} aria-hidden="true" />
            Use the microphone instead
          </button>
        </div>
      )}
    </div>
  );
}
