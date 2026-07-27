import type { BoardGameAnnouncement } from "../../types/boardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";

type TurnBannerProps = {
  announcement: BoardGameAnnouncement | null;
};

// The single role="status" live region for the whole play screen — every
// routine update (roll, move, challenge outcome, next turn) writes here in
// sequence, instead of stacking multiple competing live regions.
export function TurnBanner({ announcement }: TurnBannerProps) {
  const strings = useBoardGameStrings();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="w-full bg-primary-soft border border-primary-500/30 rounded-sm p-4 text-label text-text-primary text-left min-h-[52px] flex items-center"
    >
      {announcement ? strings.announce(announcement) : ""}
    </div>
  );
}
