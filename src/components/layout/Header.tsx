import type { CSSProperties } from "react";
import { figmaTokens } from "../../styles/tokens";

const brandIcon =
  "https://www.figma.com/api/mcp/asset/b87cfca3-cd52-42a3-837b-c04d42fc8f52";
const headerIcon1 =
  "https://www.figma.com/api/mcp/asset/bc3f021d-25e9-475f-b5b4-0d4f616b0e66";
const headerIcon2 =
  "https://www.figma.com/api/mcp/asset/245f875c-1f93-4d3c-9178-c1e80d0c0670";
const headerIcon3 =
  "https://www.figma.com/api/mcp/asset/67d62d75-1783-459c-8ecf-5099259182a0";
const headerIcon4 =
  "https://www.figma.com/api/mcp/asset/5044a82f-cc46-4f19-a2ac-af2d6aeeb945";

const headerButtonStyle: CSSProperties = {
  width: figmaTokens.layout.headerIconButtonSize,
  height: figmaTokens.layout.headerIconButtonSize,
  border: 0,
  padding: figmaTokens.spacing[4],
  borderRadius: figmaTokens.radii.sm,
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyle: CSSProperties = {
  width: figmaTokens.layout.headerIconSize,
  height: figmaTokens.layout.headerIconSize,
  display: "block",
};

export function Header() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: figmaTokens.layout.headerHeight,
        padding: `${figmaTokens.layout.headerPaddingY}px ${figmaTokens.layout.headerPaddingX}px`,
        background: figmaTokens.colors.surface.white,
        borderBottom: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
      data-node-id="8:213"
      data-name="Navigation"
    >
      <button
        type="button"
        style={{
          border: 0,
          background: "transparent",
          padding: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: figmaTokens.layout.headerLogoGap,
          cursor: "default",
        }}
        aria-label="LingoGuru"
        data-node-id="8:214"
        data-name="Button"
      >
        <img
          src={brandIcon}
          alt=""
          style={{ width: 36, height: 36, display: "block" }}
          data-node-id="8:215"
          data-name="Icon"
        />
        <span
          style={{
            ...figmaTokens.typography.styles.brand,
            color: figmaTokens.colors.text.primary,
            display: "inline-block",
          }}
          data-node-id="8:234"
          data-name="Text"
        >
          LingoGuru
        </span>
      </button>

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
        <button
          type="button"
          aria-label="Help"
          style={headerButtonStyle}
          data-node-id="12:2355"
          data-name="Button"
        >
          <img
            src={headerIcon1}
            alt=""
            style={iconStyle}
            data-node-id="12:2356"
            data-name="Icon"
          />
        </button>
        <button
          type="button"
          aria-label="Home"
          style={headerButtonStyle}
          data-node-id="12:2360"
          data-name="Button"
        >
          <img
            src={headerIcon2}
            alt=""
            style={iconStyle}
            data-node-id="12:2361"
            data-name="Icon"
          />
        </button>
        <button
          type="button"
          aria-label="Settings"
          style={headerButtonStyle}
          data-node-id="12:2364"
          data-name="Button"
        >
          <img
            src={headerIcon3}
            alt=""
            style={iconStyle}
            data-node-id="12:2365"
            data-name="Icon"
          />
        </button>
        <button
          type="button"
          aria-label="Profile"
          style={headerButtonStyle}
          data-node-id="12:2368"
          data-name="Button"
        >
          <img
            src={headerIcon4}
            alt=""
            style={iconStyle}
            data-node-id="12:2369"
            data-name="Icon"
          />
        </button>
      </div>
    </header>
  );
}
