import { useEffect, useRef } from "react";
import { Button } from "../../components/ui/Button";

type OnboardingModalProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

const imgIcon =
  "https://www.figma.com/api/mcp/asset/da4c6158-d55e-4ec9-8c04-172a242e5541";

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
      className="flex items-center gap-2 w-14 pb-10 box-border shrink-0"
      aria-label={`Step ${Math.min(Math.max(currentStep, 1), totalSteps)} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={index}
            aria-hidden="true"
            className={`h-2 rounded-full shrink-0 transition-all ${
              active ? "w-6 bg-primary-500" : "w-2 bg-border-default"
            }`}
            data-node-id={nodeIds[index] ?? nodeIds[nodeIds.length - 1]}
            data-name="Button"
          />
        );
      })}
    </div>
  );
}



const stepsData = [
  {
    title: "Learn at your own pace",
    description: "LingoGuru adapts to your level and learning pace. Each lesson lasts just 5 minutes, making it perfect for your daily routine.",
    emoji: "📚",
    badgeColor: "#fff3e2", // surface.softOrange
  },
  {
    title: "Practice all four skills",
    description: "Develop your grammar, speaking, listening, and writing through interactive exercises and real-world conversations.",
    emoji: "🎤",
    badgeColor: "#eef1fd", // surface.softBlue
  },
  {
    title: "Track your progress",
    description: "Earn XP, unlock achievements, maintain your daily streak, and level up your English proficiency every day!",
    emoji: "⚡",
    badgeColor: "#e6f9ee", // surface.softGreen
  }
];

export function OnboardingModal({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}: OnboardingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const safeStep =
    totalSteps > 0 ? Math.min(totalSteps, Math.max(1, currentStep)) : 0;
  
  const stepIndex = Math.min(stepsData.length - 1, Math.max(0, safeStep - 1));
  const currentStepData = stepsData[stepIndex] ?? stepsData[0];

  // WCAG 2.1.2: Focus Trap en OnboardingModal para evitar que la navegación por teclado se pierda al fondo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onBack();
      } else if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onBack]);

  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen w-full bg-background-app overflow-hidden box-border focus-visible:outline-none" data-node-id="8:250" data-name="Tutorial">
      <div className="min-h-screen w-full bg-background-app flex items-center justify-center box-border" data-node-id="8:251" data-name="Body">
        <div 
          ref={modalRef}
          className="w-[720px] h-[472px] rounded-[24px] bg-surface-white shadow-[0px_4px_16px_rgba(26,29,46,0.08)] box-border relative overflow-hidden" 
          data-node-id="8:252" 
          data-name="Container"
          role="dialog"
          aria-label="Tutorial onboarding"
          aria-modal="true"
        >
          <div className="w-full h-full box-border py-[56px] px-16 flex flex-col items-center" role="document">
            <div
              className="w-24 h-[120px] relative shrink-0"
              data-node-id="8:253"
              data-name="Container (margin)"
            >
              <div
                className="w-24 h-24 relative"
                data-node-id="8:254"
                data-name="Icon"
              >
                <img
                  alt=""
                  src={imgIcon}
                  className="block w-full h-full"
                />
                <div
                  style={{ background: currentStepData.badgeColor }}
                  className="absolute left-16 top-16 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  data-node-id="8:273"
                  data-name="Container"
                >
                  <span
                    className="font-body font-normal text-[20px] leading-[30px] text-text-primary text-center"
                    data-node-id="8:274"
                    aria-hidden="true"
                  >
                    {currentStepData.emoji}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mb-4 shrink-0"
              data-node-id="8:275"
            >
              <div
                className="max-w-[253px]"
                data-node-id="8:276"
                data-name="Heading 2"
              >
                <h1 className="text-onboardingTitle text-text-primary text-center m-0" data-node-id="8:277">
                  {currentStepData.title}
                </h1>
              </div>
            </div>

            <div
              className="mb-10 shrink-0"
              data-node-id="8:278"
            >
              <div
                className="max-w-[480px]"
                data-node-id="8:279"
                data-name="Paragraph"
              >
                {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) para ratio 6.47:1 */}
                <p className="text-body text-text-secondaryAccessible text-center m-0" data-node-id="8:280">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            <div
              className="shrink-0"
              data-node-id="8:281"
              data-name="Container (margin)"
            >
              <StepDots currentStep={safeStep} totalSteps={totalSteps} />
            </div>

            <div
              className="w-full max-w-[400px] shrink-0"
              data-node-id="8:285"
              data-name="Container"
            >
              <div
                className="flex items-center gap-4 w-full"
              >
                <Button
                  variant="outline-primary"
                  size="md"
                  onClick={onBack}
                  className="flex-[129.328_0_0] font-medium text-[15px] leading-[22.5px]"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={onNext}
                  className="flex-[254.672_0_0] font-medium text-[15px] leading-[22.5px]"
                >
                  {safeStep === totalSteps ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onSkip}
        className="absolute top-5 right-8 w-[56px] h-[21px] p-0 text-text-tertiary text-label"
        aria-label={`Skip tutorial at step ${safeStep} of ${totalSteps}`}
      >
        Skip →
      </Button>
    </main>
  );
}
