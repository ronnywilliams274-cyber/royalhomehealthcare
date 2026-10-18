import { Link } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/** Always-available call / request bar on phones. The footer reserves space so it never covers content. */
export default function MobileCallBar() {
  return (
    <div
      className="on-dark no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-forest-ink/90 px-3 py-2.5 shadow-[0_-12px_32px_-12px_rgb(var(--forest-ink-rgb)/0.45)] backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a href={site.phoneHref} className="btn btn-gold !min-h-[2.875rem] !px-3 text-sm">
          <span className="animate-pulse-ring relative flex h-6 w-6 items-center justify-center rounded-full bg-forest-ink/15">
            <Icon name="Phone" className="h-3.5 w-3.5" />
          </span>
          Call now
        </a>
        <Link to="/contact" className="btn btn-outline-light !min-h-[2.875rem] !px-3 text-sm">
          Request care
        </Link>
      </div>
    </div>
  );
}
