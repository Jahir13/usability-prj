import { useState, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import { figmaTokens } from "../../styles/tokens";
import { GraduationCap } from "lucide-react";

// --- WELCOME PAGE ---
type WelcomePageProps = {
  onStart: () => void;
};

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: figmaTokens.layout.onboardingModal.backdropMinHeight,
    background: figmaTokens.colors.background.app,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  const cardStyle: CSSProperties = {
    width: figmaTokens.layout.onboardingModal.cardWidth,
    height: figmaTokens.layout.onboardingModal.cardHeight,
    borderRadius: figmaTokens.layout.onboardingModal.cardRadius,
    background: figmaTokens.colors.surface.white,
    boxShadow: figmaTokens.layout.onboardingModal.cardShadow,
    boxSizing: "border-box",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: figmaTokens.radii.full,
          background: figmaTokens.colors.primary.soft,
          color: figmaTokens.colors.primary[500],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <GraduationCap size={44} />
        </div>

        <div>
          <h1 style={{
            fontFamily: figmaTokens.typography.families.heading,
            fontWeight: figmaTokens.typography.weights.extraBold,
            fontSize: 32,
            color: figmaTokens.colors.text.primary,
            margin: "0 0 12px 0",
          }}>
            LingoGuru
          </h1>
          <p style={{
            ...figmaTokens.typography.styles.body,
            color: figmaTokens.colors.text.secondary,
            maxWidth: 320,
            margin: 0,
            lineHeight: "24px",
          }}>
            Master English at your own pace through quick, bite-sized daily exercises.
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            height: 52,
            borderRadius: figmaTokens.layout.onboardingModal.actionRadius,
            background: figmaTokens.colors.primary[500],
            color: figmaTokens.colors.text.onPrimary,
            border: 0,
            fontSize: 16,
            fontWeight: figmaTokens.typography.weights.bold,
            cursor: "pointer",
            boxShadow: isHovered 
              ? "0 6px 20px rgba(79, 110, 247, 0.4)" 
              : figmaTokens.shadows.primaryCta,
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

// --- LOGIN / SIGNUP PROFILE PAGE ---
type AuthFormPageProps = {
  onSubmit: (username: string, fullName: string, email: string, nativeLanguage: string) => void;
};

export function AuthFormPage({ onSubmit }: AuthFormPageProps) {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("Spanish");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      if (!fullName.trim() || !email.trim() || !password.trim()) {
        setError("Please fill out all required fields.");
        return;
      }
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      setError("");
      const generatedUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      onSubmit(generatedUsername, fullName.trim(), email.trim(), nativeLanguage);
    } else {
      // Login mode
      if (!email.trim() || !password.trim()) {
        setError("Please enter your email and password.");
        return;
      }
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      setError("");
      // For mock login, we generate username from email
      const generatedUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      onSubmit(generatedUsername, generatedUsername.toUpperCase(), email.trim(), "Spanish");
    }
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: figmaTokens.layout.onboardingModal.backdropMinHeight,
    background: figmaTokens.colors.background.app,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  const cardStyle: CSSProperties = {
    width: figmaTokens.layout.onboardingModal.cardWidth,
    minHeight: figmaTokens.layout.onboardingModal.cardHeight,
    borderRadius: figmaTokens.layout.onboardingModal.cardRadius,
    background: figmaTokens.colors.surface.white,
    boxShadow: figmaTokens.layout.onboardingModal.cardShadow,
    boxSizing: "border-box",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: figmaTokens.radii.sm,
    border: `1.5px solid ${figmaTokens.colors.border.default}`,
    fontSize: 15,
    fontFamily: figmaTokens.typography.families.body,
    outline: "none",
    boxSizing: "border-box",
    color: figmaTokens.colors.text.primary,
    background: figmaTokens.colors.surface.white,
  };

  const selectStyle: CSSProperties = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "40px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{
            fontFamily: figmaTokens.typography.families.heading,
            fontWeight: figmaTokens.typography.weights.bold,
            fontSize: 24,
            color: figmaTokens.colors.text.primary,
            margin: "0 0 4px 0",
          }}>
            {mode === "register" ? "Create Profile" : "Welcome Back"}
          </h2>
          <p style={{
            ...figmaTokens.typography.styles.bodySmall,
            color: figmaTokens.colors.text.secondary,
            margin: 0,
          }}>
            {mode === "register"
              ? "Join LingoGuru and track your milestones!"
              : "Log in to continue your English learning journey!"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          {mode === "register" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="auth-fullname"
                style={{
                  ...figmaTokens.typography.styles.labelSmall,
                  color: figmaTokens.colors.text.tertiary,
                }}
              >
                Full Name
              </label>
              <input
                id="auth-fullname"
                type="text"
                placeholder="e.g. María Aguilar"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                style={inputStyle}
                className="auth-input"
                aria-required="true"
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="auth-email"
              style={{
                ...figmaTokens.typography.styles.labelSmall,
                color: figmaTokens.colors.text.tertiary,
              }}
            >
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder="e.g. maria@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              style={inputStyle}
              className="auth-input"
              aria-required="true"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="auth-password"
              style={{
                ...figmaTokens.typography.styles.labelSmall,
                color: figmaTokens.colors.text.tertiary,
              }}
            >
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              style={inputStyle}
              className="auth-input"
              aria-required="true"
            />
          </div>

          {mode === "register" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="auth-language"
                style={{
                  ...figmaTokens.typography.styles.labelSmall,
                  color: figmaTokens.colors.text.tertiary,
                }}
              >
                Native Language
              </label>
              <select
                id="auth-language"
                value={nativeLanguage}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setNativeLanguage(e.target.value)}
                style={selectStyle}
                className="auth-input"
              >
                <option value="Spanish">Spanish (Español)</option>
                <option value="Portuguese">Portuguese (Português)</option>
                <option value="French">French (Français)</option>
                <option value="Italian">Italian (Italiano)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>
          )}

          {error && (
            <span
              id="auth-error"
              style={{
                color: figmaTokens.colors.danger[500],
                fontSize: 13,
                fontWeight: "500",
                textAlign: "center"
              }}
              role="alert"
              aria-live="assertive"
            >
              ⚠️ {error}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: "100%",
              height: 52,
              borderRadius: figmaTokens.layout.onboardingModal.actionRadius,
              background: figmaTokens.colors.primary[500],
              color: figmaTokens.colors.text.onPrimary,
              border: 0,
              fontSize: 16,
              fontWeight: figmaTokens.typography.weights.bold,
              cursor: "pointer",
              boxShadow: isHovered
                ? "0 6px 20px rgba(79, 110, 247, 0.4)"
                : figmaTokens.shadows.primaryCta,
              transform: isHovered ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {mode === "register" ? "Create Profile" : "Log In"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(prev => prev === "register" ? "login" : "register");
              setError("");
            }}
            style={{
              background: "transparent",
              border: 0,
              color: figmaTokens.colors.primary[500],
              fontSize: 14,
              fontWeight: figmaTokens.typography.weights.medium,
              cursor: "pointer",
              textAlign: "center",
              padding: "4px 0",
              textDecoration: "underline",
            }}
          >
            {mode === "register"
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
      <style>{`
        .auth-input:focus {
          border-color: ${figmaTokens.colors.primary[500]} !important;
          box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
