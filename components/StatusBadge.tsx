"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Status = "open" | "oncall";

function computeStatus(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayMap: Record<string, number> = {
    Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0,
  };
  const day = dayMap[get("weekday")] ?? 0;
  const minutes = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  const isOfficeDay = (site.hours.officeDays as readonly number[]).includes(day);
  const isOpen =
    isOfficeDay && minutes >= site.hours.openMinutes && minutes < site.hours.closeMinutes;
  return isOpen ? "open" : "oncall";
}

export function StatusBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus(new Date()));
    const id = setInterval(() => setStatus(computeStatus(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  const label =
    status === "open"
      ? "Office open now"
      : status === "oncall"
        ? "On-call RN available"
        : "Checking hours…";

  return (
    <p
      role="status"
      className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 text-sm text-ivory/90"
    >
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${
          status === "open"
            ? "bg-gold-300"
            : status === "oncall"
              ? "bg-gold-500 pulse-glow"
              : "bg-ivory/40"
        }`}
      />
      {label}
      <a href={site.contact.phoneHref} className="font-medium text-gold-300 underline-offset-4 hover:underline">
        {site.contact.phoneDisplay}
      </a>
    </p>
  );
}
