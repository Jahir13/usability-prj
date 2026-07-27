// Simple pattern matcher for hash routing
export interface RouteMatch {
  pattern: string;
  params: Record<string, string>;
}

const patterns = [
  "#/welcome",
  "#/onboarding",
  "#/auth",
  "#/dashboard",
  "#/learn/:skill/:levelId/:topicId/exercise",
  "#/learn/:skill/:levelId/lesson",
  "#/learn/:skill/:levelId",
  "#/profile",
];

export function parseHash(hash: string): RouteMatch {
  // Normalize empty or landing hashes to welcome
  const path = hash || "#/welcome";

  for (const pattern of patterns) {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) {
      continue;
    }

    const params: Record<string, string> = {};
    let isMatch = true;

    for (let i = 0; i < patternParts.length; i++) {
      const pPart = patternParts[i];
      const pathPart = pathParts[i];

      if (pPart.startsWith(":")) {
        const paramName = pPart.slice(1);
        params[paramName] = decodeURIComponent(pathPart);
      } else if (pPart !== pathPart) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return { pattern, params };
    }
  }

  // Fallback default
  return { pattern: "#/welcome", params: {} };
}
