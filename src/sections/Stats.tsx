import { useEffect, useRef } from "react";
import { isMotionOff } from "@/hooks/useMotion";
import { services } from "@/data/services";
import { site } from "@/data/site";

const stats = [
  { prefix: "", value: services.length, suffix: "", label: "Home health services under one coordinated plan" },
  { prefix: "", value: site.counties.length, suffix: "", label: "Southern California counties served from Van Nuys" },
  { prefix: "$", value: 0, suffix: "", label: "Cost for covered home health services with Medicare" },
  { prefix: "", value: 1, suffix: "", label: `Call to get started: ${site.phone}` },
];

/**
 * Key facts. The final numbers are in the HTML (screen readers and search engines read the
 * real value); the count-up is a purely visual flourish and is skipped when motion is off.
 */
export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || isMotionOff() || !("IntersectionObserver" in window)) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-count]")).filter(
      (el) => parseInt(el.dataset.count || "0", 10) >= 2
    );
    let raf = 0;
    // Count up once, when the numbers scroll into view. A few frames of text updates; nothing else.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          for (const el of els) el.textContent = String(Math.round(parseInt(el.dataset.count!, 10) * eased));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      els.forEach((el) => (el.textContent = el.dataset.count!));
    };
  }, []);

  return (
    <section ref={ref} aria-label="Royal Home Health Care at a glance" className="border-b border-forest/10 bg-cream">
      <dl className="container-royal grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-4 lg:py-20">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal data-reveal-delay={String(i * 0.06)} className="flex flex-col-reverse border-l-2 border-gold pl-5">
            <dt className="mt-3 max-w-[24ch] text-[0.95rem] leading-relaxed text-moss">{s.label}</dt>
            <dd className="font-serif-display text-6xl font-medium leading-none text-forest lg:text-7xl">
              <span className="sr-only">{`${s.prefix}${s.value}${s.suffix}`}</span>
              <span aria-hidden="true">
                {s.prefix}
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
