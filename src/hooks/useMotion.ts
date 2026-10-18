import { useSyncExternalStore } from "react";

/**
 * Motion preference shared across the site.
 * Motion is OFF when the visitor's device asks for reduced motion, or when they
 * switch animations off with the on-site control (remembered on this device).
 * Satisfies WCAG 2.2.2 (Pause, Stop, Hide) and 2.3.3 (Animation from Interactions).
 */
const KEY = "rhhc-motion-off";
const listeners = new Set<() => void>();

function osReduced(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function userOff(): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function isMotionOff(): boolean {
  return osReduced() || userOff();
}

function apply() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("motion-off", userOff());
}

export function setUserMotionOff(off: boolean) {
  try {
    if (off) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — preference lasts for this page view only */
    document.documentElement.classList.toggle("motion-off", off);
  }
  apply();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

/** true when animations should not play. Server render assumes motion is off. */
export function useMotionOff(): boolean {
  return useSyncExternalStore(subscribe, isMotionOff, () => true);
}

/** true only when the *visitor* switched motion off on this site (not the OS setting). */
export function useUserMotionOff(): boolean {
  return useSyncExternalStore(subscribe, userOff, () => false);
}

export function initMotionClass() {
  apply();
}
