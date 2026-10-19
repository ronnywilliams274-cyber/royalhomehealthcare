import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { site } from "@/data/site";

export default function WhyHome() {
  return (
    <section aria-labelledby="why-title" className="bg-linen">
      <div className="container-royal section grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div data-reveal>
            <SmartImage
              src={media.hands}
              alt="Close-up of a clinician gently holding the hands of an older patient resting under a soft cream knit blanket."
              width={720}
              height={900}
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[3/2] lg:aspect-[4/5]"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <p data-reveal className="eyebrow mb-5 text-gold-ink">
            Why home health care
          </p>
          <h2 id="why-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
            Recovery feels different in your own living room.
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-6 text-lg leading-relaxed text-moss">
            Most people heal better when they can sleep in their own bed, eat their own food, and recover surrounded by family on a schedule that fits real life.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {site.whyHome.map((w, i) => (
              <li key={w.title} data-reveal data-reveal-delay={String(i * 0.06)}>
                <h3 className="font-serif-display text-2xl font-semibold text-forest">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/90">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
