import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero, CtaBand, MedicareBadge } from "@/components/Shared";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { Icon, type IconName } from "@/components/Icon";
import { steps } from "@/sections/Process";

const values: { icon: IconName; title: string; body: string }[] = [
  { icon: "HandHeart", title: "Genuine compassion", body: "We care for every patient the way we would want our own parents and grandparents cared for, with patience, dignity, and kindness." },
  { icon: "Stethoscope", title: "Clinical excellence", body: "Experienced, licensed nurses and therapists who follow your doctor's orders and take pride in getting the details right." },
  { icon: "Users", title: "Family partnership", body: "Families are part of the care team. We take the time to teach, listen, and keep you in the loop at every visit." },
  { icon: "ClipboardCheck", title: "Seamless coordination", body: "One shared plan and one connected team, with nursing, therapy, aides, and medical supplies working alongside your doctor." },
  { icon: "ShieldPlus", title: "Everyday safety", body: "Careful medication reviews, fall prevention, sterile technique, and clear guidance on when to call us." },
  { icon: "Accessibility", title: "Respect for every person", body: "We proudly care for families of every background across Southern California and adapt how we communicate to fit your needs." },
];

const team = [
  { title: "Registered nurses", body: "Evaluate your health, provide hands-on clinical care, teach your family, and coordinate directly with your physician." },
  { title: "Certified home health aides", body: "Assist with warm showers, grooming, dressing, and safe mobility under the supervision of a registered nurse." },
  { title: "Physical, occupational & speech therapists", body: "Licensed local therapy partners coordinated by Royal as part of your care plan." },
  { title: "Medical social workers", body: "Help families navigate community programs, counseling, and long-term care planning." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Royal Home Health Care"
        title={site.tagline + "."}
        intro={
          <p>
            We are a licensed, Medicare-certified home health agency based in Van Nuys, California, bringing attentive clinical care to families across Los Angeles, Ventura, San Bernardino, and Orange Counties.
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
                Our goal is straightforward: to help you or your loved one recover, stay safe, and feel comfortable in the place you know best. We do that through unhurried clinical visits, honest communication, and genuine respect for every family we meet.
              </p>
              <p>
                Coming home from a hospital or rehab stay is a big moment, and having the right support in those first few weeks makes all the difference. Steady care at home helps prevent avoidable trips back to the emergency room and lets you heal in your own bed, surrounded by family.
              </p>
              <p>
                Everything we do starts with your own doctor. Your physician directs your medical plan, and our team brings that plan to life in your living room while keeping your doctor updated along the way.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <SmartImage
                src={media.companionship}
                alt="A compassionate female nurse in navy scrubs sitting beside a smiling older gentleman on a sofa reviewing a care plan folder."
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
