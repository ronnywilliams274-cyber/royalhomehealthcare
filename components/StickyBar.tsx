"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function StickyBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("referral");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-ivory/10 bg-dusk/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href={site.contact.phoneHref}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold-500 font-medium text-ink"
      >
        Call Now
      </a>
      <a
        href="#referral"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold-300/60 font-medium text-gold-300"
      >
        Request Referral
      </a>
    </div>
  );
}
