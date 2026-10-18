import { useEffect, useState, useRef } from "react";
import { Icon } from "@/components/Icon";

export type ThemeId = "sage" | "coastal" | "azure";

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

const STORAGE_KEY = "rhhc-color-theme";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("sage");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (saved && THEMES.some((t) => t.id === saved)) {
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.setAttribute("data-theme", "sage");
      }
    } catch {
      document.documentElement.setAttribute("data-theme", "sage");
    }
  }, []);

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

  const applyTheme = (id: ThemeId) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore storage errors
    }
  };

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div
      ref={wrapRef}
      className="no-print fixed bottom-[4.75rem] right-3.5 z-50 sm:bottom-6 sm:right-6"
    >
      {open && (
        <div
          role="dialog"
          aria-label="Choose color theme"
          className="mb-2.5 w-64 rounded-2xl border border-forest/20 bg-white/80 p-3 shadow-[0_20px_50px_-15px_rgb(var(--forest-ink-rgb)/0.35)] backdrop-blur-xl"
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
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 active:scale-[0.98] ${
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

      {/* Floating transparent pill button with direct swatch dots + menu toggle */}
      <div className="flex items-center gap-1.5 rounded-full border border-forest/20 bg-white/65 p-1.5 shadow-[0_12px_34px_-8px_rgb(var(--forest-ink-rgb)/0.32)] backdrop-blur-xl transition-all duration-300 hover:bg-white/85">
        {THEMES.map((t) => {
          const active = t.id === theme;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTheme(t.id)}
              aria-label={`Switch to ${t.name} theme`}
              aria-pressed={active}
              title={`${t.name}: ${t.desc}`}
              className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 active:scale-90 ${
                active ? "scale-105 ring-2 ring-forest ring-offset-1 ring-offset-white/80" : "opacity-80 hover:scale-105 hover:opacity-100"
              }`}
              style={{ backgroundColor: t.primary }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: t.accent }}
              />
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`Theme options (current: ${current.name})`}
          className="flex h-8 items-center gap-1 rounded-full px-2.5 text-xs font-semibold text-forest transition-colors hover:bg-forest/10"
        >
          <span className="hidden sm:inline">{current.name}</span>
          <Icon name="ChevronDown" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}
