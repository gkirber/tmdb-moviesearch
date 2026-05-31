export type ThemeMode = "light" | "dark";

const KEY = "theme";

export function loadTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    return "light";
  }

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

  return prefersDark ? "dark" : "light";
}

export function saveTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    return;
  }
}