import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/** Static payer strip (replaces the old auto-scrolling marquee, which could not be paused - WCAG 2.2.2). */
export default function TrustBar() {
  return (
    <section aria-labelledby="payers-title" className="border-y border-forest/10 bg-linen">
      <div className="container-royal flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-10">
        <h2 id="payers-title" className="eyebrow shrink-0 text-gold-ink">
          We work with
        </h2>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {site.coverage.map((c) => (
            <li key={c.name} className="flex items-center gap-2 font-serif-display text-xl font-medium text-forest sm:text-2xl">
              <Icon name="Check" className="h-4 w-4 text-gold-ink" strokeWidth={2.5} />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
