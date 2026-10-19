import { useState } from "react";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/**
 * Payer strip: one row that drifts slowly sideways.
 * Accessibility (WCAG 2.2.2 Pause, Stop, Hide):
 * - a visible Pause/Play button stops the movement, and it also pauses on hover and keyboard focus;
 * - it never moves for visitors who ask for reduced motion (OS setting or the footer toggle) or
 *   before JavaScript loads; they get a static list instead (see .marquee rules in index.css);
 * - screen readers hear the list once: the second copy that makes the loop seamless is aria-hidden.
 */
export default function TrustBar() {
  const [paused, setPaused] = useState(false);

  const items = (hidden: boolean) => (
    <ul
      className={`flex shrink-0 items-center gap-x-10 gap-y-3 pr-10 ${hidden ? "marquee-dup" : "marquee-list"}`}
      aria-hidden={hidden || undefined}
    >
      {site.coverage.map((c) => (
        <li key={c.name} className="flex shrink-0 items-center gap-2 whitespace-nowrap font-serif-display text-xl font-medium text-forest sm:text-2xl">
          <Icon name="Check" className="h-4 w-4 text-gold-ink" strokeWidth={2.5} />
          {c.name}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="payers-title" className="border-y border-forest/10 bg-linen">
      <div className="container-royal flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8 lg:py-7">
        <h2 id="payers-title" className="eyebrow shrink-0 text-gold-ink">
          We work with
        </h2>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="marquee min-w-0 flex-1" data-paused={paused || undefined}>
            <div className="marquee-track">
              {items(false)}
              {items(true)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play scrolling list of insurance we work with" : "Pause scrolling list of insurance we work with"}
            className="marquee-toggle h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest/[0.06]"
          >
            <Icon name={paused ? "Play" : "Pause"} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
