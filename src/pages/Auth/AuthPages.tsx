import { useState, type ChangeEvent, type FormEvent } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

// --- WELCOME PAGE ---
type WelcomePageProps = {
  onStart: () => void;
};

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    /* WCAG 1.3.1: Usar <main id="main-content"> para estructura semántica y destino de Skip Link */
    <main id="main-content" tabIndex={-1} className="relative w-full min-h-screen bg-welcomeBackground flex items-center justify-center box-border focus-visible:outline-none">
      <div className="w-[720px] h-[472px] rounded-[24px] bg-surface-white shadow-[0px_4px_16px_rgba(26,29,46,0.08)] box-border p-8 flex flex-col items-center justify-center gap-8 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-soft text-primary-500 flex items-center justify-center">
          <GraduationCap size={44} aria-hidden="true" />
        </div>

        <div>
          <h1 className="font-heading font-extrabold text-[32px] text-text-primary m-0 mb-3">
            LingoGuru
          </h1>
          {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) sobre blanco para ratio 6.47:1 */}
          <p className="text-body text-text-secondaryAccessible max-w-[320px] m-0">
            Master English at your own pace through quick, bite-sized daily exercises.
          </p>
        </div>

        <Button
          type="button"
          onClick={onStart}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Get Started →
        </Button>
      </div>
    </main>
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

  return (
    /* WCAG 1.3.1: Usar <main id="main-content"> para la vista completa de formulario */
    <main id="main-content" tabIndex={-1} className="relative w-full min-h-screen bg-welcomeBackground flex items-center justify-center box-border focus-visible:outline-none">
      <form onSubmit={handleSubmit} className="w-[720px] min-h-[472px] rounded-[24px] bg-surface-white shadow-[0px_4px_16px_rgba(26,29,46,0.08)] box-border py-9 px-8 flex flex-col gap-5 text-left">
        <div className="text-center">
          {/* WCAG 1.3.1: Unico <h1> para el encabezado principal de la vista */}
          <h1 className="font-heading font-bold text-2xl text-text-primary m-0 mb-1">
            {mode === "register" ? "Create Profile" : "Welcome Back"}
          </h1>
          {/* WCAG 1.4.3: Usar text-text-secondaryAccessible (#595D6E) para ratio 6.47:1 */}
          <p className="text-bodySmall text-text-secondaryAccessible m-0">
            {mode === "register"
              ? "Join LingoGuru and track your milestones!"
              : "Log in to continue your English learning journey!"}
          </p>
        </div>

        <div className="flex flex-col gap-[14px] flex-1">
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-fullname"
                className="text-labelSmall text-text-tertiary"
              >
                Full Name
              </label>
              <Input
                id="auth-fullname"
                type="text"
                placeholder="e.g. María Aguilar"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                aria-required="true"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-email"
              className="text-labelSmall text-text-tertiary"
            >
              Email Address
            </label>
            <Input
              id="auth-email"
              type="email"
              placeholder="e.g. maria@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-password"
              className="text-labelSmall text-text-tertiary"
            >
              Password
            </label>
            <Input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              aria-required="true"
            />
          </div>

          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-language"
                className="text-labelSmall text-text-tertiary"
              >
                Native Language
              </label>
              <select
                id="auth-language"
                value={nativeLanguage}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setNativeLanguage(e.target.value)}
                className="w-full p-3 px-4 rounded-sm border-[1.5px] border-border-default text-[15px] font-body outline-none box-border text-text-primary bg-surface-white appearance-none bg-no-repeat bg-[right_12px_center] pr-10 cursor-pointer focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")` }}
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
              className="text-danger-textAccessible text-[13px] font-medium text-center"
              role="alert"
              aria-live="assertive"
            >
              <span aria-hidden="true">⚠️ </span>{error}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            {mode === "register" ? "Create Profile" : "Log In"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setMode(prev => prev === "register" ? "login" : "register");
              setError("");
            }}
            /* WCAG 1.4.3: Usar text-text-linkAccessible (#3550DC) para ratio de contraste 6.32:1 */
            className="w-full text-text-linkAccessible font-medium text-center py-1 underline hover:opacity-80 transition-opacity"
          >
            {mode === "register"
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </Button>
        </div>
      </form>
    </main>
  );
}
