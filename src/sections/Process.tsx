import { Link } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

export const steps = [
  {
    title: "Quick referral",
    desc: "Your doctor, hospital, or clinic sends a referral over, or you call us directly and we reach out to your doctor's office for you.",
  },
  {
    title: "Home nurse visit",
    desc: "One of our registered nurses comes to your home, listens to how you are feeling, and goes over your medications and care needs.",
  },
  {
    title: "Your personal care plan",
    desc: "Together with your physician, we set up a plan that fits your life, including the right services, visit schedule, and recovery goals.",
  },
  {
    title: "Care that adjusts with you",
    desc: "Your team visits on schedule, shows your family how to help, keeps your doctor updated, and adjusts your visits as you get stronger.",
  },
];

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-cream">
      <div className="container-royal section">
        <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12">
          <p data-reveal className="eyebrow text-gold-ink lg:col-span-3 lg:pt-4">
            How it works
          </p>
          <div className="lg:col-span-9">
            <h2 id="process-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
              Getting started is easier than you think.
            </h2>
          </div>
        </div>

        <ol data-reveal className="grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 shadow-[0_24px_50px_-28px_rgb(var(--forest-ink-rgb)/0.2)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group flex gap-4 bg-cream p-6 transition-colors duration-500 hover:bg-forest sm:block sm:p-8 lg:p-10"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-serif-display text-lg text-cream transition-colors group-hover:text-gold-light sm:h-auto sm:w-auto sm:justify-start sm:rounded-none sm:bg-transparent sm:text-2xl sm:text-gold-ink"
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="font-serif-display text-2xl font-semibold leading-snug text-forest transition-colors duration-500 group-hover:text-cream sm:mt-5">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-charcoal/90 transition-colors duration-500 group-hover:text-cream/95 sm:mt-3">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-10 flex flex-col gap-5 rounded-3xl border border-forest/10 bg-white p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="font-semibold text-forest">Who can refer?</p>
            <p className="mt-1 text-moss">{site.whoCanRefer.join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
            <a href={site.phoneHref} className="btn btn-primary whitespace-nowrap">
              <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
            </a>
            <Link to="/referrals" className="btn btn-outline whitespace-nowrap">
              Referral information
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
