import { useSyncExternalStore } from "react";

export type ThemeId = "sage" | "coastal" | "azure";
export const THEME_IDS: ThemeId[] = ["sage", "coastal", "azure"];
const STORAGE_KEY = "rhhc-color-theme";
const listeners = new Set<() => void>();

/**
 * Colour theme shared by every theme control on the page.
 * The saved theme is applied by an inline script in index.html *before* the first paint,
 * so returning visitors never see a flash of the default colours.
 */
function read(): ThemeId {
  if (typeof document === "undefined") return "sage";
  const t = document.documentElement.getAttribute("data-theme") as ThemeId | null;
  return t && THEME_IDS.includes(t) ? t : "sage";
}

export function setTheme(id: ThemeId) {
  const html = document.documentElement;
  // Animate colours only during an actual switch (never on page load or while scrolling).
  html.classList.add("theme-switching");
  html.setAttribute("data-theme", id);
  window.setTimeout(() => html.classList.remove("theme-switching"), 500);
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage unavailable: the choice lasts for this visit */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTheme(): ThemeId {
  return useSyncExternalStore(subscribe, read, () => "sage");
}
