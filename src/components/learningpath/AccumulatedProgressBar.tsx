type AccumulatedProgressBarProps = {
  progress: number;
};

function clampProgress(progress: number) {
  if (Number.isNaN(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

export function AccumulatedProgressBar({
  progress,
}: AccumulatedProgressBarProps) {
  const clampedProgress = clampProgress(progress);

  return (
    <div className="w-full bg-surface-white shadow-accumulatedCardShadow rounded-lg box-border p-6 flex flex-col items-start" data-node-id="12:1630" data-name="Container">
      <span
        className="text-learningPathHeading text-text-muted uppercase tracking-[1.5px]"
        data-node-id="12:1632"
      >
        Accumulated
      </span>
      <div className="w-full pt-3 box-border">
        <div
          role="progressbar"
          aria-label="Accumulated progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clampedProgress)}
          className="w-full h-3 bg-background-muted rounded-full overflow-hidden"
          data-node-id="12:1634"
        >
          <div
            style={{ width: `${clampedProgress}%` }}
            className="h-full bg-primary-500 rounded-full"
            data-node-id="12:1635"
          />
        </div>
      </div>
      <div className="w-full pt-2 box-border text-left">
        <span
          className="text-label text-text-primary"
          data-node-id="12:1637"
        >
          {Math.round(clampedProgress)}% Completed
        </span>
      </div>
    </div>
  );
}
