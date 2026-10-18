import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { PageHero } from "@/components/Shared";
import ContactForm from "@/components/ContactForm";
import { ContactDetails } from "@/sections/Contact";
import { Icon } from "@/components/Icon";

/** Office open/closed, computed in Los Angeles time. Rendered only in the browser. */
function useOfficeStatus() {
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const open = day >= 1 && day <= 5 && mins >= 9 * 60 && mins < 17 * 60 + 30;
    setStatus(open ? "Our office is open right now." : "Our office is closed for the day, and our on-call nurse is available by phone.");
  }, []);
  return status;
}

export default function ContactPage() {
  const status = useOfficeStatus();
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk with a real person today."
        intro={<p>Call, fax, email or send a message. We usually reply the same business day.</p>}
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <p className="flex items-center gap-2 text-cream">
              <Icon name="Clock" className="h-5 w-5 text-gold-light" />
              <span>{site.hours.label}</span>
            </p>
            {status && <p className="mt-3 font-semibold text-gold-light">{status}</p>}
            <a href={site.phoneHref} className="btn btn-gold mt-6 w-full">
              <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
        }
      />

      <section aria-label="Contact details and message form" className="bg-cream">
        <div className="container-royal grid gap-14 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="h-display text-h3 text-forest">Reach us directly</h2>
            <ContactDetails dark={false} />
            <p role="note" className="mt-8 flex gap-3 rounded-2xl border-2 border-[#b42318] bg-white p-5 font-semibold text-[#8f1c13]">
              <Icon name="TriangleAlert" className="mt-0.5 h-5 w-5 shrink-0" />
              In a medical emergency, call 911.
            </p>
          </div>
          <div className="card p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
            <ContactForm tone="light" />
          </div>
        </div>
      </section>
    </>
  );
}
