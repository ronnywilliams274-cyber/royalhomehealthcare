"use server";

export type ReferralState = { ok: boolean; error: string | null };

const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export async function submitReferral(
  _prev: ReferralState,
  formData: FormData
): Promise<ReferralState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const whoFor = String(formData.get("whoFor") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const preferredTime = String(formData.get("preferredTime") ?? "").trim();

  if (!name || !phone || !whoFor) {
    return { ok: false, error: "Please fill in your name, phone number, and who this is for." };
  }
  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: "That phone number doesn't look right. Please check it." };
  }
  if (name.length > 120 || message.length > 2000) {
    return { ok: false, error: "Please shorten your entry and try again." };
  }

  const payload = { name, phone, whoFor, message, preferredTime, submittedAt: new Date().toISOString() };
  const webhook = process.env.REFERRAL_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch {
      return { ok: false, error: "Something went wrong sending your request. Please call us instead." };
    }
  } else {
    // No webhook configured: validate-and-log so the form still works in dev.
    console.log("[referral]", JSON.stringify(payload));
  }

  return { ok: true, error: null };
}
