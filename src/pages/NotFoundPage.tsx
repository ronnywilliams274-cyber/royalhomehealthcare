import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero } from "@/components/Shared";
import { Icon } from "@/components/Icon";

export default function NotFoundPage() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="We couldn't find that page."
      intro={<p>It may have moved, or the address may have a typo. These links can help you find what you need.</p>}
    >
      <Link to="/" className="btn btn-gold">
        <Icon name="House" className="h-4 w-4" /> Go to the home page
      </Link>
      <Link to="/services" className="btn btn-outline-light">
        Browse services
      </Link>
      <a href={site.phoneHref} className="btn btn-outline-light">
        <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
      </a>
    </PageHero>
  );
}
