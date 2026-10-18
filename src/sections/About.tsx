import { Link } from "react-router";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-cream">
      <div className="container-royal section grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p data-reveal className="eyebrow mb-6 text-gold-ink">
            Who we are
          </p>
          <h2 id="about-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
            A team that comes to you, because home is where you heal best.
          </h2>
          <div data-reveal data-reveal-delay="0.12" className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-charcoal/90">
            <p>
              Royal Home Health Care, Inc. is a licensed, Medicare-certified home health agency based in Van Nuys. We
              believe great medical care shouldn't require a hospital stay. Our clinicians bring skilled nursing,
              rehabilitation therapy, personal care and medical supplies straight to your front door.
            </p>
            <p>
              Every care plan is built around you — your diagnosis, your home, your family and your doctor's guidance.
              We stay in close contact with your physician so your recovery keeps moving forward.
            </p>
          </div>
          <ul data-reveal data-reveal-delay="0.18" className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["Your doctor leads", "Every visit follows your physician's plan of care."],
              ["We come to you", "Nurses, therapists and aides at your door."],
              ["One connected team", "Nursing, therapy and supplies, coordinated."],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 border-gold pl-4">
                <p className="font-semibold text-forest">{t}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-moss">{d}</p>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-10">
            <Link to="/about" className="link-arrow">
              More about Royal Home Health Care <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </p>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:mt-16">
          <div data-reveal data-reveal-delay="0.1">
            <SmartImage
              src={media.companionship}
              alt="A smiling caregiver leans toward a laughing older man as they hold hands in a sunlit living room."
              width={720}
              height={900}
              className="aspect-[4/5] rounded-[1.75rem]"
              imgClassName="transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <figure
            data-reveal
            data-reveal-delay="0.2"
            className="on-dark animate-float-gentle absolute -bottom-10 -left-4 max-w-[17rem] rounded-2xl border border-white/15 bg-forest p-6 text-cream shadow-[0_24px_60px_-20px_rgb(var(--forest-ink-rgb)/0.55)] sm:-left-12"
          >
            <blockquote className="font-serif-display text-2xl leading-snug">
              “{site.taglineAlt}.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-cream/85">Our promise to every family</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
