import { Link } from "react-router";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { PageHero, CtaBand, CheckList } from "@/components/Shared";
import { Icon } from "@/components/Icon";
import { steps } from "@/sections/Process";

const include = [
  "Patient name, date of birth, address and phone number",
  "Primary and secondary diagnoses",
  "Orders for the services needed (nursing, therapy, aide, etc.)",
  "Recent history & physical or discharge summary",
  "Medication list and any wound, IV or catheter orders",
  "Ordering physician's name, NPI, phone and fax",
];

export default function ReferralsPage() {
  return (
    <>
      <PageHero
        eyebrow="For physicians, hospitals & families"
        title="A smooth transition home, coordinated with you."
        intro={
          <p>
            We work directly with each patient's physician to develop and carry out the plan of care. Referrals are welcome
            from physicians, hospitals, skilled nursing facilities, clinics, social agencies, families and patients themselves.
          </p>
        }
        aside={
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
            <div className="bg-forest-deep/90 p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">Call referrals</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="font-serif-display text-3xl font-medium text-cream underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="bg-forest-deep/90 p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">Fax orders & records</dt>
              <dd className="mt-1 font-serif-display text-3xl font-medium text-cream">{site.fax}</dd>
            </div>
            <div className="bg-forest-deep/90 p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">Office hours</dt>
              <dd className="mt-1 text-cream">{site.hours.label}</dd>
            </div>
          </dl>
        }
      />

      <section aria-labelledby="ref-steps-title" className="bg-cream">
        <div className="container-royal grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5 text-gold-ink">How referral works</p>
            <h2 id="ref-steps-title" className="h-display text-h2 text-forest">
              From referral to first visit.
            </h2>
            <ol className="mt-10 space-y-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-serif-display text-xl text-cream">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-forest">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-moss">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 rounded-2xl border border-forest/15 bg-white p-5 leading-relaxed text-moss">
              We aim to make the first visit within 48 hours of referral or the patient's return home, or on the start of
              care date you order. {site.hours.onCall}
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="card p-7 sm:p-9">
              <h2 className="font-serif-display text-3xl font-semibold text-forest">What to include with a referral</h2>
              <div className="mt-6">
                <CheckList items={include} />
              </div>
              <p className="mt-6 flex gap-3 rounded-xl bg-linen p-4 text-[0.95rem] text-moss">
                <Icon name="Info" className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                Please send patient medical records by fax or phone rather than through our website contact form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ref-services-title" className="bg-linen">
        <div className="container-royal py-20 lg:py-24">
          <h2 id="ref-services-title" className="h-display text-h2 max-w-3xl text-forest">
            Services you can order
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="group flex min-h-[3rem] items-center gap-3 border-b border-forest/10 py-2 font-semibold text-forest">
                  <Icon name={s.icon} className="h-5 w-5 shrink-0 text-gold-ink" />
                  <span className="underline decoration-forest/25 underline-offset-4 group-hover:decoration-forest">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Ready to refer a patient?" body={`Call ${site.phone} or fax orders to ${site.fax}. Our intake team will confirm receipt and coordinate the start of care.`} />
    </>
  );
}
