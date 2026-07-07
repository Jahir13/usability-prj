import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";
import { figmaTokens } from "../../styles/tokens";

type MainLayoutProps = {
  activeRoute: string;
  onNavigate: (route: string) => void;
  children?: ReactNode;
};

export function MainLayout({
  activeRoute,
  onNavigate,
  children,
}: MainLayoutProps) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: figmaTokens.layout.appHeight,
        width: "100%",
        background: figmaTokens.colors.background.app,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
      data-node-id="8:60"
      data-name="Home"
    >
      <AppHeader />
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          paddingTop: figmaTokens.layout.headerHeight,
          boxSizing: "border-box",
        }}
      >
        <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
        <main
          style={{
            flex: "1 1 auto",
            minHeight: figmaTokens.layout.sidebarBodyHeight,
            padding: figmaTokens.layout.screenPaddingX,
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
