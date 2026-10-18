import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./useLenis";
import { useMotionOff } from "./useMotion";

/**
 * GSAP ScrollTrigger reveals for every [data-reveal] element inside the returned ref.
 * Re-runs whenever `key` changes (pass the current pathname).
 *
 * Accessibility: content is never hidden from screen readers, reveals are skipped when
 * motion is off, and an element that receives keyboard focus is revealed immediately.
 */
export function useScrollAnimations<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const motionOff = useMotionOff();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (motionOff) {
        gsap.set(els, { clearProps: "opacity,transform" });
        return;
      }
      els.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, root);

    // A keyboard user tabbing into not-yet-revealed content sees it at once.
    const onFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-reveal]");
      if (target && getComputedStyle(target).opacity !== "1") {
        gsap.to(target, { opacity: 1, y: 0, duration: 0.2, overwrite: true });
      }
    };
    root.addEventListener("focusin", onFocusIn);

    // Layout can shift once fonts/images load.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      root.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [key, motionOff]);

  return ref;
}
