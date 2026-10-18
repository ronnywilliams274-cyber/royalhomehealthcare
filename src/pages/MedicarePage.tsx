import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero, CtaBand, CheckList, FaqList, MedicareBadge } from "@/components/Shared";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { medicareEligibility } from "@/sections/MedicareBand";
import { Icon } from "@/components/Icon";

const covered = [
  "Part-time or intermittent skilled nursing, including wound care, IV or nutrition therapy, injections, family teaching, and health monitoring",
  "Physical, occupational, and speech-language therapy",
  "Medical social services to support you and your family",
  "Part-time home health aide visits when you are also receiving skilled nursing or therapy",
  "Routine medical supplies needed for your care at home",
  "Durable medical equipment such as walkers and hospital beds (20% coinsurance applies after the Part B deductible)",
];

const notCovered = [
  "Round-the-clock 24-hour care at home",
  "Meals delivered to your home",
  "General housekeeping like shopping and cleaning when unrelated to your medical care plan",
  "Personal care like bathing and dressing when that is the only care you need",
];

const rights = [
  "Choose your own home health agency. Medicare gives you the freedom to pick any certified agency that serves your neighborhood",
  "Take an active part in planning your care and receive a clear copy of your care plan",
  "Be told in advance about the services you will receive and any costs that might not be covered",
  "Have your home, your family, and your privacy treated with respect at every visit",
  "Speak up or share a concern about your care without ever worrying about retaliation, and know how to reach the state home health hotline",
];

export default function MedicarePage() {
  return (
    <>
      <PageHero
        eyebrow="Medicare-certified home health agency"
        title="Medicare-certified care, with $0 out of pocket for covered visits."
        intro={
          <p>
            Royal Home Health Care, Inc. is certified by Medicare. When you qualify under Original Medicare, your covered home health visits are paid in full, and our office coordinates all the paperwork directly with your doctor.
          </p>
        }
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <MedicareBadge dark />
            <p className="mt-5 font-serif-display text-6xl font-medium text-gold-light">$0</p>
            <p className="mt-2 text-cream/90">What eligible patients pay for covered home health visits.</p>
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
              What “Medicare-certified” means for your family.
            </h2>
            <div data-reveal className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/90">
              <p>
                Medicare only pays for home health care when it comes from an agency that has earned federal Medicare certification. To earn and keep that certification, an agency has to meet strict federal health and safety standards set by the Centers for Medicare &amp; Medicaid Services (CMS) and pass regular independent surveys.
              </p>
              <p>
                Those standards cover everything from how we coordinate with your doctor and verify nursing credentials to infection control, emergency readiness, and patient rights. Simply put, certification gives your family peace of mind that our clinical care meets a trusted national standard.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <SmartImage
                src={media.connection}
                alt="A registered nurse at a sunlit dining table reviewing hospital discharge instructions and a pill organizer with an older couple."
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
              All four of these need to apply. If you are not sure whether you or your loved one qualifies, give us a call. One of our registered nurses will talk it through with you and check with your doctor's office.
            </p>
          </div>
          <div className="card p-7 sm:p-10 lg:col-span-6 lg:col-start-7">
            <CheckList items={medicareEligibility} />
            <div className="mt-8 border-t border-forest/10 pt-6">
              <h3 className="font-semibold text-forest">What does “homebound” mean?</h3>
              <p className="mt-2 leading-relaxed text-charcoal/90">
                Being homebound does not mean you are confined to bed. It means leaving home is not recommended because of your medical condition, or you need support such as a cane, walker, wheelchair, special transportation, or another person's help to go out, and leaving takes a real physical effort. You can still leave home for doctor visits, religious services, adult day care, and occasional short family outings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="covered-title" className="bg-cream">
        <div className="container-royal py-20 lg:py-24">
          <p className="eyebrow mb-5 text-gold-ink">What's covered</p>
          <h2 id="covered-title" className="h-display text-h2 max-w-3xl text-forest">
            What Medicare home health covers, and what it does not.
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
              ["Home health services", "$0", "for covered home health visits when you qualify"],
              ["Medical equipment (DME)", "20%", "of the Medicare-approved amount, after your Part B deductible"],
              ["Before care begins", "Written notice", "We let you know in writing ahead of time if any requested item is not covered by Medicare"],
            ].map(([t, v, d]) => (
              <div key={t} className="rounded-2xl bg-forest p-7 text-cream on-dark">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/85">{t}</p>
                <p className="mt-3 font-serif-display text-5xl font-medium text-gold-light">{v}</p>
                <p className="mt-2 text-cream/90">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-moss">
            Source: Medicare.gov, “Home health services.” If you have a Medicare Advantage plan, network rules and prior authorizations vary by plan. Give us a call and we will check your specific benefits. We also work with Medi-Cal, select private insurance plans, workers' compensation, regional centers, and private pay.
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
              We provide every patient and family with a written copy of their rights at our very first visit and walk through it together.
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
                  a: "Yes. You need orders from your physician or another licensed practitioner, and that provider must have seen you in a face-to-face visit related to the reason you need home health care. If you do not have orders yet, just call us and we will reach out to your doctor's office.",
                },
                {
                  q: "How long can I receive Medicare home health care?",
                  a: "There is no fixed lifetime cap. Your doctor certifies your plan of care for up to 60 days at a time, and your plan can be renewed for additional 60-day periods as long as you continue to need skilled care and meet Medicare requirements.",
                },
                {
                  q: "Can I choose Royal if the hospital suggests another agency?",
                  a: "Yes. Under federal Medicare law, you have the right to choose any Medicare-certified home health agency that serves your area. Just let your hospital discharge planner or doctor know you want Royal Home Health Care.",
                },
                {
                  q: "What if Medicare won't pay for a service?",
                  a: "Before providing any item or service that Medicare might not cover, we give you a clear written notice explaining why and what it would cost, so you are never surprised by a bill.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand title="Find out if you qualify with one quick phone call." />
    </>
  );
}
