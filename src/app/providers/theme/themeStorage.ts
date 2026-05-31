export type ThemeMode = "light" | "dark";

const KEY = "theme";

export function loadTheme(): ThemeMode {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (err) {
    console.warn("Theme storage unavailable.", err);
  }

  if (saved === "light" || saved === "dark") return saved;

  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

  return prefersDark ? "dark" : "light";
}

export function saveTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(KEY, theme);
  } catch (err) {
    console.warn("Failed to save theme.", err);
  }
}
