import { Link } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

export const steps = [
  {
    title: "Referral",
    desc: "Your physician, hospital or clinic sends a referral — or you or a family member call us and we coordinate with your doctor's office.",
  },
  {
    title: "Nurse visit & assessment",
    desc: "A registered nurse visits your home, gets to know your needs, and confirms that home health care is the right fit.",
  },
  {
    title: "Your personal plan of care",
    desc: "Together with your physician we design your plan: the right services, the right schedule and clear goals for your recovery.",
  },
  {
    title: "Care that grows with you",
    desc: "Your team visits regularly, teaches you and your family, keeps your doctor informed and adjusts the plan as you improve.",
  },
];

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-cream">
      <div className="container-royal section">
        <div className="mb-14 grid gap-6 lg:grid-cols-12">
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
              data-mobile-step
              className="group bg-cream p-8 transition-all duration-500 hover:bg-forest [&.mobile-step-active]:bg-forest lg:p-10"
            >
              <span aria-hidden="true" className="font-serif-display text-2xl text-gold-ink transition-colors group-hover:text-gold-light group-[.mobile-step-active]:text-gold-light">
                0{i + 1}
              </span>
              <h3 className="font-serif-display mt-5 text-2xl font-semibold leading-snug text-forest transition-colors duration-500 group-hover:text-cream group-[.mobile-step-active]:text-cream">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-charcoal/90 transition-colors duration-500 group-hover:text-cream/95 group-[.mobile-step-active]:text-cream/95">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-10 flex flex-col gap-5 rounded-3xl border border-forest/10 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-semibold text-forest">Who can refer?</p>
            <p className="mt-1 text-moss">{site.whoCanRefer.join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-primary">
              <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
            </a>
            <Link to="/referrals" className="btn btn-outline">
              Referral information
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
