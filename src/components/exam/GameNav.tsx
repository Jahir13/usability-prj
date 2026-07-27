import { Pause } from "lucide-react";

type GameNavProps = {
  progress: number;
  counter: number;
  onPause: () => void;
};

function clampProgress(progress: number) {
  if (Number.isNaN(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

export function GameNav({ progress, counter, onPause }: GameNavProps) {
  const clampedProgress = clampProgress(progress);

  return (
    <div
      className="h-12 border-t border-border-default flex items-center box-border"
      data-node-id="12:2563"
      data-name="GameNav"
    >
      {/* WCAG 2.4.7: Indicador de foco visible para botón de pausa */}
      <button
        type="button"
        onClick={onPause}
        className="border-0 p-1 rounded-sm bg-transparent inline-flex items-center gap-2 text-text-primary cursor-pointer shrink-0 ml-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
        aria-label="Pause"
        data-node-id="12:2587"
        data-name="Button"
      >
        <Pause
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="block"
        />
        <span className="text-label leading-5">
          Pause
        </span>
      </button>

      <div
        className="flex-auto px-4 box-border"
        data-node-id="12:2589"
        data-name="Progress"
      >
        <div
          role="progressbar"
          aria-label="Progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clampedProgress)}
          className="h-2 w-full bg-background-muted rounded-full overflow-hidden"
          data-node-id="12:2589"
          data-name="Bar"
        >
          <div
            style={{ width: `${clampedProgress}%` }}
            className="h-full bg-primary-500 rounded-full"
            data-node-id="12:2589"
            data-name="Fill"
          />
        </div>
      </div>

      {/* WCAG 4.1.2: role="timer" permite aria-label en el contador */}
      <div
        role="timer"
        aria-label={`Time remaining: ${counter} seconds`}
        className="w-16 h-16 flex items-center justify-center text-text-primary shrink-0 -translate-y-2"
        data-node-id="12:2591"
        data-name="Counter"
      >
        <span className="text-label">{counter}</span>
      </div>
    </div>
  );
}
