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
      const imgWraps = gsap.utils.toArray<HTMLElement>("[data-image-reveal]");

      if (motionOff) {
        gsap.set(els, { clearProps: "opacity,transform" });
        return;
      }

      els.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 26, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 91%", once: true },
          }
        );
      });

      // Editorial image zoom-out reveal on both mobile and desktop
      imgWraps.forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.25,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
          }
        );
      });

      // Mobile-specific scroll highlight for cards and process steps
      const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
      if (isMobileViewport) {
        gsap.utils.toArray<HTMLElement>("[data-mobile-card]").forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 68%",
            end: "bottom 32%",
            toggleClass: { targets: card, className: "mobile-card-active" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-mobile-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            end: "bottom 35%",
            toggleClass: { targets: step, className: "mobile-step-active" },
          });
        });
      }
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
