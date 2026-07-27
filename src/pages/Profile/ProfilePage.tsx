import { useUser } from "../../context/LingoContext";
import { AppHeader } from "../../components/layout/AppHeader";
import { Volume2, Bell, Flame, Award, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

type ProfilePageProps = {
  onNavigate: (route: string) => void;
};

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, updateSettings } = useUser();

  return (
    <div className="relative w-full min-h-screen bg-background-app box-border">
      <AppHeader onHomeClick={() => onNavigate("#/dashboard")} />
      
      {/* WCAG 1.3.1 & 2.4.1: <main id="main-content"> para estructura semántica y destino de Skip Link */}
      <main id="main-content" tabIndex={-1} className="pt-16 px-4 md:px-8 box-border focus-visible:outline-none">
        <Card className="max-w-[600px] w-full mx-auto my-10 p-8 flex flex-col gap-8">
          {/* Header Profile Info */}
          <div className="flex items-center gap-5 text-left">
            <div className="w-20 h-20 rounded-full bg-primary-500 text-text-onPrimary flex items-center justify-center font-heading font-bold text-[28px] shadow-[0_4px_12px_rgba(79,110,247,0.25)]">
              {user.avatarInitials}
            </div>
            
            <div>
              {/* WCAG 1.3.1: Encabezado <h1> principal de la vista de perfil */}
              <h1 className="font-heading font-bold text-2xl text-text-primary m-0 mb-1">
                {user.fullName}
              </h1>
              {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) para ratio de contraste 6.47:1 */}
              <span className="text-labelSmall text-text-secondaryAccessible font-medium">
                @{user.username}
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="font-heading font-bold text-lg text-text-primary m-0 mb-4 border-b-2 border-background-muted pb-2 text-left">
              Milestone Statistics
            </h2>
            <div className="flex gap-4">
              <div className="flex-1 bg-background-app p-4 px-5 rounded-sm flex items-center gap-3 text-left">
                <Flame size={24} className="text-warning-textAccessible" aria-hidden="true" />
                <div className="flex flex-col">
                  {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E = 6.10:1 sobre background.app) */}
                  <span className="text-[13px] text-text-secondaryAccessible font-bold uppercase">STREAK</span>
                  <span className="text-lg font-bold text-text-primary">
                    <span className="sr-only">Streak of </span>{user.streak} days
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-background-app p-4 px-5 rounded-sm flex items-center gap-3 text-left">
                <Award size={24} className="text-success-textAccessible" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[13px] text-text-secondaryAccessible font-bold uppercase">TOTAL XP</span>
                  <span className="text-lg font-bold text-text-primary">
                    {user.xp} XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings / Preferences Section */}
          <div>
            <h2 className="font-heading font-bold text-lg text-text-primary m-0 mb-4 border-b-2 border-background-muted pb-2 text-left">
              Preferences
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className="text-text-tertiary" aria-hidden="true" />
                  <span className="text-[15px] text-text-primary">Sound Effects</span>
                </div>
                {/* WCAG 4.1.2: Switch con role="switch" y estado aria-checked dinámico */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={user.settings.sound}
                  aria-label="Toggle sound effects"
                  onClick={() => updateSettings({ sound: !user.settings.sound })}
                  className={`w-[52px] h-8 rounded-full border-0 relative cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                    user.settings.sound ? "bg-primary-500" : "bg-border-default"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-surface-white absolute top-1 transition-all duration-200 ${
                    user.settings.sound ? "left-6" : "left-1"
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-text-tertiary" aria-hidden="true" />
                  <span className="text-[15px] text-text-primary">Push Notifications</span>
                </div>
                {/* WCAG 4.1.2: Switch con role="switch" y estado aria-checked dinámico */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={user.settings.notifications}
                  aria-label="Toggle push notifications"
                  onClick={() => updateSettings({ notifications: !user.settings.notifications })}
                  className={`w-[52px] h-8 rounded-full border-0 relative cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                    user.settings.notifications ? "bg-primary-500" : "bg-border-default"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-surface-white absolute top-1 transition-all duration-200 ${
                    user.settings.notifications ? "left-6" : "left-1"
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-text-tertiary" aria-hidden="true" />
                  <span className="text-[15px] text-text-primary">Streak Reminders</span>
                </div>
                {/* WCAG 4.1.2: Switch con role="switch" y estado aria-checked dinámico */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={user.settings.streakReminder}
                  aria-label="Toggle daily streak reminder"
                  onClick={() => updateSettings({ streakReminder: !user.settings.streakReminder })}
                  className={`w-[52px] h-8 rounded-full border-0 relative cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                    user.settings.streakReminder ? "bg-primary-500" : "bg-border-default"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-surface-white absolute top-1 transition-all duration-200 ${
                    user.settings.streakReminder ? "left-6" : "left-1"
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Footer Navigation */}
          <Button
            type="button"
            onClick={() => onNavigate("#/dashboard")}
            variant="primary"
            size="lg"
            className="w-full mt-3"
          >
            Back to Learning Path
          </Button>
        </Card>
      </main>
    </div>
  );
}
