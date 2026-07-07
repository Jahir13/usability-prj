import { useEffect, type CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

type OnboardingModalProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

const imgIcon =
  "https://www.figma.com/api/mcp/asset/da4c6158-d55e-4ec9-8c04-172a242e5541";

const overlayStyle: CSSProperties = {
  position: "relative",
  minHeight: figmaTokens.layout.onboardingModal.backdropMinHeight,
  width: "100%",
  background: figmaTokens.colors.background.app,
  overflow: "hidden",
  boxSizing: "border-box",
};

const stageStyle: CSSProperties = {
  minHeight: figmaTokens.layout.onboardingModal.backdropMinHeight,
  width: "100%",
  background: figmaTokens.colors.background.elevated,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
};

const cardStyle: CSSProperties = {
  width: figmaTokens.layout.onboardingModal.cardWidth,
  height: figmaTokens.layout.onboardingModal.cardHeight,
  borderRadius: figmaTokens.layout.onboardingModal.cardRadius,
  background: figmaTokens.colors.surface.white,
  boxShadow: figmaTokens.layout.onboardingModal.cardShadow,
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
};

const contentStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  padding: `${figmaTokens.layout.onboardingModal.contentPaddingY}px ${figmaTokens.layout.onboardingModal.contentPaddingX}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle: CSSProperties = {
  ...figmaTokens.typography.styles.onboardingTitle,
  color: figmaTokens.colors.text.primary,
  textAlign: "center",
  maxWidth: figmaTokens.layout.onboardingModal.headingMaxWidth,
  margin: 0,
};

const paragraphStyle: CSSProperties = {
  ...figmaTokens.typography.styles.body,
  color: figmaTokens.colors.text.secondary,
  textAlign: "center",
  maxWidth: figmaTokens.layout.onboardingModal.paragraphMaxWidth,
  margin: 0,
};

const dotsRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: figmaTokens.layout.onboardingModal.dotsContainerGap,
  width: figmaTokens.layout.onboardingModal.dotsContainerWidth,
  paddingBottom: figmaTokens.layout.onboardingModal.dotsBottomPadding,
  boxSizing: "border-box",
};

const actionTextStyle: CSSProperties = {
  ...figmaTokens.typography.styles.bodySmall,
  fontWeight: figmaTokens.typography.weights.medium,
  lineHeight: "22.5px",
};

function clampStep(currentStep: number, totalSteps: number) {
  if (totalSteps <= 0) {
    return 0;
  }

  return Math.min(totalSteps - 1, Math.max(0, currentStep - 1));
}

function StepDots({
  currentStep,
  totalSteps,
}: Pick<OnboardingModalProps, "currentStep" | "totalSteps">) {
  if (totalSteps <= 0) {
    return null;
  }

  const activeIndex = clampStep(currentStep, totalSteps);
  const nodeIds = ["8:282", "8:283", "8:284"];

  return (
    <div
      style={dotsRowStyle}
      aria-label={`Step ${Math.min(Math.max(currentStep, 1), totalSteps)} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={index}
            aria-hidden="true"
            style={{
              width: active
                ? figmaTokens.layout.onboardingModal.dotActiveWidth
                : figmaTokens.layout.onboardingModal.dotSize,
              height: figmaTokens.layout.onboardingModal.dotSize,
              borderRadius: figmaTokens.radii.full,
              background: active
                ? figmaTokens.colors.primary[500]
                : figmaTokens.colors.border.default,
              flexShrink: 0,
            }}
            data-node-id={nodeIds[index] ?? nodeIds[nodeIds.length - 1]}
            data-name="Button"
          />
        );
      })}
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant,
}: {
  children: string;
  onClick: () => void;
  variant: "back" | "next";
}) {
  const isBack = variant === "back";

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: figmaTokens.layout.onboardingModal.actionHeight,
        borderRadius: figmaTokens.layout.onboardingModal.actionRadius,
        border: isBack
          ? `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.primary[500]}`
          : 0,
        background: isBack
          ? figmaTokens.colors.surface.white
          : figmaTokens.colors.primary[500],
        boxShadow: isBack ? "none" : figmaTokens.shadows.primaryCta,
        color: isBack
          ? figmaTokens.colors.primary[500]
          : figmaTokens.colors.text.onPrimary,
        flex: isBack
          ? `${figmaTokens.layout.onboardingModal.backFlex} 0 0`
          : `${figmaTokens.layout.onboardingModal.nextFlex} 0 0`,
        minWidth: 1,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-node-id={isBack ? "8:286" : "8:288"}
      data-name="Button"
    >
      <span style={actionTextStyle} data-node-id={isBack ? "8:287" : "8:289"}>
        {children}
      </span>
    </button>
  );
}

const stepsData = [
  {
    title: "Learn at your own pace",
    description: "LingoGuru adapts to your level and learning pace. Each lesson lasts just 5 minutes, making it perfect for your daily routine.",
    emoji: "📚",
    badgeColor: figmaTokens.colors.surface.softOrange,
  },
  {
    title: "Practice all four skills",
    description: "Develop your grammar, speaking, listening, and writing through interactive exercises and real-world conversations.",
    emoji: "🎤",
    badgeColor: figmaTokens.colors.surface.softBlue,
  },
  {
    title: "Track your progress",
    description: "Earn XP, unlock achievements, maintain your daily streak, and level up your English proficiency every day!",
    emoji: "⚡",
    badgeColor: figmaTokens.colors.surface.softGreen,
  }
];

