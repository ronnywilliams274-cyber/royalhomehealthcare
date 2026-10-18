"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#journey-heading", label: "Care Journey" },
  { href: "#referral", label: "Referral" },
  { href: "/for-physicians", label: "For Physicians" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("reduced-motion");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = stored ? stored === "true" : media;
    setReduced(enabled);
    document.documentElement.dataset.reducedMotion = String(enabled);
  }, []);

  function toggleMotion() {
    const next = !reduced;
    setReduced(next);
    localStorage.setItem("reduced-motion", String(next));
    document.documentElement.dataset.reducedMotion = String(next);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ivory/10 bg-dusk/85 text-ivory backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          {/* Placeholder crest — swap for the client's vector logo (see README) */}
          <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" fill="none">
            <path
              d="M20 3 6 10v11c0 8 6 13.5 14 16 8-2.5 14-8 14-16V10L20 3Z"
              stroke="#d9a441"
              strokeWidth="2"
            />
            <path d="M13 21v-6l7-5 7 5v6h-4v-4h-6v4h-4Z" fill="#d9a441" />
          </svg>
          <span className="font-display text-lg font-medium tracking-wide">
            ROYAL
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-12 inline-flex items-center text-ivory/80 transition-colors hover:text-gold-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={reduced}
            className="min-h-12 rounded-full border border-ivory/25 px-4 text-sm text-ivory/85 transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            {reduced ? "Motion: reduced" : "Reduce motion"}
          </button>
          <a
            href={site.contact.phoneHref}
            className="hidden min-h-12 items-center rounded-full bg-gold-500 px-5 font-medium text-ink transition-colors hover:bg-gold-300 sm:inline-flex"
          >
            {site.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
