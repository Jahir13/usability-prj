import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { figmaTokens } from "../../styles/tokens";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught exercise error:", error, errorInfo);
  }

  private handleGoHome = () => {
    window.location.hash = "#/dashboard";
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: figmaTokens.colors.background.app,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          boxSizing: "border-box",
        }}>
          <div style={{
            maxWidth: 480,
            width: "100%",
            background: figmaTokens.colors.surface.white,
            borderRadius: 16,
            border: `1.5px solid ${figmaTokens.colors.border.default}`,
            padding: 32,
            boxSizing: "border-box",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: figmaTokens.colors.danger.soft,
              color: figmaTokens.colors.danger[500],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <AlertTriangle size={28} />
            </div>

            <div>
              <h3 style={{
                fontFamily: figmaTokens.typography.families.heading,
                fontWeight: figmaTokens.typography.weights.bold,
                fontSize: 20,
                color: figmaTokens.colors.text.primary,
                margin: "0 0 8px 0",
              }}>
                Exercise Loading Failed
              </h3>
              <p style={{
                fontFamily: figmaTokens.typography.families.body,
                fontSize: 14,
                color: figmaTokens.colors.text.secondary,
                margin: 0,
                lineHeight: "20px",
              }}>
                An unexpected error occurred while rendering the exercise content. Your progress in this session has been saved locally.
              </p>
            </div>

            <button
              type="button"
              onClick={this.handleGoHome}
              style={{
                height: 48,
                padding: "0 24px",
                borderRadius: 24,
                border: 0,
                background: figmaTokens.colors.primary[500],
                color: figmaTokens.colors.text.onPrimary,
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                boxShadow: "0 4px 12px rgba(79, 110, 247, 0.2)",
              }}
            >
              <Home size={16} />
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
