import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero, CtaBand, CheckList, FaqList, MedicareBadge } from "@/components/Shared";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { medicareEligibility } from "@/sections/MedicareBand";
import { Icon } from "@/components/Icon";

const covered = [
  "Part-time or intermittent skilled nursing — wound care, IV or nutrition therapy, injections, teaching and monitoring",
  "Physical, occupational and speech-language therapy",
  "Medical social services",
  "Part-time home health aide care, when you're also getting skilled nursing or therapy",
  "Medical supplies for use at home",
  "Durable medical equipment, such as walkers and hospital beds (20% coinsurance applies)",
];

const notCovered = [
  "24-hour care at home",
  "Meals delivered to your home",
  "Homemaker services, such as shopping and cleaning, that aren't related to your care plan",
  "Personal care, such as bathing and dressing, when it's the only care you need",
];

const rights = [
  "Choose your home health agency — Medicare lets you pick any certified agency that serves your area",
  "Take part in planning your care and receive information about your plan of care",
  "Be told in advance about the care you'll receive and any costs you may owe",
  "Have your property and person treated with respect, and your health information kept private",
  "Voice complaints about your care without fear of retaliation, and be told how to reach the state home health hotline",
];

export default function MedicarePage() {
  return (
    <>
      <PageHero
        eyebrow="Medicare-certified home health agency"
        title="Medicare-certified care, with nothing to pay for covered services."
        intro={
          <p>
            Royal Home Health Care, Inc. is certified by Medicare. If you qualify, Medicare pays the full cost of covered home
            health services — and we handle the paperwork with your physician.
          </p>
        }
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <MedicareBadge dark />
            <p className="mt-5 font-serif-display text-6xl font-medium text-gold-light">$0</p>
            <p className="mt-2 text-cream/90">What eligible patients pay for covered home health services.</p>
            {site.medicare.ccn && <p className="mt-4 text-sm text-cream/80">CMS Certification Number: {site.medicare.ccn}</p>}
          </div>
        }
      >
        <a href={site.phoneHref} className="btn btn-gold">
          <Icon name="Phone" className="h-4 w-4" /> Check my eligibility
        </a>
      </PageHero>

      <section aria-labelledby="meaning-title" className="bg-cream">
        <div className="container-royal grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-5 text-gold-ink">
              What it means
            </p>
            <h2 id="meaning-title" data-reveal className="h-display text-h2 text-forest">
              What “Medicare-certified” means for you.
            </h2>
            <div data-reveal className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/90">
              <p>
                Medicare only pays for home health care provided by agencies it has certified. To be certified, an agency must
                meet federal health and safety standards — called Conditions of Participation — set by the Centers for Medicare
                &amp; Medicaid Services (CMS), and it is surveyed to confirm it follows them.
              </p>
              <p>
                Those standards cover patient rights, care planning with your physician, qualified clinical staff, infection
                control, emergency preparedness and quality monitoring. In short: certification is an independent check that
                your care meets a national standard.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <SmartImage
                src={media.connection}
                alt="A smiling older woman resting in a recliner looks up at a nurse who leans in to talk with her."
                width={1080}
                height={720}
                className="aspect-[4/3] rounded-[1.75rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="eligible-title" className="bg-linen">
        <div className="container-royal grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-gold-ink">Who qualifies</p>
            <h2 id="eligible-title" className="h-display text-h2 text-forest">
              You may qualify for Medicare home health if:
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-moss">
              All four must be true. Not sure? Call us — a registered nurse will help determine eligibility and work with your
              doctor's office.
            </p>
          </div>
          <div className="card p-7 sm:p-10 lg:col-span-6 lg:col-start-7">
            <CheckList items={medicareEligibility} />
            <div className="mt-8 border-t border-forest/10 pt-6">
              <h3 className="font-semibold text-forest">What does “homebound” mean?</h3>
              <p className="mt-2 leading-relaxed text-charcoal/90">
                Leaving home isn't recommended because of your condition, or you need help — a cane, walker, wheelchair, special
                transportation or another person — to leave; and leaving home takes a considerable and taxing effort. You can
                still go to medical appointments, religious services, adult day care and occasional short outings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="covered-title" className="bg-cream">
        <div className="container-royal py-20 lg:py-24">
          <p className="eyebrow mb-5 text-gold-ink">What's covered</p>
          <h2 id="covered-title" className="h-display text-h2 max-w-3xl text-forest">
            What Medicare home health covers — and what it doesn't.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="card p-7 sm:p-9">
              <h3 className="font-serif-display text-3xl font-semibold text-forest">Covered when you qualify</h3>
              <div className="mt-6">
                <CheckList items={covered} />
              </div>
            </div>
            <div className="rounded-2xl border border-forest/15 bg-white/60 p-7 sm:p-9">
              <h3 className="font-serif-display text-3xl font-semibold text-forest">Not covered by Medicare</h3>
              <ul className="mt-6 space-y-3.5">
                {notCovered.map((n) => (
                  <li key={n} className="flex gap-3 leading-relaxed text-charcoal/90">
                    <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-forest/30 text-forest">
                      <Icon name="X" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["Home health services", "$0", "for covered services when you're eligible"],
              ["Medical equipment (DME)", "20%", "of the Medicare-approved amount, after the Part B deductible"],
              ["Before care begins", "Notice", "We tell you in writing if any service won't be covered and what it would cost"],
            ].map(([t, v, d]) => (
              <div key={t} className="rounded-2xl bg-forest p-7 text-cream on-dark">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/85">{t}</p>
                <p className="mt-3 font-serif-display text-5xl font-medium text-gold-light">{v}</p>
                <p className="mt-2 text-cream/90">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-moss">
            Source: Medicare.gov, “Home health services.” If you have a Medicare Advantage plan, coverage rules and networks vary —
            call us and we'll check your plan. We also work with Medi-Cal, some private insurance, workers' compensation, regional
            centers and private pay.
          </p>
        </div>
      </section>

      <section aria-labelledby="rights-title" className="on-dark bg-forest-deep text-cream">
        <div className="container-royal grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-gold-light">Your rights</p>
            <h2 id="rights-title" className="h-display text-h2">
              As a Medicare patient, you have the right to:
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/90">
              We give every patient a written copy of their rights at the start of care and review it with you.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CheckList items={rights} dark />
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-cream/90">
              <p>
                Compare agencies with Medicare's{" "}
                <a href="https://www.medicare.gov/care-compare/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-light underline underline-offset-4">
                  Care Compare tool<span className="sr-only"> (opens in a new tab)</span>
                </a>
                , or call {site.compliance.medicareLine.phone} (TTY {site.compliance.medicareLine.tty}).
              </p>
              <p className="mt-3">
                <Link to="/nondiscrimination" className="link-arrow">
                  Complaint and patient-rights contacts <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mfaq-title" className="bg-linen">
        <div className="container-royal grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <h2 id="mfaq-title" className="h-display text-h2 text-forest">
              Medicare questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList
              items={[
                {
                  q: "Do I need a referral from my doctor?",
                  a: "You need orders from your physician or another allowed practitioner, and that provider must have seen you in a face-to-face visit related to the main reason you need home health care. If you don't have orders yet, call us and we'll contact your doctor's office.",
                },
                {
                  q: "How long can I receive Medicare home health care?",
                  a: "There's no fixed lifetime limit. Your physician certifies your plan of care for up to 60 days at a time, and it can be recertified as long as you continue to qualify.",
                },
                {
                  q: "Can I choose Royal if the hospital suggests another agency?",
                  a: "Yes. With Medicare you have the right to choose any Medicare-certified home health agency that serves your area. Tell your discharge planner or physician you'd like Royal Home Health Care.",
                },
                {
                  q: "What if Medicare won't pay for a service?",
                  a: "Before you receive a service Medicare may not cover, we'll give you written notice explaining why and what it would cost, so you can decide what to do.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand title="Find out if you qualify — it takes one call." />
    </>
  );
}
