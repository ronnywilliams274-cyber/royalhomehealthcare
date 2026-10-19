import { useEffect, useState, useRef } from "react";
import { Icon } from "@/components/Icon";
import { setTheme, useTheme, type ThemeId } from "@/hooks/useTheme";

interface ThemeOption {
  id: ThemeId;
  name: string;
  desc: string;
  primary: string;
  accent: string;
  surface: string;
}

const THEMES: ThemeOption[] = [
  {
    id: "sage",
    name: "Botanical Sage",
    desc: "Healing Emerald & Sunlit Ivory",
    primary: "#1b4d2e",
    accent: "#c29643",
    surface: "#eef4ec",
  },
  {
    id: "coastal",
    name: "Coastal Care",
    desc: "Pacific Teal & Pearl Aqua",
    primary: "#0d596b",
    accent: "#d18741",
    surface: "#e7f4f8",
  },
  {
    id: "azure",
    name: "Sanctuary Blue",
    desc: "Clinical Azure & Alabaster",
    primary: "#1b4b8a",
    accent: "#c99238",
    surface: "#eaf1fb",
  },
];

/** Compact swatch row, used in the footer on phones (the floating switcher is hidden there). */
export function ThemeSwatches() {
  const theme = useTheme();
  return (
    <div role="group" aria-label="Colour theme" className="flex items-center gap-2">
      {THEMES.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            aria-label={`${t.name} theme`}
            aria-pressed={active}
            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-transform active:scale-90 ${
              active ? "border-gold-light" : "border-white/25"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: t.primary }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function ThemeSwitcher() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const applyTheme = (id: ThemeId) => setTheme(id);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div
      ref={wrapRef}
      className="no-print fixed bottom-6 right-6 z-50 hidden flex-col items-end sm:flex"
    >
      {open && (
        <div
          role="dialog"
          aria-label="Choose color theme"
          className="mb-2.5 w-64 rounded-2xl border border-forest/20 bg-white p-3 shadow-[0_20px_50px_-15px_rgb(var(--forest-ink-rgb)/0.35)]"
        >
          <div className="mb-2 flex items-center justify-between px-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
              Color Theme
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme menu"
              className="flex h-6 w-6 items-center justify-center rounded-full text-moss hover:bg-forest/10 hover:text-forest"
            >
              <Icon name="X" className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {THEMES.map((t) => {
              const active = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    applyTheme(t.id);
                    setOpen(false);
                  }}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 active:scale-[0.98] ${
                    active
                      ? "bg-forest text-cream shadow-sm"
                      : "bg-white/60 text-charcoal hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-black/15" style={{ backgroundColor: t.primary }}>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: t.accent }}
                      />
                    </span>
                    <div>
                      <p className={`text-sm font-semibold leading-tight ${active ? "text-cream" : "text-forest"}`}>
                        {t.name}
                      </p>
                      <p className={`text-[11px] leading-tight ${active ? "text-cream/85" : "text-moss"}`}>
                        {t.desc}
                      </p>
                    </div>
                  </div>
                  {active && <Icon name="Check" className="h-4 w-4 shrink-0 text-gold-light" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Compact floating button: shows the current theme colours; opens the full theme menu. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Colour theme: ${current.name}. Change theme`}
        title="Change colour theme"
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full border border-forest/20 bg-white shadow-[0_12px_34px_-8px_rgb(var(--forest-ink-rgb)/0.32)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: current.primary }}>
          <Icon name="Palette" className="h-4 w-4 text-white" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white" style={{ backgroundColor: current.accent }} />
        </span>
      </button>
    </div>
  );
}
