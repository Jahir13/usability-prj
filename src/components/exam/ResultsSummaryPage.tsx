import { Trophy, Award, Zap, RotateCcw, ArrowRight } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

type ResultsSummaryPageProps = {
  score: number;
  total: number;
  xpEarned: number;
  levelTitle: string;
  onContinue: () => void;
  onRepeat: () => void;
};

export function ResultsSummaryPage({
  score,
  total,
  xpEarned,
  levelTitle,
  onContinue,
  onRepeat,
}: ResultsSummaryPageProps) {
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6);

  return (
    <div style={{
      maxWidth: 560,
      width: "100%",
      margin: "40px auto",
      background: figmaTokens.colors.surface.white,
      borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
      border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
      boxShadow: figmaTokens.layout.learningPath.unitCardShadow,
      padding: 40,
      boxSizing: "border-box",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      animation: "resultsFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: figmaTokens.radii.full,
        background: isGood ? figmaTokens.colors.success.soft : figmaTokens.colors.primary.soft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isGood ? figmaTokens.colors.success[500] : figmaTokens.colors.primary[500],
      }}>
        {isPerfect ? <Trophy size={48} /> : <Award size={48} />}
      </div>

      <div>
        <h1 style={{ ...figmaTokens.typography.styles.heroTitle, fontSize: 32, margin: "0 0 8px 0" }}>
          {isPerfect ? "Perfect Score!" : isGood ? "Great Job!" : "Keep Practicing!"}
        </h1>
        <p style={{ ...figmaTokens.typography.styles.body, color: figmaTokens.colors.text.secondary, margin: 0 }}>
          You completed the <strong>{levelTitle}</strong> grammar practice exercises.
        </p>
      </div>

      <div style={{ display: "flex", gap: 24, width: "100%", justifyContent: "center" }}>
        <div style={{
          background: figmaTokens.colors.background.app,
          padding: "16px 24px",
          borderRadius: figmaTokens.radii.sm,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}>
          <span style={{ ...figmaTokens.typography.styles.caption, color: figmaTokens.colors.text.secondary }}>SCORE</span>
          <span style={{ ...figmaTokens.typography.styles.brand, fontSize: 24, color: figmaTokens.colors.text.primary }}>
            {score} / {total}
          </span>
        </div>

        <div style={{
          background: figmaTokens.colors.success.soft,
          padding: "16px 24px",
          borderRadius: figmaTokens.radii.sm,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}>
          <span style={{ ...figmaTokens.typography.styles.caption, color: figmaTokens.colors.success[500] }}>XP EARNED</span>
          <span style={{ ...figmaTokens.typography.styles.brand, fontSize: 24, color: figmaTokens.colors.success[500], display: "flex", alignItems: "center", gap: 4 }}>
            <Zap size={20} fill={figmaTokens.colors.success[500]} /> +{xpEarned}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, width: "100%", marginTop: 12 }}>
        <button
          type="button"
          onClick={onRepeat}
          style={{
            height: 52,
            borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
            border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
            background: figmaTokens.colors.surface.white,
            color: figmaTokens.colors.text.secondary,
            flex: 1,
            fontWeight: figmaTokens.typography.weights.bold,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <RotateCcw size={16} />
          Repeat Level
        </button>

        <button
          type="button"
          onClick={onContinue}
          style={{
            height: 52,
            borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
            border: 0,
            background: figmaTokens.colors.primary[500],
            color: figmaTokens.colors.text.onPrimary,
            boxShadow: figmaTokens.layout.grammarLesson.startButtonShadow,
            flex: 1.5,
            fontWeight: figmaTokens.typography.weights.bold,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Next Level
          <ArrowRight size={18} />
        </button>
      </div>
      
      <style>{`
        @keyframes resultsFadeIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
