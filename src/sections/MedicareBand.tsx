import { Link } from "react-router";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { CheckList, MedicareBadge } from "@/components/Shared";
import { Icon } from "@/components/Icon";

export const medicareEligibility = [
  "You need part-time or intermittent skilled nursing or therapy",
  "You are homebound — leaving home takes a considerable effort",
  "A doctor or allowed practitioner has seen you and ordered home health care",
  "Your care is provided by a Medicare-certified agency like Royal",
];

export default function MedicareBand() {
  return (
    <section aria-labelledby="medicare-title" className="on-dark relative overflow-hidden bg-forest-deep text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_100%_100%,rgb(var(--gold-rgb)/0.22),transparent_60%),radial-gradient(60%_70%_at_0%_0%,rgb(var(--forest-rgb)/0.5),transparent_60%)]" />
      <div className="container-royal section relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div data-reveal>
            <MedicareBadge dark />
          </div>
          <h2 id="medicare-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 mt-7">
            $0 for covered home health services with Medicare.
          </h2>
          <p data-reveal data-reveal-delay="0.12" className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            As a Medicare-certified agency, we meet federal health and safety standards. If you qualify, Medicare pays for
            covered home health services in full. You may qualify if:
          </p>
          <div data-reveal data-reveal-delay="0.18" className="mt-8">
            <CheckList items={medicareEligibility} dark />
          </div>
          <p data-reveal className="mt-8 text-sm text-cream/85">
            Durable medical equipment is typically 20% of the Medicare-approved amount after the Part B deductible. We also
            work with Medi-Cal, some private insurance, workers' compensation, regional centers and private pay.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <Link to="/medicare-certified" className="btn btn-gold">
              How Medicare home health works <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Check my eligibility
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal data-reveal-delay="0.1">
            <SmartImage
              src={media.nurseVisit}
              alt="A nurse in teal scrubs checks the blood pressure of a smiling older woman resting in a recliner at home."
              width={1080}
              height={720}
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[3/2] lg:aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
