import { Gamepad2, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

type GamesLauncherProps = {
  onNavigate: (route: string) => void;
};

export function GamesLauncher({ onNavigate }: GamesLauncherProps) {
  const strings = useBoardGameStrings();

  return (
    <Card className="w-full p-8 flex flex-col items-start gap-4 text-left">
      <div aria-hidden="true" className="w-14 h-14 rounded-full bg-primary-soft flex items-center justify-center">
        <Gamepad2 width={28} height={28} strokeWidth={2} className="text-primary-500" />
      </div>

      <div>
        <h2 className="text-learningPathLevelTitle text-text-primary m-0 mb-1">{strings.launcherTitle}</h2>
        <p className="text-bodySmall text-text-tertiary m-0">{strings.launcherDescription}</p>
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={() => onNavigate("#/games/board")}
        className="inline-flex items-center gap-2"
      >
        {strings.launcherPlayButton}
        <ArrowRight aria-hidden="true" size={18} />
      </Button>

      <p className="text-caption text-text-tertiary m-0">{strings.launcherComingSoon}</p>
    </Card>
  );
}
