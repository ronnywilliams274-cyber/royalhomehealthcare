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
            A care team that comes to you, because there is no place like home to heal.
          </h2>
          <div data-reveal data-reveal-delay="0.12" className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-charcoal/90">
            <p>
              Royal Home Health Care, Inc. is a licensed, Medicare-certified home health agency right here in Van Nuys. We believe getting great medical care should not mean sitting in traffic or staying in a hospital room longer than you have to. Our nurses, therapists, and aides bring attentive care and medical supplies straight to your front door.
            </p>
            <p>
              Every care plan is shaped around your real life, including your health needs, your daily routine, your family, and your doctor's recommendations. We stay in close touch with your physician so everyone is working together toward your recovery.
            </p>
          </div>
          <ul data-reveal data-reveal-delay="0.18" className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["Your doctor leads", "Every visit follows the care plan signed by your physician."],
              ["We come to you", "Nurses, therapists, and aides visit you in your own home."],
              ["One connected team", "Nursing, therapy, and supplies coordinated under one roof."],
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

        <div className="lg:col-span-5 lg:col-start-8 lg:mt-16 lg:self-start">
          <div data-reveal data-reveal-delay="0.1" className="relative">
            <SmartImage
              src={media.companionship}
              alt="A compassionate female nurse in navy scrubs sitting beside a smiling older gentleman on a sofa reviewing a care plan folder."
              width={720}
              height={900}
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[4/3] lg:aspect-[4/5]"
              imgClassName="transition-transform duration-700 hover:scale-[1.03]"
            />
            {/* Sits on the photo (bottom-left), never hanging outside it */}
            <figure className="on-dark absolute bottom-4 left-4 right-4 max-w-[17rem] rounded-2xl border border-white/15 bg-forest/95 p-5 text-cream shadow-[0_24px_60px_-20px_rgb(var(--forest-ink-rgb)/0.55)] sm:bottom-6 sm:left-6 sm:p-6">
              <blockquote className="font-serif-display text-xl leading-snug sm:text-2xl">
                “{site.taglineAlt}.”
              </blockquote>
              <figcaption className="mt-2 text-sm text-cream/85 sm:mt-3">Our promise to every family</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
