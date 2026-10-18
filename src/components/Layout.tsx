import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { useLenis, scrollToTopInstant, scrollToElement } from "@/hooks/useLenis";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { getRouteMeta } from "@/routes";

/**
 * Site shell: skip link, header, <main>, footer.
 * Handles the accessibility work a single-page app must do on navigation:
 *  - updates the document title (WCAG 2.4.2)
 *  - moves keyboard focus to the new page's main heading and announces it (WCAG 2.4.3, 4.1.3)
 *  - scrolls to #anchors and focuses them
 */
export default function Layout() {
  const { pathname, hash } = useLocation();
  useLenis();
  const mainRef = useScrollAnimations<HTMLDivElement>(pathname);
  const [announcement, setAnnouncement] = useState("");
  const firstRender = useRef(true);

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = meta.description;

    const isFirst = firstRender.current;
    firstRender.current = false;

    if (hash) {
      // Wait a frame so the target exists, then scroll and move focus to it.
      requestAnimationFrame(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) {
          scrollToElement(el);
          if (!isFirst) focusElement(el);
        }
      });
      return;
    }

    if (isFirst) return; // initial page load: leave focus where the browser puts it

    scrollToTopInstant();
    const heading = document.querySelector<HTMLElement>("main h1");
    focusElement(heading ?? document.getElementById("main"));
    setAnnouncement(`${meta.name} page`);
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <div ref={mainRef}>
        <main id="main" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileCallBar />
      {/* Polite live region announces page changes to screen reader users */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </>
  );
}

function focusElement(el: HTMLElement | null) {
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
