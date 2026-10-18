import { useEffect, useLayoutEffect, useRef } from "react";
import { isMotionOff, useMotionOff } from "./useMotion";

// useLayoutEffect in the browser (runs before paint, so nothing flickers), useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Lightweight scroll reveals for every [data-reveal] element inside the returned ref.
 *
 * Performance: one IntersectionObserver for the whole page and pure CSS transitions on
 * opacity/transform, which run on the GPU compositor. Nothing runs while you scroll (no scroll
 * listeners, no per-frame JavaScript), so it stays smooth on low-end phones.
 *
 * Content is never hidden before this code runs: the page is fully visible as prerendered
 * HTML, then only the parts still *below the fold* are prepared for their reveal
 * (the html.reveal-ready class in index.css).
 *
 * Accessibility: content is never hidden from screen readers; reveals are skipped when motion
 * is off (OS setting or the footer "Reduce motion" switch); anything that receives keyboard
 * focus is shown immediately. Re-runs when `key` (the pathname) changes.
 */
export function useScrollAnimations<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const motionOff = useMotionOff();

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    const reveal = (el: HTMLElement) => el.classList.add("is-revealed");

    // Read the live preference (during hydration the hook value is still the server default).
    if (isMotionOff() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-revealed", "no-anim"));
      return;
    }

    // Anything already on screen (or scrolled past) stays visible without animating.
    // Measure each element's *section* first: sections far below the fold are not laid out yet
    // (content-visibility: auto), and measuring their children would force that work early.
    const vh = window.innerHeight;
    const pending: HTMLElement[] = [];
    const sectionTop = new Map<Element, number>();
    for (const el of els) {
      const sec = el.closest("section") ?? el;
      let top = sectionTop.get(sec);
      if (top === undefined) {
        top = sec.getBoundingClientRect().top;
        sectionTop.set(sec, top);
      }
      if (top > vh) pending.push(el);
      else if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-revealed", "no-anim");
      else pending.push(el);
    }
    document.documentElement.classList.add("reveal-ready");

    // Shorter stagger on small screens so content arrives quickly while scrolling.
    const small = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const delay = Math.min(parseFloat(el.dataset.revealDelay || "0"), 0.3) * (small ? 0.5 : 1);
          if (delay) el.style.transitionDelay = `${delay}s`;
          reveal(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
    pending.forEach((el) => io.observe(el));

    const onFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-reveal]");
      if (target && !target.classList.contains("is-revealed")) {
        target.classList.add("is-revealed", "no-anim");
        io.unobserve(target);
      }
    };
    root.addEventListener("focusin", onFocusIn);

    return () => {
      io.disconnect();
      root.removeEventListener("focusin", onFocusIn);
    };
  }, [key, motionOff]);

  return ref;
}
