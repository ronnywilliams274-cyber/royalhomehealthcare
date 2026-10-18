import { Link } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/** Always-available call / request bar on phones. The footer reserves space so it never covers content. */
export default function MobileCallBar() {
  return (
    <div
      className="on-dark no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest-ink/95 px-3 py-2.5 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a href={site.phoneHref} className="btn btn-gold !min-h-[2.875rem] !px-3 text-sm">
          <Icon name="Phone" className="h-4 w-4" />
          Call now
        </a>
        <Link to="/contact" className="btn btn-outline-light !min-h-[2.875rem] !px-3 text-sm">
          Request care
        </Link>
      </div>
    </div>
  );
}
