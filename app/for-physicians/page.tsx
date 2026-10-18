import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReferralForm } from "@/components/ReferralForm";

export const metadata: Metadata = {
  title: "For Referring Physicians & Hospitals",
  description: `Refer a patient to ${site.name}. Physician-coordinated home health care in Van Nuys, Los Angeles, Ventura, San Bernardino, and Orange Counties. Phone ${site.contact.phoneDisplay}, fax ${site.contact.fax}.`,
  alternates: { canonical: `${site.domain}/for-physicians` },
};

export default function ForPhysiciansPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="dusk-dawn mx-auto max-w-4xl px-5 pb-16 pt-36 text-ivory">
          <p className="text-sm uppercase tracking-[0.25em] text-gold-300">For referring physicians & hospitals</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-tight">
            A smooth transition home, coordinated with you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/85">
            We work directly with each patient&apos;s physician to develop and
            carry out the plan of care. Home care is an ideal transition
            between hospitalization and independent living — and can support
            earlier, safer discharges.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center rounded-full bg-gold-500 px-8 font-medium text-ink transition-colors hover:bg-gold-300"
            >
              Call {site.contact.phoneDisplay}
            </a>
            <span className="inline-flex min-h-12 items-center rounded-full border border-ivory/30 px-8">
              Fax: {site.contact.fax}
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-ivory/70">
            {site.hours.onCallNote}
          </p>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto grid max-w-4xl gap-12 px-5 py-20 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-medium text-ink">How referral works</h2>
              <ol className="mt-8 list-decimal space-y-5 pl-6 text-ink/75">
                {site.journey.map((j) => (
                  <li key={j.step}>
                    <span className="font-medium text-ink">{j.title}.</span> {j.body}
                  </li>
                ))}
              </ol>
              <p className="mt-8 rounded-2xl border border-gold-700/30 bg-gold-300/20 p-5 text-ink/75">
                {site.formNotice}
              </p>
            </div>
            <ReferralForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
