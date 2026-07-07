import { useEffect, useRef, type CSSProperties } from "react";
import { AlertCircle } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

type PauseModalProps = {
  isOpen: boolean;
  onResume: () => void;
  onQuit: () => void;
};

export function PauseModal({
  isOpen,
  onResume,
  onQuit,
}: PauseModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen) return;

    // Save active element to restore focus later
    const previousActiveElement = document.activeElement;
    
    // Focus the primary action
    resumeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onResume();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onResume]);

  if (!isOpen) return null;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(26, 29, 46, 0.6)", // Dark translucent backdrop
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    boxSizing: "border-box",
  };

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 440,
    background: figmaTokens.colors.surface.white,
    borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
    border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    padding: 24,
    boxSizing: "border-box",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    animation: "modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div style={overlayStyle} onClick={onResume}>
      <div 
        ref={containerRef}
        style={cardStyle} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pause-title"
        aria-describedby="pause-desc"
      >
        <div style={{
          width: 56,
          height: 56,
          borderRadius: figmaTokens.radii.full,
          background: figmaTokens.colors.warning.soft,
          color: figmaTokens.colors.warning[500],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <AlertCircle size={28} />
        </div>

        <div>
          <h3 
            id="pause-title"
            style={{
              fontFamily: figmaTokens.typography.families.heading,
              fontWeight: figmaTokens.typography.weights.bold,
              fontSize: 22,
              color: figmaTokens.colors.text.primary,
              margin: "0 0 8px 0",
            }}
          >
            Lesson Paused
          </h3>
          <p 
            id="pause-desc"
            style={{
              ...figmaTokens.typography.styles.bodySmall,
              color: figmaTokens.colors.text.secondary,
              margin: 0,
              lineHeight: "22px",
            }}
          >
            Do you want to take a break or exit the lesson? Your current level progress will not be saved.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <button
            ref={resumeButtonRef}
            type="button"
            onClick={onResume}
            style={{
              width: "100%",
              height: 48,
              borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
              border: 0,
              background: figmaTokens.colors.primary[500],
              color: figmaTokens.colors.text.onPrimary,
              fontWeight: figmaTokens.typography.weights.bold,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Resume Lesson
          </button>
          
          <button
            type="button"
            onClick={onQuit}
            style={{
              width: "100%",
              height: 48,
              borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
              border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
              background: "transparent",
              color: figmaTokens.colors.danger[500],
              fontWeight: figmaTokens.typography.weights.medium,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Quit Lesson
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes modalFadeIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
