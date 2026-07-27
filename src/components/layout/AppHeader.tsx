import type { ReactNode } from "react";
import { CircleHelp, House, Settings, UserRound } from "lucide-react";
import { GameNav } from "../exam/GameNav";

type AppHeaderProps = {
  variant?: "default" | "exercise";
  progress?: number;
  counter?: number;
  onPause?: () => void;
  onHomeClick?: () => void;
  onProfileClick?: () => void;
};

type HeaderIconButtonProps = {
  label: string;
  children: ReactNode;
  onClick?: () => void;
};

const brandIcon =
  "https://www.figma.com/api/mcp/asset/32f3c13c-20f1-4a46-896d-723960f56e2a";

function HeaderIconButton({ label, children, onClick }: HeaderIconButtonProps) {
  return (
    <button 
      type="button" 
      aria-label={label} 
      onClick={onClick}
      /* WCAG 2.4.7: Indicador de foco altamente perceptible por teclado */
      className="w-8 h-8 border-0 p-1 rounded-sm bg-transparent inline-flex items-center justify-center text-text-primary cursor-pointer transition-colors duration-200 ease-in-out hover:bg-background-app focus-visible:bg-background-app focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
    >
      {children}
    </button>
  );
}

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="LingoGuru"
      onClick={onClick}
      className={`border-0 bg-transparent p-1 rounded-sm inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <img
        src={brandIcon}
        alt=""
        width={36}
        height={36}
        className="block"
        data-node-id="8:215"
        data-name="Icon"
      />
      <span className="text-brand text-text-primary inline-block">
        LingoGuru
      </span>
    </button>
  );
}

function DefaultHeaderBar({ 
  onHomeClick, 
  onProfileClick 
}: { 
  onHomeClick?: () => void; 
  onProfileClick?: () => void;
}) {
  return (
    <div
      className="h-16 py-[13.5px] px-8 border-b border-border-default flex items-center justify-between box-border"
      data-node-id="8:213"
      data-name="Navigation"
    >
      <BrandMark onClick={onHomeClick} />
      <div
        className="flex items-center gap-4 w-[176px]"
        data-node-id="12:2354"
        data-name="Container"
      >
        <HeaderIconButton label="Help" onClick={() => alert("LingoGuru Help: Choose correct grammar answers, complete listening and speaking tasks. Complete a levels to unlock more lessons!")}>
          <CircleHelp
            aria-hidden="true"
            className="w-6 h-6 block"
            strokeWidth={1.75}
          />
        </HeaderIconButton>
        <HeaderIconButton label="Home" onClick={onHomeClick}>
          <House aria-hidden="true" className="w-6 h-6 block" strokeWidth={1.75} />
        </HeaderIconButton>
        <HeaderIconButton label="Settings" onClick={() => alert("LingoGuru Settings: Dark Mode and Audio volume are managed automatically.")}>
          <Settings
            aria-hidden="true"
            className="w-6 h-6 block"
            strokeWidth={1.75}
          />
        </HeaderIconButton>
        <HeaderIconButton label="Profile" onClick={onProfileClick}>
          <UserRound
            aria-hidden="true"
            className="w-6 h-6 block"
            strokeWidth={1.75}
          />
        </HeaderIconButton>
      </div>
    </div>
  );
}

export function AppHeader({ 
  variant = "default",
  progress = 0,
  counter = 0,
  onPause = () => undefined,
  onHomeClick,
  onProfileClick,
}: AppHeaderProps) {
  const headerClass = "absolute top-0 left-0 right-0 bg-surface-white box-border z-[100]";

  if (variant === "exercise") {
    return (
      <header className={headerClass} data-name="Navigation">
        <GameNav progress={progress} counter={counter} onPause={onPause} />
      </header>
    );
  }

  return (
    <header className={headerClass} data-name="Navigation">
      <DefaultHeaderBar onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
    </header>
  );
}
