import type { ChangeEvent } from "react";
import { Input } from "../ui/Input";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

type PlayerNameFormProps = {
  playerCount: number;
  names: string[];
  onChangeName: (index: number, name: string) => void;
};

export function PlayerNameForm({ playerCount, names, onChangeName }: PlayerNameFormProps) {
  const strings = useBoardGameStrings();

  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: playerCount }, (_, i) => (
        <div key={i} className="flex flex-col gap-1.5 text-left">
          <label htmlFor={`player-name-${i}`} className="text-labelSmall text-text-tertiary">
            {strings.setupPlayerNameLabel(i + 1)}
          </label>
          <Input
            id={`player-name-${i}`}
            type="text"
            placeholder={strings.setupPlayerNamePlaceholder(i + 1)}
            value={names[i] ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeName(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
