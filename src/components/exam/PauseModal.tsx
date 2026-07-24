import { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

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

  return (
    <div 
      className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm flex items-center justify-center z-[9999] box-border"
      onClick={onResume}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[440px] bg-surface-white rounded-lg border border-border-default shadow-2xl p-6 box-border text-center flex flex-col items-center gap-5 animate-modalFadeIn"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pause-title"
        aria-describedby="pause-desc"
      >
        <div className="w-14 h-14 rounded-full bg-warning-soft text-warning-500 flex items-center justify-center">
          <AlertCircle size={28} />
        </div>

        <div>
          <h3 
            id="pause-title"
            className="font-heading font-bold text-[22px] text-text-primary m-0 mb-2"
          >
            Lesson Paused
          </h3>
          <p 
            id="pause-desc"
            className="text-bodySmall text-text-secondary m-0 leading-[22px]"
          >
            Do you want to take a break or exit the lesson? Your current level progress will not be saved.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button
            ref={resumeButtonRef}
            type="button"
            onClick={onResume}
            variant="primary"
            size="md"
            className="w-full"
          >
            Resume Lesson
          </Button>
          
          <Button
            type="button"
            onClick={onQuit}
            variant="danger"
            size="md"
            className="w-full"
          >
            Quit Lesson
          </Button>
        </div>
      </div>
    </div>
  );
}
