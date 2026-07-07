import { CheckCircle2, XCircle } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

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
      style={{
        background: isCorrect ? figmaTokens.colors.surface.softGreen : figmaTokens.colors.danger.soft,
        borderLeft: `5px solid ${isCorrect ? figmaTokens.colors.success[500] : figmaTokens.colors.danger[500]}`,
        padding: "16px 20px",
        borderRadius: figmaTokens.radii.sm,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        animation: "feedbackSlideIn 0.3s ease-out",
      }}
      role="alert"
      aria-live="polite"
    >
      {isCorrect ? (
        <CheckCircle2 size={24} color={figmaTokens.colors.success[500]} style={{ flexShrink: 0 }} />
      ) : (
        <XCircle size={24} color={figmaTokens.colors.danger[500]} style={{ flexShrink: 0 }} />
      )}
      <div style={{ flex: 1 }}>
        <h4 style={{ 
          margin: "0 0 4px 0", 
          ...figmaTokens.typography.styles.label,
          color: isCorrect ? figmaTokens.colors.success[500] : figmaTokens.colors.danger[500]
        }}>
          {isCorrect ? "Correct answer!" : "Incorrect answer"}
        </h4>
        {!isCorrect && (
          <p style={{ 
            margin: "0 0 8px 0", 
            ...figmaTokens.typography.styles.bodySmall, 
            color: figmaTokens.colors.text.primary,
            fontWeight: "bold"
          }}>
            Correct answer: <span style={{ textDecoration: "underline" }}>{correctAnswer}</span>
          </p>
        )}
        {translation && (
          <p style={{ 
            margin: 0, 
            ...figmaTokens.typography.styles.bodySmall, 
            color: figmaTokens.colors.text.tertiary,
            fontStyle: "italic"
          }}>
            Translation: {translation}
          </p>
        )}
      </div>
      
      <style>{`
        @keyframes feedbackSlideIn {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
