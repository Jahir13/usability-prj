import { useState, type CSSProperties } from "react";
import { useUser } from "../../context/LingoContext";
import { AppHeader } from "../../components/layout/AppHeader";
import { figmaTokens } from "../../styles/tokens";
import { Volume2, Bell, Flame, Award, Sparkles } from "lucide-react";

type ProfilePageProps = {
  onNavigate: (route: string) => void;
};

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, updateSettings } = useUser();
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: figmaTokens.colors.background.app,
    boxSizing: "border-box",
  };

  const cardStyle: CSSProperties = {
    maxWidth: 600,
    width: "100%",
    margin: "40px auto",
    background: figmaTokens.colors.surface.white,
    borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
    border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
    boxShadow: figmaTokens.layout.learningPath.unitCardShadow,
    padding: 32,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  };

  const sectionTitleStyle: CSSProperties = {
    fontFamily: figmaTokens.typography.families.heading,
    fontWeight: figmaTokens.typography.weights.bold,
    fontSize: 18,
    color: figmaTokens.colors.text.primary,
    margin: "0 0 16px 0",
    borderBottom: `2px solid ${figmaTokens.colors.background.muted}`,
    paddingBottom: 8,
  };

  const toggleRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
  };

  return (
    <div style={containerStyle}>
      <AppHeader onHomeClick={() => onNavigate("#/dashboard")} />
      
      <main style={{ paddingTop: figmaTokens.layout.headerHeight, paddingLeft: 24, paddingRight: 24, boxSizing: "border-box" }}>
        <div style={cardStyle}>
          {/* Header Profile Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: figmaTokens.radii.full,
              background: figmaTokens.colors.primary[500],
              color: figmaTokens.colors.primary.onPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...figmaTokens.typography.styles.avatarInitials,
              fontSize: 28,
              boxShadow: "0 4px 12px rgba(79, 110, 247, 0.25)",
            }}>
              {user.avatarInitials}
            </div>
            
            <div>
              <h2 style={{
                fontFamily: figmaTokens.typography.families.heading,
                fontWeight: figmaTokens.typography.weights.bold,
                fontSize: 24,
                color: figmaTokens.colors.text.primary,
                margin: "0 0 4px 0"
              }}>
                {user.fullName}
              </h2>
              <span style={{
                ...figmaTokens.typography.styles.labelSmall,
                color: figmaTokens.colors.text.secondary
              }}>
                @{user.username}
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h3 style={sectionTitleStyle}>Milestone Statistics</h3>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{
                flex: 1,
                background: figmaTokens.colors.background.app,
                padding: "16px 20px",
                borderRadius: figmaTokens.radii.sm,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <Flame size={24} color={figmaTokens.colors.warning[500]} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 13, color: figmaTokens.colors.text.secondary }}>STREAK</span>
                  <span style={{ fontSize: 18, fontWeight: "bold", color: figmaTokens.colors.text.primary }}>
                    {user.streak} days
                  </span>
                </div>
              </div>

              <div style={{
                flex: 1,
                background: figmaTokens.colors.background.app,
                padding: "16px 20px",
                borderRadius: figmaTokens.radii.sm,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <Award size={24} color={figmaTokens.colors.success[500]} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 13, color: figmaTokens.colors.text.secondary }}>TOTAL XP</span>
                  <span style={{ fontSize: 18, fontWeight: "bold", color: figmaTokens.colors.text.primary }}>
                    {user.xp} XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings / Preferences Section */}
          <div>
            <h3 style={sectionTitleStyle}>Preferences</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={toggleRowStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Volume2 size={20} color={figmaTokens.colors.text.tertiary} />
                  <span style={{ fontSize: 15, color: figmaTokens.colors.text.primary }}>Sound Effects</span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle sound effects"
                  onClick={() => updateSettings({ sound: !user.settings.sound })}
                  style={{
                    width: 52,
                    height: 32,
                    borderRadius: 16,
                    background: user.settings.sound ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default,
                    border: 0,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: "#fff",
                    position: "absolute",
                    top: 4,
                    left: user.settings.sound ? 24 : 4,
                    transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </button>
              </div>

              <div style={toggleRowStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Bell size={20} color={figmaTokens.colors.text.tertiary} />
                  <span style={{ fontSize: 15, color: figmaTokens.colors.text.primary }}>Push Notifications</span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle push notifications"
                  onClick={() => updateSettings({ notifications: !user.settings.notifications })}
                  style={{
                    width: 52,
                    height: 32,
                    borderRadius: 16,
                    background: user.settings.notifications ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default,
                    border: 0,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: "#fff",
                    position: "absolute",
                    top: 4,
                    left: user.settings.notifications ? 24 : 4,
                    transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </button>
              </div>

              <div style={toggleRowStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Sparkles size={20} color={figmaTokens.colors.text.tertiary} />
                  <span style={{ fontSize: 15, color: figmaTokens.colors.text.primary }}>Streak Reminders</span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle daily streak reminder"
                  onClick={() => updateSettings({ streakReminder: !user.settings.streakReminder })}
                  style={{
                    width: 52,
                    height: 32,
                    borderRadius: 16,
                    background: user.settings.streakReminder ? figmaTokens.colors.primary[500] : figmaTokens.colors.border.default,
                    border: 0,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: "#fff",
                    position: "absolute",
                    top: 4,
                    left: user.settings.streakReminder ? 24 : 4,
                    transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Footer Navigation */}
          <button
            type="button"
            onClick={() => onNavigate("#/dashboard")}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
            style={{
              width: "100%",
              height: 52,
              borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
              border: 0,
              background: figmaTokens.colors.primary[500],
              color: figmaTokens.colors.text.onPrimary,
              fontWeight: figmaTokens.typography.weights.bold,
              cursor: "pointer",
              boxShadow: hoveredBtn 
                ? "0 6px 20px rgba(79, 110, 247, 0.4)" 
                : figmaTokens.shadows.primaryCta,
              transform: hoveredBtn ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s ease",
              marginTop: 12,
            }}
          >
            Back to Learning Path
          </button>
        </div>
      </main>
    </div>
  );
}
