import { Link } from "react-router";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { CheckList, MedicareBadge } from "@/components/Shared";
import { Icon } from "@/components/Icon";

export const medicareEligibility = [
  "You need part-time or intermittent skilled nursing or rehabilitation therapy",
  "You are considered homebound, meaning leaving home takes a major effort or requires assistance",
  "Your doctor or allowed provider has seen you recently and ordered home health care",
  "Your care is provided by a Medicare-certified agency like Royal Home Health Care",
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
            $0 out of pocket for covered home health visits with Medicare.
          </h2>
          <p data-reveal data-reveal-delay="0.12" className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            Because we are a Medicare-certified agency, Original Medicare pays 100% of the cost for covered home health visits when you qualify. You typically qualify if:
          </p>
          <div data-reveal data-reveal-delay="0.18" className="mt-8">
            <CheckList items={medicareEligibility} dark />
          </div>
          <p data-reveal className="mt-8 text-sm text-cream/85">
            For durable medical equipment like walkers or hospital beds, Medicare typically covers 80% and you pay 20% after the Part B deductible. We also work with Medi-Cal, select private insurance plans, workers' compensation, regional centers, and private pay.
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
              alt="A registered nurse checking the blood pressure and pulse oximetry of a smiling older woman in a sunlit living room."
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
