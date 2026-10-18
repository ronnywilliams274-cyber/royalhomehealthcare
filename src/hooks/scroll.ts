/**
 * Native scrolling helpers.
 * The site uses the browser's own scrolling everywhere (no smooth-scroll library): it is the
 * fastest option on phones, never "lags" behind your finger, and works with every assistive
 * technology, zoom level and input device.
 */

/** Jump to the top of the page instantly (used on page changes). */
export function scrollToTopInstant() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

/** Scroll an element into view, gently when motion is allowed. */
export function scrollToElement(el: HTMLElement) {
  const reduce =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("motion-off");
  el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
}
