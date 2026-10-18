import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useLenis";
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
    if (!root || isMotionOff()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.dataset.count || "0", 10);
        if (target < 2) return;
        const obj = { n: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.n));
          },
        });
      });
    }, root);
    return () => ctx.revert();
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
