type StartLevelButtonProps = {
  onStart: () => void;
  exercises: number;
  minutes: string;
  xp: string;
  /** Name of the lesson, used to build a self-explanatory accessible name. */
  lessonTitle?: string;
};

export function StartLevelButton({
  onStart,
  exercises,
  minutes,
  xp,
  lessonTitle,
}: StartLevelButtonProps) {
  const summary = `${exercises} exercises, ${minutes}, ${xp}`;

  return (
    <div className="w-full max-w-[379px] mx-auto box-border">
      <button
        type="button"
        onClick={onStart}
        aria-label={
          lessonTitle
            ? `Start the exercises of the lesson ${lessonTitle}. ${summary}`
            : `Start the exercises. ${summary}`
        }
        className="w-full h-14 rounded-full border-0 bg-primary-500 shadow-primaryCta text-text-onPrimary cursor-pointer flex items-center justify-center box-border hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
        data-node-id="81:69"
        data-name="Button"
      >
        <span
          className="text-label text-[17px] leading-[25.5px] text-text-onPrimary whitespace-nowrap"
          data-node-id="81:70"
        >
          Start the lesson! →
        </span>
      </button>

      {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E = 6.47:1) y text-success-textAccessible (#166534 = 6.71:1) */}
      <p
        className="w-full flex items-center justify-center gap-4 pt-4 box-border m-0"
        data-node-id="81:71"
      >
        <span className="text-labelSmall text-text-secondaryAccessible font-medium whitespace-nowrap">
          {exercises} exercises
        </span>
        <span className="text-labelSmall text-border-default whitespace-nowrap" aria-hidden="true">
          ·
        </span>
        <span className="text-labelSmall text-text-secondaryAccessible font-medium whitespace-nowrap">{minutes}</span>
        <span className="text-labelSmall text-border-default whitespace-nowrap" aria-hidden="true">
          ·
        </span>
        <span className="text-labelSmall text-success-textAccessible font-bold whitespace-nowrap">{xp}</span>
      </p>
    </div>
  );
}
