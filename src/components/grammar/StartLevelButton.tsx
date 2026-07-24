type StartLevelButtonProps = {
  onStart: () => void;
  exercises: number;
  minutes: string;
  xp: string;
};

export function StartLevelButton({
  onStart,
  exercises,
  minutes,
  xp,
}: StartLevelButtonProps) {
  return (
    <div className="w-[379px] mx-auto box-border">
      <button
        type="button"
        onClick={onStart}
        className="w-full h-14 rounded-full border-0 bg-primary-500 shadow-primaryCta text-text-onPrimary cursor-pointer flex items-center justify-center box-border hover:opacity-90 transition-opacity"
        data-node-id="81:69"
        data-name="Button"
      >
        <span
          className="text-label text-[17px] leading-[25.5px] text-text-onPrimary whitespace-nowrap"
          data-node-id="81:70"
        >
          Start the level! →
        </span>
      </button>

      <div
        className="w-full flex items-center justify-center gap-4 pt-4 box-border"
        data-node-id="81:71"
      >
        <span
          className="text-labelSmall text-text-secondary whitespace-nowrap"
          data-node-id="81:73"
        >
          {exercises} exercises
        </span>
        <span
          className="text-labelSmall text-border-default whitespace-nowrap"
          data-node-id="81:75"
          aria-hidden="true"
        >
          ·
        </span>
        <span
          className="text-labelSmall text-text-secondary whitespace-nowrap"
          data-node-id="81:77"
        >
          {minutes}
        </span>
        <span
          className="text-labelSmall text-border-default whitespace-nowrap"
          data-node-id="81:79"
          aria-hidden="true"
        >
          ·
        </span>
        <span
          className="text-labelSmall text-success-500 whitespace-nowrap"
          data-node-id="81:81"
        >
          {xp}
        </span>
      </div>
    </div>
  );
}
