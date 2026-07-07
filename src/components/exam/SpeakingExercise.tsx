import { useState } from "react";
import { Mic, CheckCircle2 } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
      <p style={{
        ...figmaTokens.typography.styles.body,
        fontSize: 18,
        color: figmaTokens.colors.text.tertiary,
        background: figmaTokens.colors.background.app,
        padding: "16px 20px",
        borderRadius: figmaTokens.radii.sm,
        lineHeight: "28px",
        margin: 0,
        borderLeft: `4px solid ${figmaTokens.colors.primary[500]}`,
        width: "100%",
        boxSizing: "border-box"
      }}>
        {prompt}
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <button
          type="button"
          disabled={isSubmitted || isRecording}
          onClick={onStartRecording}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isRecording ? "Recording speech" : "Record your voice"}
          style={{
            width: 72,
            height: 72,
            borderRadius: figmaTokens.radii.full,
            background: isRecording ? figmaTokens.colors.danger[500] : figmaTokens.colors.primary[500],
            border: 0,
            cursor: isSubmitted || isRecording ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: figmaTokens.colors.text.onPrimary,
            boxShadow: isRecording 
              ? "0 4px 16px rgba(242, 78, 78, 0.4)" 
              : isHovered 
                ? "0 6px 16px rgba(79, 110, 247, 0.4)" 
                : "0 4px 12px rgba(79, 110, 247, 0.3)",
            transform: isHovered && !isSubmitted ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s ease",
            animation: isRecording ? "speakingPulse 1.5s infinite" : "none",
          }}
        >
          <Mic size={32} />
        </button>

        <span style={{ 
          ...figmaTokens.typography.styles.labelSmall, 
          color: isRecording ? figmaTokens.colors.danger[500] : figmaTokens.colors.text.secondary 
        }}>
          {isRecording 
            ? "Recording... speak now" 
            : recordingDone 
              ? "Recording captured! Click Check below." 
              : "Tap to record"}
        </span>
        
        {recordingDone && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: figmaTokens.colors.success.soft,
            color: figmaTokens.colors.success[500],
            padding: "8px 16px",
            borderRadius: figmaTokens.radii.full,
            fontSize: 14,
            fontWeight: "500",
            animation: "fadeInUp 0.3s ease",
          }}>
            <CheckCircle2 size={16} /> Audio successfully analyzed
          </div>
        )}
      </div>

      <style>{`
        @keyframes speakingPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(242, 78, 78, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(242, 78, 78, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(242, 78, 78, 0); }
        }
        @keyframes fadeInUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
