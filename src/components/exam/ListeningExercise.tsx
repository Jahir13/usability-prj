import { useState, type ChangeEvent } from "react";
import { Play, Volume2 } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        <button
          type="button"
          onClick={onPlayAudio}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isPlayingAudio ? "Playing spoken sentence" : "Listen to audio pronunciation"}
          style={{
            width: 60,
            height: 60,
            borderRadius: figmaTokens.radii.full,
            background: isPlayingAudio ? figmaTokens.colors.warning.soft : figmaTokens.colors.surface.softOrange,
            border: `1.5px solid ${figmaTokens.colors.warning[500]}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: figmaTokens.colors.warning[500],
            boxShadow: isHovered 
              ? "0 4px 12px rgba(247, 161, 79, 0.25)" 
              : "0 2px 8px rgba(247, 161, 79, 0.15)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          {isPlayingAudio ? (
            <Volume2 size={24} style={{ animation: "listeningBounce 1s infinite" }} />
          ) : (
            <Play size={24} style={{ marginLeft: 3 }} />
          )}
        </button>
        <span style={{ ...figmaTokens.typography.styles.labelSmall, color: figmaTokens.colors.text.secondary }}>
          {isPlayingAudio ? "Playing audio..." : "Tap to listen"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
        <label 
          htmlFor="listening-input" 
          style={{ 
            ...figmaTokens.typography.styles.labelSmall, 
            color: figmaTokens.colors.text.secondary 
          }}
        >
          Transcribe what you hear:
        </label>
        <input
          id="listening-input"
          type="text"
          disabled={isSubmitted}
          value={value}
          onChange={handleInputChange}
          placeholder="Type the English sentence you heard..."
          autoComplete="off"
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: figmaTokens.radii.sm,
            border: `2px solid ${figmaTokens.colors.border.default}`,
            fontSize: 16,
            fontFamily: figmaTokens.typography.families.body,
            color: figmaTokens.colors.text.primary,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      <style>{`
        @keyframes listeningBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
