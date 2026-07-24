import type { ChangeEvent } from "react";
import { Play, Volume2 } from "lucide-react";
import { Input } from "../ui/Input";

type ListeningExerciseProps = {
  value: string;
  isPlayingAudio: boolean;
  isSubmitted: boolean;
  onChange: (value: string) => void;
  onPlayAudio: () => void;
};

export function ListeningExercise({
  value,
  isPlayingAudio,
  isSubmitted,
  onChange,
  onPlayAudio,
}: ListeningExerciseProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-3 items-center">
        <button
          type="button"
          onClick={onPlayAudio}
          aria-label={isPlayingAudio ? "Playing spoken sentence" : "Listen to audio pronunciation"}
          className={`w-[60px] h-[60px] rounded-full border-[1.5px] border-warning-500 cursor-pointer flex items-center justify-center text-warning-500 shadow-warningGlowMuted hover:shadow-warningGlow transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-warning-500 ${
            isPlayingAudio ? "bg-warning-soft" : "bg-surface-softOrange"
          }`}
        >
          {isPlayingAudio ? (
            <Volume2 size={24} className="animate-listeningBounce" />
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </button>
        <span className="text-labelSmall text-text-secondary">
          {isPlayingAudio ? "Playing audio..." : "Tap to listen"}
        </span>
      </div>

      <div className="flex flex-col gap-2 w-full text-left">
        <label 
          htmlFor="listening-input" 
          className="text-labelSmall text-text-secondary"
        >
          Transcribe what you hear:
        </label>
        <Input
          id="listening-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          placeholder="Type the English sentence you heard..."
          autoComplete="off"
        />
      </div>
    </div>
  );
}
