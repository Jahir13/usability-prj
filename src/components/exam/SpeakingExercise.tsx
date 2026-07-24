import { Mic, CheckCircle2 } from "lucide-react";

type SpeakingExerciseProps = {
  prompt: string;
  isRecording: boolean;
  recordingDone: boolean;
  isSubmitted: boolean;
  onStartRecording: () => void;
};

export function SpeakingExercise({
  prompt,
  isRecording,
  recordingDone,
  isSubmitted,
  onStartRecording,
}: SpeakingExerciseProps) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-bodyLarge text-text-tertiary bg-background-app p-4 px-5 rounded-sm m-0 border-l-4 border-primary-500 w-full box-border text-left">
        {prompt}
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          disabled={isSubmitted || isRecording}
          onClick={onStartRecording}
          aria-label={isRecording ? "Recording speech" : "Record your voice"}
          className={`w-[72px] h-[72px] rounded-full border-0 flex items-center justify-center text-text-onPrimary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
            isSubmitted || isRecording ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"
          } ${
            isRecording 
              ? "bg-danger-500 shadow-dangerGlow animate-speakingPulse" 
              : "bg-primary-500 shadow-primaryGlow hover:shadow-primaryGlowHover"
          }`}
        >
          <Mic size={32} />
        </button>

        <span className={`text-labelSmall ${
          isRecording ? "text-danger-500" : "text-text-secondary"
        }`}>
          {isRecording 
            ? "Recording... speak now" 
            : recordingDone 
              ? "Recording captured! Click Check below." 
              : "Tap to record"}
        </span>
        
        {recordingDone && (
          <div className="inline-flex items-center gap-2 bg-success-soft text-success-500 p-2 px-4 rounded-full text-sm font-medium animate-fadeInUp">
            <CheckCircle2 size={16} /> Audio successfully analyzed
          </div>
        )}
      </div>
    </div>
  );
}
