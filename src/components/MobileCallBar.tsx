import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

/**
 * Always-available call / request bar on phones. The footer reserves space so it never covers content.
 * It slides away while the visitor is typing in a form (so it never sits on top of the on-screen
 * keyboard or the field being filled in). On the contact page it offers email instead of a link
 * back to the same page.
 * Solid background (no blur filter) keeps scrolling smooth on low-end phones.
 */
export default function MobileCallBar() {
  const { pathname } = useLocation();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select, [contenteditable='true']");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && !isField(e.relatedTarget) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const onContact = pathname.replace(/\/+$/, "") === "/contact";

  return (
    <div
      className={`on-dark no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-forest-ink px-3 py-2.5 shadow-[0_-12px_32px_-12px_rgb(var(--forest-ink-rgb)/0.45)] transition-transform duration-200 md:hidden ${
        typing ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      aria-hidden={typing || undefined}
      inert={typing || undefined}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a href={site.phoneHref} className="btn btn-gold !min-h-[2.875rem] !px-3 text-sm">
          <Icon name="Phone" className="h-4 w-4" />
          Call now
        </a>
        {onContact ? (
          <a href={site.emailHref} className="btn btn-outline-light !min-h-[2.875rem] !px-3 text-sm">
            <Icon name="Mail" className="h-4 w-4" />
            Email us
          </a>
        ) : (
          <Link to="/contact" className="btn btn-outline-light !min-h-[2.875rem] !px-3 text-sm">
            Request care
          </Link>
        )}
      </div>
    </div>
  );
}