export function OnboardingModal({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}: OnboardingModalProps) {
  const safeStep =
    totalSteps > 0 ? Math.min(totalSteps, Math.max(1, currentStep)) : 0;
  
  const stepIndex = Math.min(stepsData.length - 1, Math.max(0, safeStep - 1));
  const currentStepData = stepsData[stepIndex] ?? stepsData[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onBack]);

  return (
    <div style={overlayStyle} data-node-id="8:250" data-name="Tutorial">
      <div style={stageStyle} data-node-id="8:251" data-name="Body">
        <div 
          style={cardStyle} 
          data-node-id="8:252" 
          data-name="Container"
          role="dialog"
          aria-label="Tutorial onboarding"
          aria-modal="true"
        >
          <div style={contentStyle} role="document">
            <div
              style={{
                width: figmaTokens.layout.onboardingModal.iconFrameWidth,
                height: figmaTokens.layout.onboardingModal.iconFrameHeight,
                position: "relative",
                flexShrink: 0,
              }}
              data-node-id="8:253"
              data-name="Container (margin)"
            >
              <div
                style={{
                  width: figmaTokens.layout.onboardingModal.iconSquareSize,
                  height: figmaTokens.layout.onboardingModal.iconSquareSize,
                  position: "relative",
                }}
                data-node-id="8:254"
                data-name="Icon"
              >
                <img
                  alt=""
                  src={imgIcon}
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: figmaTokens.layout.onboardingModal
                      .iconBadgeOffsetLeft,
                    top: figmaTokens.layout.onboardingModal.iconBadgeOffsetTop,
                    width: figmaTokens.layout.onboardingModal.iconBadgeSize,
                    height: figmaTokens.layout.onboardingModal.iconBadgeSize,
                    borderRadius: figmaTokens.radii.full,
                    background: currentStepData.badgeColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s ease",
                  }}
                  data-node-id="8:273"
                  data-name="Container"
                >
                  <span
                    style={{
                      fontFamily: figmaTokens.typography.families.body,
                      fontWeight: figmaTokens.typography.weights.regular,
                      fontSize:
                        figmaTokens.layout.onboardingModal.iconEmojiFontSize,
                      lineHeight: `${figmaTokens.layout.onboardingModal.iconEmojiLineHeight}px`,
                      color: figmaTokens.colors.text.primary,
                      textAlign: "center",
                    }}
                    data-node-id="8:274"
                  >
                    {currentStepData.emoji}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom:
                  figmaTokens.layout.onboardingModal.headingMarginBottom,
                flexShrink: 0,
              }}
              data-node-id="8:275"
            >
              <div
                style={{
                  maxWidth: figmaTokens.layout.onboardingModal.headingMaxWidth,
                }}
                data-node-id="8:276"
                data-name="Heading 2"
              >
                <h1 style={headingStyle} data-node-id="8:277">
                  {currentStepData.title}
                </h1>
              </div>
            </div>

            <div
              style={{
                marginBottom:
                  figmaTokens.layout.onboardingModal.paragraphMarginBottom,
                flexShrink: 0,
              }}
              data-node-id="8:278"
            >
              <div
                style={{
                  maxWidth:
                    figmaTokens.layout.onboardingModal.paragraphMaxWidth,
                }}
                data-node-id="8:279"
                data-name="Paragraph"
              >
                <p style={paragraphStyle} data-node-id="8:280">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            <div
              style={{ flexShrink: 0 }}
              data-node-id="8:281"
              data-name="Container (margin)"
            >
              <StepDots currentStep={safeStep} totalSteps={totalSteps} />
            </div>

            <div
              style={{
                width: figmaTokens.layout.onboardingModal.actionsMaxWidth,
                flexShrink: 0,
              }}
              data-node-id="8:285"
              data-name="Container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: figmaTokens.layout.onboardingModal.actionsGap,
                  width: "100%",
                }}
              >
                <ActionButton variant="back" onClick={onBack}>
                  Back
                </ActionButton>
                <ActionButton variant="next" onClick={onNext}>
                  {safeStep === totalSteps ? "Finish" : "Next"}
                </ActionButton>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSkip}
          style={{
            position: "absolute",
            top: figmaTokens.layout.onboardingModal.skipTop,
            right: figmaTokens.layout.screenPaddingX,
            width: figmaTokens.layout.onboardingModal.skipWidth,
            height: figmaTokens.layout.onboardingModal.skipHeight,
            border: 0,
            padding: 0,
            background: "transparent",
            color: figmaTokens.colors.text.tertiary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={`Skip tutorial at step ${safeStep} of ${totalSteps}`}
          data-node-id="8:290"
          data-name="Button"
        >
          <span
            style={figmaTokens.typography.styles.label}
            data-node-id="8:291"
          >
            Skip →
          </span>
        </button>
      </div>
    </div>
  );
}
