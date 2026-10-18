import { Link } from "react-router";
import { faqGroups } from "@/data/faqs";
import { FaqList } from "@/components/Shared";
import { Icon } from "@/components/Icon";

const pick = [
  "How do I know if I qualify?",
  "What will I pay with Medicare?",
  "What does “homebound” mean?",
  "Do you provide 24-hour or live-in care?",
  "Who can refer me to Royal Home Health Care?",
];

export default function FaqPreview() {
  const all = faqGroups.flatMap((g) => g.items);
  const items = pick.map((q) => all.find((f) => f.q === q)).filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section aria-labelledby="faq-title" className="bg-linen">
      <div className="container-royal section grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow mb-5 text-gold-ink">
            Questions, answered
          </p>
          <h2 id="faq-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
            What families ask us most.
          </h2>
          <p data-reveal className="mt-8">
            <Link to="/faq" className="link-arrow">
              See all FAQs <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </p>
        </div>
        <div data-reveal data-reveal-delay="0.1" className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
