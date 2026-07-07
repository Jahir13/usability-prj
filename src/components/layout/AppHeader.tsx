import type { CSSProperties, ReactNode } from "react";
import { CircleHelp, House, Settings, UserRound } from "lucide-react";
import { GameNav } from "../exam/GameNav";
import { figmaTokens } from "../../styles/tokens";

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

const topIconButtonStyle: CSSProperties = {
  width: figmaTokens.layout.headerIconButtonSize,
  height: figmaTokens.layout.headerIconButtonSize,
  border: 0,
  padding: figmaTokens.spacing[4],
  borderRadius: figmaTokens.radii.sm,
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: figmaTokens.colors.text.primary,
  cursor: "pointer",
  transition: "background 0.2s ease",
};

const topIconStyle: CSSProperties = {
  width: figmaTokens.layout.headerIconSize,
  height: figmaTokens.layout.headerIconSize,
  display: "block",
};

const navShellStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  background: figmaTokens.colors.surface.white,
  boxSizing: "border-box",
  zIndex: 100,
};

function HeaderIconButton({ label, children, onClick }: HeaderIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button 
      type="button" 
      aria-label={label} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        ...topIconButtonStyle,
        background: (isHovered || isFocused) ? figmaTokens.colors.background.app : "transparent",
      }}
    >
      {children}
    </button>
  );
}

import { useState } from "react";

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="LingoGuru"
      onClick={onClick}
      style={{
        border: 0,
        background: "transparent",
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: figmaTokens.layout.headerLogoGap,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img
        src={brandIcon}
        alt=""
        width={36}
        height={36}
        style={{ display: "block" }}
        data-node-id="8:215"
        data-name="Icon"
      />
      <span
        style={{
          ...figmaTokens.typography.styles.brand,
          color: figmaTokens.colors.text.primary,
          display: "inline-block",
        }}
      >
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
      style={{
        height: figmaTokens.layout.headerHeight,
        padding: `${figmaTokens.layout.headerPaddingY}px ${figmaTokens.layout.headerPaddingX}px`,
        borderBottom: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
      data-node-id="8:213"
      data-name="Navigation"
    >
      <BrandMark onClick={onHomeClick} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: figmaTokens.layout.headerActionsGap,
          width: 176,
        }}
        data-node-id="12:2354"
        data-name="Container"
      >
        <HeaderIconButton label="Help" onClick={() => alert("LingoGuru Help: Choose correct grammar answers, complete listening and speaking tasks. Complete a levels to unlock more lessons!")}>
          <CircleHelp
            aria-hidden="true"
            style={topIconStyle}
            strokeWidth={1.75}
          />
        </HeaderIconButton>
        <HeaderIconButton label="Home" onClick={onHomeClick}>
          <House aria-hidden="true" style={topIconStyle} strokeWidth={1.75} />
        </HeaderIconButton>
        <HeaderIconButton label="Settings" onClick={() => alert("LingoGuru Settings: Dark Mode and Audio volume are managed automatically.")}>
          <Settings
            aria-hidden="true"
            style={topIconStyle}
            strokeWidth={1.75}
          />
        </HeaderIconButton>
        <HeaderIconButton label="Profile" onClick={onProfileClick}>
          <UserRound
            aria-hidden="true"
            style={topIconStyle}
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
  if (variant === "exercise") {
    return (
      <header style={navShellStyle} data-name="Navigation">
        <GameNav progress={progress} counter={counter} onPause={onPause} />
      </header>
    );
  }

  return (
    <header style={navShellStyle} data-name="Navigation">
      <DefaultHeaderBar onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
    </header>
  );
}
