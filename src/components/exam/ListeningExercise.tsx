import { useState, type ChangeEvent } from "react";
import { Play, Volume2, FileText } from "lucide-react";
import { Input } from "../ui/Input";

type ListeningExerciseProps = {
  value: string;
  isPlayingAudio: boolean;
  isSubmitted: boolean;
  onChange: (value: string) => void;
  onPlayAudio: () => void;
  /** Full text of the audio, shown behind the transcript toggle. */
  transcriptText?: string;
  answerLabel?: string;
  expectedFormat?: string;
  describedBy?: string;
};

/**
 * Listening exercise. The transcript is always available (WCAG 1.2.1), and the
 * field states exactly what has to be written (full sentence, only the number,
 * digits or words...).
 */
export function ListeningExercise({
  value,
  isPlayingAudio,
  isSubmitted,
  onChange,
  onPlayAudio,
  transcriptText,
  answerLabel = "Transcribe what you hear:",
  expectedFormat,
  describedBy,
}: ListeningExerciseProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const formatId = expectedFormat ? "listening-format" : undefined;
  const describedByIds = [describedBy, formatId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-3 items-center">
        <button
          type="button"
          onClick={onPlayAudio}
          aria-label={isPlayingAudio ? "Playing the sentence" : "Play the audio of the sentence"}
          className={`w-[60px] h-[60px] rounded-full border-[1.5px] border-warning-500 cursor-pointer flex items-center justify-center text-warning-500 shadow-warningGlowMuted hover:shadow-warningGlow transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-warning-500 ${
            isPlayingAudio ? "bg-warning-soft" : "bg-surface-softOrange"
          }`}
        >
          {isPlayingAudio ? (
            <Volume2 aria-hidden="true" size={24} className="animate-listeningBounce" />
          ) : (
            <Play aria-hidden="true" size={24} className="ml-1" />
          )}
        </button>
        <span className="text-labelSmall text-text-secondary">
          {isPlayingAudio ? "Playing audio..." : "Play the audio (or read the transcript)"}
        </span>

        {transcriptText && (
          <button
            type="button"
            onClick={() => setShowTranscript((prev) => !prev)}
            aria-expanded={showTranscript}
            aria-controls="listening-transcript"
            className="inline-flex items-center gap-2 text-labelSmall text-primary-500 underline underline-offset-2 bg-transparent border-0 cursor-pointer p-1 rounded-sm hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          >
            <FileText size={16} aria-hidden="true" />
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
        )}

        {transcriptText && showTranscript && (
          <p
            id="listening-transcript"
            tabIndex={0}
            className="text-bodySmall text-text-secondary bg-background-app p-3 px-4 rounded-sm m-0 border-l-4 border-warning-500 max-w-[420px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          >
            {transcriptText}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full text-left">
        <label htmlFor="listening-input" className="text-labelSmall text-text-secondary">
          {answerLabel}
        </label>
        <Input
          id="listening-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          autoComplete="off"
          aria-describedby={describedByIds}
        />
        {expectedFormat && (
          <p id={formatId} className="text-caption text-text-secondary m-0">
            {expectedFormat}
          </p>
        )}
      </div>
    </div>
  );
}
