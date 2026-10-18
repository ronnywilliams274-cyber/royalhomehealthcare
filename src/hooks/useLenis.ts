import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionOff } from "./useMotion";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Smooth scrolling - only when the visitor hasn't asked for reduced motion. */
export function useLenis() {
  const motionOff = useMotionOff();

  useEffect(() => {
    if (motionOff) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [motionOff]);
}

/** Jump to the top of the page instantly (used on route changes). */
export function scrollToTopInstant() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/** Scroll an element into view, respecting smooth scrolling when it's on. */
export function scrollToElement(el: HTMLElement) {
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ block: "start" });
}

export { gsap, ScrollTrigger };
