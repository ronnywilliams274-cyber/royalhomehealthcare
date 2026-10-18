import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero, CtaBand, MedicareBadge } from "@/components/Shared";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { Icon, type IconName } from "@/components/Icon";
import { steps } from "@/sections/Process";

const values: { icon: IconName; title: string; body: string }[] = [
  { icon: "HandHeart", title: "Compassion", body: "We treat every patient the way we'd want our own parents treated — with patience, dignity and kindness." },
  { icon: "Stethoscope", title: "Clinical excellence", body: "Skilled, licensed clinicians who follow your physician's orders and current standards of care." },
  { icon: "Users", title: "Family partnership", body: "Families are part of the team. We teach, listen and keep you informed at every step." },
  { icon: "ClipboardCheck", title: "Coordination", body: "One plan, one team — nursing, therapy, aides and supplies working together with your doctor." },
  { icon: "ShieldPlus", title: "Safety", body: "Medication checks, fall prevention, infection control and clear guidance on when to call." },
  { icon: "Accessibility", title: "Respect for every person", body: "We serve people of every background and ability, and we adapt how we communicate to meet your needs." },
];

const team = [
  { title: "Registered nurses", body: "Assess, treat, teach and coordinate your care under your physician's orders." },
  { title: "Certified home health aides", body: "Help with bathing, grooming and personal care, supervised by a registered nurse." },
  { title: "Physical, occupational & speech therapists", body: "Licensed therapy partners coordinated by Royal as part of your plan." },
  { title: "Medical social workers", body: "Connect families with resources, counseling and long-term planning." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Royal Home Health Care"
        title={site.tagline + "."}
        intro={
          <p>
            We're a licensed, Medicare-certified home health agency based in Van Nuys, California, bringing skilled care to
            families across Los Angeles, Ventura, San Bernardino and Orange Counties.
          </p>
        }
        aside={<MedicareBadge dark />}
      />

      <section aria-labelledby="mission-title" className="bg-cream">
        <div className="container-royal grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-5 text-gold-ink">
              Our mission
            </p>
            <h2 id="mission-title" data-reveal className="h-display text-h2 text-forest">
              {site.taglineAlt}.
            </h2>
            <div data-reveal className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/90">
              <p>
                Our mission is simple: to help people recover, stay safe and live well in the place they feel most at home.
                We do that with skilled clinical care, clear communication and genuine respect for every patient and family.
              </p>
              <p>
                Home health care is an ideal bridge between the hospital and independent living. It can support earlier
                discharges, help avoid return trips to the hospital, and lower the overall cost of care — while letting
                patients heal surrounded by the people and things they love.
              </p>
              <p>
                Everything we do is coordinated with your physician. Your doctor leads; we bring the plan to life in your
                home and keep everyone informed.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <SmartImage
                src={media.companionship}
                alt="A smiling caregiver leans toward a laughing older man as they hold hands in a sunlit living room."
                width={720}
                height={900}
                className="aspect-[4/5] rounded-[1.75rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-linen">
        <div className="container-royal py-20 lg:py-24">
          <p className="eyebrow mb-5 text-gold-ink">What guides us</p>
          <h2 id="values-title" className="h-display text-h2 max-w-3xl text-forest">
            Six commitments we make to every family.
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} data-reveal data-reveal-delay={String((i % 3) * 0.06)} className="card p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-cream">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-serif-display text-2xl font-semibold text-forest">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-moss">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-title" className="on-dark bg-forest-deep text-cream">
        <div className="container-royal grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-gold-light">Your care team</p>
            <h2 id="team-title" className="h-display text-h2">
              The people who come to your door.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/90">
              Every member of your team works from the same plan of care, signed by your physician.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {team.map((t) => (
              <li key={t.title} className="bg-forest-deep p-7">
                <h3 className="font-serif-display text-2xl font-semibold">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-cream/90">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-cream">
        <div className="container-royal py-20 lg:py-24">
          <h2 id="how-title" className="h-display text-h2 max-w-3xl text-forest">
            How care begins
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-gold pt-5">
                <p className="font-serif-display text-xl text-gold-ink" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-serif-display text-2xl font-semibold text-forest">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-moss">{s.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-3xl border border-forest/10 bg-white p-7 sm:p-9">
            <h3 className="font-serif-display text-2xl font-semibold text-forest">Our commitment to equal access</h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-charcoal/90">{site.compliance.statement}</p>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/nondiscrimination" className="link-arrow">
                Nondiscrimination notice <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
              <Link to="/accessibility" className="link-arrow">
                Accessibility statement <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
