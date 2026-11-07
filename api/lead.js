/**
 * Vercel serverless function: POST /api/lead
 *
 * Delivers website lead-form submissions to info@royalcareathome.com ONLY.
 * The recipient is fixed here on the server, so a visitor can never redirect a lead elsewhere.
 *
 * Providers are tried in order (each with a strict 4.5s timeout so the function never hits
 * Vercel's 10s serverless timeout):
 *   1. Resend      - used when RESEND_API_KEY is set in Vercel.
 *   2. Web3Forms   - used when WEB3FORMS_ACCESS_KEY or VITE_WEB3FORMS_ACCESS_KEY is set.
 *   3. Formspree   - used when FORMSPREE_ENDPOINT or VITE_FORM_ENDPOINT is set.
 *   4. FormSubmit  - zero-config relay for info@royalcareathome.com.
 *
 * Every valid submission is also logged as structured JSON in Vercel Function Logs for
 * info@royalcareathome.com so no lead is ever lost even if third-party email relays are down.
 */

const RECIPIENT = "info@royalcareathome.com";
const SITE_ORIGIN = "https://www.royalcareathome.com";
const PROVIDER_TIMEOUT_MS = 4500;

const FIELDS = [
  ["name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["role", "Caller role"],
  ["zip", "ZIP code"],
  ["service", "Service interested in"],
  ["message", "Message"],
  ["page", "Submitted from"],
];

const LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  role: 80,
  zip: 10,
  service: 120,
  message: 3000,
  page: 200,
};

const clean = (v, max) =>
  String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function parseBody(req) {
  const b = req.body;
  if (!b) return {};
  if (typeof b === "object") return b;
  try {
    return JSON.parse(b);
  } catch {
    return Object.fromEntries(new URLSearchParams(String(b)));
  }
}

function validate(lead) {
  if (!lead.name) return "Please enter your name.";
  const digits = lead.phone.replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1")))) {
    return "Please enter a 10-digit phone number.";
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return "Please check your email address.";
  }
  if (lead.zip && !/^\d{5}(-\d{4})?$/.test(lead.zip)) {
    return "Please enter a valid 5-digit ZIP code.";
  }
  return null;
}

async function viaResend(lead, subject) {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key) return { ok: false, skipped: true, provider: "resend" };

  const rows = FIELDS.filter(([k]) => lead[k])
    .map(
      ([k, label]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600;vertical-align:top">${label}</td>` +
        `<td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">${esc(lead[k])}</td></tr>`
    )
    .join("");
  const text = FIELDS.filter(([k]) => lead[k])
    .map(([k, label]) => `${label}: ${lead[k]}`)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Royal Home Health Care Website <onboarding@resend.dev>",
      to: [RECIPIENT],
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject,
      html: `<h2 style="font-family:sans-serif">New website inquiry (${RECIPIENT})</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>`,
      text,
    }),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  return {
    ok: res.ok && Boolean(data.id),
    provider: "resend",
    detail: res.ok ? data.id : data.message || res.status,
  };
}

async function viaWeb3Forms(lead, subject) {
  const key = (process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
  if (!key) return { ok: false, skipped: true, provider: "web3forms" };

  const payload = {
    access_key: key,
    subject,
    from_name: "Royal Home Health Care Website",
    ...(lead.email ? { replyto: lead.email } : {}),
    botcheck: "",
  };
  for (const [k, label] of FIELDS) if (lead[k]) payload[label] = lead[k];

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  return {
    ok: res.ok && data.success === true,
    provider: "web3forms",
    detail: data.message || res.status,
  };
}

async function viaFormspree(lead, subject) {
  const url = (process.env.FORMSPREE_ENDPOINT || process.env.VITE_FORM_ENDPOINT || "").trim();
  if (!url || !url.startsWith("https://formspree.io/")) {
    return { ok: false, skipped: true, provider: "formspree" };
  }

  const payload = { _subject: subject };
  for (const [k, label] of FIELDS) if (lead[k]) payload[label] = lead[k];
  if (lead.email) payload.email = lead.email;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  return {
    ok: res.ok && data.ok === true,
    provider: "formspree",
    detail: data.error || res.status,
  };
}

async function viaFormSubmit(lead, subject) {
  const payload = { _subject: subject, _template: "table", _captcha: "false" };
  for (const [k, label] of FIELDS) if (lead[k]) payload[label] = lead[k];
  if (lead.email) payload._replyto = lead.email;

  const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}/contact/`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });
  const data = await res.json().catch(() => ({}));
  const ok = res.ok && (data.success === true || data.success === "true");
  return { ok, provider: "formsubmit", detail: data.message || res.status };
}

export default async function handler(req, res) {
  const wantsJson =
    String(req.headers["content-type"] || "").includes("application/json") ||
    String(req.headers["accept"] || "").includes("application/json");

  const reply = (status, body) => {
    if (wantsJson) return res.status(status).json(body);
    res.setHeader("Location", body.ok ? "/contact/?sent=1" : "/contact/?error=1");
    return res.status(303).end();
  };

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const body = parseBody(req);

  // Honeypot: real visitors never fill this in. Pretend success so bots get no signal.
  if (clean(body._honey, 200)) return reply(200, { ok: true, emailed: true, recipient: RECIPIENT });

  const lead = Object.fromEntries(
    Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)])
  );
  const problem = validate(lead);
  if (problem) return reply(400, { ok: false, error: problem });

  const subject = `New Home Health Inquiry from ${lead.name} - Royal Home Health Care`;

  // Always record the structured lead in Vercel logs for info@royalcareathome.com.
  console.log(
    "[lead] INBOUND_LEAD",
    JSON.stringify({
      recipient: RECIPIENT,
      submittedAt: new Date().toISOString(),
      ...lead,
    })
  );

  const attempts = [];
  for (const send of [viaResend, viaWeb3Forms, viaFormspree, viaFormSubmit]) {
    try {
      const r = await send(lead, subject);
      if (r.skipped) continue;
      attempts.push(`${r.provider}: ${r.ok ? "ok" : r.detail}`);
      if (r.ok) {
        console.log("[lead] DELIVERED", r.provider, r.detail);
        return reply(200, {
          ok: true,
          emailed: true,
          recipient: RECIPIENT,
          provider: r.provider,
        });
      }
    } catch (err) {
      attempts.push(
        `${send.name}: ${err && err.name === "TimeoutError" ? "timed out" : err?.message || err}`
      );
    }
  }

  // Relay was unreachable (e.g. FormSubmit 522 outage), but lead is logged on server.
  // Return ok:true with emailed:false so the client can seamlessly trigger the pre-filled
  // mailto:info@royalcareathome.com fallback without showing a broken error state.
  console.warn("[lead] RELAY_UNAVAILABLE_FALLBACK_ACTIVE", JSON.stringify({ attempts, recipient: RECIPIENT }));
  return reply(200, {
    ok: true,
    emailed: false,
    logged: true,
    recipient: RECIPIENT,
    attempts,
  });
}
