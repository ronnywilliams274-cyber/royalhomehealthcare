import { useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Icon } from "@/components/Icon";

/**
 * Accessible inquiry form (WCAG 1.3.1, 1.3.5, 3.3.1, 3.3.2, 3.3.3, 4.1.3):
 * visible labels, autocomplete tokens, "(required)" in text, an error summary that
 * receives focus, inline errors tied to fields, and status messages announced politely.
 *
 * Delivery: if VITE_FORM_ENDPOINT is set (e.g. a Formspree URL) the form POSTs JSON there.
 * Otherwise it opens the visitor's email app with the message pre-filled.
 */
type Fields = { name: string; phone: string; email: string; role: string; service: string; zip: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const roles = [
  "Patient",
  "Family member or caregiver",
  "Physician or medical office",
  "Hospital or facility case manager",
  "Other",
];

const endpoint: string =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_FORM_ENDPOINT ?? "";

export default function ContactForm({ tone = "light", heading = "Send us a message" }: { tone?: "light" | "dark"; heading?: string }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [f, setF] = useState<Fields>({ name: "", phone: "", email: "", role: "", service: "", zip: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "sent" | "mailto" | "error"; text?: string }>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  function validate(): Errors {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Enter your name.";
    const digits = f.phone.replace(/\D/g, "");
    if (!digits) e.phone = "Enter a phone number so we can call you back.";
    else if (digits.length < 10) e.phone = "Enter a 10-digit phone number, for example (818) 555-0123.";
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      e.email = "Enter an email address in the format name@example.com, or leave it blank.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const lines: string[] = [`Name: ${f.name}`, `Phone: ${f.phone}`];
    if (f.email) lines.push(`Email: ${f.email}`);
    if (f.role) lines.push(`I am: ${f.role}`);
    if (f.service) lines.push(`Interested in: ${f.service}`);
    if (f.zip) lines.push(`ZIP code: ${f.zip}`);
    if (f.message) lines.push("", f.message);

    if (endpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...f, _subject: `Website inquiry from ${f.name}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ kind: "sent", text: `Thank you, ${f.name.split(" ")[0]}. We received your message and will call you back, usually the same business day.` });
        setF({ name: "", phone: "", email: "", role: "", service: "", zip: "", message: "" });
      } catch {
        setStatus({ kind: "error", text: `Sorry, your message did not go through. Please give us a call at ${site.phone}.` });
      }
      return;
    }

    const subject = encodeURIComponent(`Home health inquiry from ${f.name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `${site.emailHref}?subject=${subject}&body=${body}`;
    setStatus({
      kind: "mailto",
      text: `Your email app should open with your message ready to send. If it didn't open, email ${site.email} or call ${site.phone}.`,
    });
  }

  const errorList = Object.entries(errors) as [keyof Fields, string][];

  const label = `block text-[0.95rem] font-semibold ${dark ? "text-cream" : "text-forest"}`;
  const hint = `mt-1 block text-sm ${dark ? "text-cream/85" : "text-moss"}`;
  const input = (k: keyof Fields) =>
    `mt-2 block w-full rounded-xl border px-4 py-3 text-base transition-colors focus-visible:outline-offset-2 ${
      dark
        ? "border-cream/50 bg-white/[0.06] text-cream placeholder:text-cream/70"
        : "border-[#6d7a68] bg-white text-charcoal placeholder:text-moss"
    } ${errors[k] ? (dark ? "!border-[#ffb4a8]" : "!border-[#b42318]") : ""}`;
  const err = `mt-2 flex items-start gap-1.5 text-sm font-semibold ${dark ? "text-[#ffb4a8]" : "text-[#b42318]"}`;

  const describedBy = (k: keyof Fields, hasHint = false) =>
    [hasHint ? id(`${k}-hint`) : "", errors[k] ? id(`${k}-err`) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={id("title")} className={dark ? "on-dark" : ""}>
      <h2 id={id("title")} className={`font-serif-display text-3xl font-semibold ${dark ? "text-cream" : "text-forest"}`}>
        {heading}
      </h2>
      <p className={`mt-2 text-[0.95rem] ${dark ? "text-cream/85" : "text-moss"}`}>
        Fields marked “required” must be filled in. We usually reply the same business day.
      </p>

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={id("errtitle")}
          className={`mt-6 rounded-xl border-2 p-4 ${dark ? "border-[#ffb4a8] bg-[#ffb4a8]/10" : "border-[#b42318] bg-[#b42318]/[0.06]"}`}
        >
          <p id={id("errtitle")} className={`font-semibold ${dark ? "text-cream" : "text-charcoal"}`}>
            Please fix {errorList.length === 1 ? "1 problem" : `${errorList.length} problems`} before sending:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${id(k)}`} className={`underline ${dark ? "text-[#ffb4a8]" : "text-[#b42318]"}`} onClick={(e) => { e.preventDefault(); document.getElementById(id(k))?.focus(); }}>
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className={label}>
            Full name <span className="font-normal">(required)</span>
          </label>
          <input id={id("name")} name="name" autoComplete="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} value={f.name} onChange={set("name")} className={input("name")} />
          {errors.name && <p id={id("name-err")} className={err}><Icon name="TriangleAlert" className="mt-0.5 h-4 w-4 shrink-0" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone number <span className="font-normal">(required)</span>
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} value={f.phone} onChange={set("phone")} className={input("phone")} />
          {errors.phone && <p id={id("phone-err")} className={err}><Icon name="TriangleAlert" className="mt-0.5 h-4 w-4 shrink-0" />{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={id("email")} className={label}>
            Email <span className="font-normal">(optional)</span>
          </label>
          <input id={id("email")} name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} value={f.email} onChange={set("email")} className={input("email")} />
          {errors.email && <p id={id("email-err")} className={err}><Icon name="TriangleAlert" className="mt-0.5 h-4 w-4 shrink-0" />{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={id("role")} className={label}>
            I am a… <span className="font-normal">(optional)</span>
          </label>
          <select id={id("role")} name="role" value={f.role} onChange={set("role")} className={input("role")}>
            <option value="">Choose one</option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={id("zip")} className={label}>
            ZIP code <span className="font-normal">(optional)</span>
          </label>
          <input id={id("zip")} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={f.zip} onChange={set("zip")} className={input("zip")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className={label}>
            Service you're interested in <span className="font-normal">(optional)</span>
          </label>
          <select id={id("service")} name="service" value={f.service} onChange={set("service")} className={input("service")}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={label}>
            How can we help? <span className="font-normal">(optional)</span>
          </label>
          <span id={id("message-hint")} className={hint}>
            {site.formNotice}
          </span>
          <textarea id={id("message")} name="message" rows={4} aria-describedby={describedBy("message", true)} value={f.message} onChange={set("message")} className={`${input("message")} resize-y`} />
        </div>
      </div>

      <button type="submit" disabled={status.kind === "sending"} className={`btn mt-7 w-full sm:w-auto ${dark ? "btn-gold" : "btn-primary"}`}>
        {status.kind === "sending" ? "Sending…" : "Send message"}
        <Icon name="ArrowRight" className="h-4 w-4" />
      </button>

      <div role="status" aria-live="polite" className="mt-5">
        {status.text && (
          <p className={`flex items-start gap-2 rounded-xl p-4 font-medium ${status.kind === "error" ? (dark ? "bg-[#ffb4a8]/10 text-[#ffb4a8]" : "bg-[#b42318]/[0.06] text-[#b42318]") : dark ? "bg-white/10 text-cream" : "bg-forest/[0.06] text-forest"}`}>
            <Icon name={status.kind === "error" ? "TriangleAlert" : "Check"} className="mt-1 h-4 w-4 shrink-0" />
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
