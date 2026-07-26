import { Users } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { PlayerCountPicker } from "./PlayerCountPicker";
import { PlayerNameForm } from "./PlayerNameForm";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import type { PlayerCount } from "../../types/boardGame";

type GameSetupScreenProps = {
  playerCount: PlayerCount;
  names: string[];
  onChangePlayerCount: (count: PlayerCount) => void;
  onChangeName: (index: number, name: string) => void;
  onStart: () => void;
};

export function GameSetupScreen({
  playerCount,
  names,
  onChangePlayerCount,
  onChangeName,
  onStart,
}: GameSetupScreenProps) {
  const strings = useBoardGameStrings();

  return (
    <Card className="max-w-[560px] w-full mx-auto my-10 p-8 flex flex-col gap-6 text-left" lang={strings.languageTag}>
      <div className="flex items-center gap-3">
        <div aria-hidden="true" className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
          <Users width={24} height={24} strokeWidth={2} className="text-primary-500" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-[20px] text-text-primary m-0">{strings.launcherTitle}</h2>
          <p className="text-bodySmall text-text-tertiary m-0">{strings.setupSubtitle}</p>
        </div>
      </div>

      <PlayerCountPicker value={playerCount} onChange={onChangePlayerCount} />
      <PlayerNameForm playerCount={playerCount} names={names} onChangeName={onChangeName} />

      <Button type="button" variant="primary" size="lg" onClick={onStart} className="w-full">
        {strings.setupStartButton}
      </Button>
    </Card>
  );
}
