"use client";

import { useActionState } from "react";
import { submitReferral, type ReferralState } from "@/app/actions/referral";
import { site } from "@/content/site";

const initial: ReferralState = { ok: false, error: null };

const inputClass =
  "w-full min-h-12 rounded-2xl border border-ink/20 bg-white px-4 text-ink placeholder:text-ink/40 focus:border-gold-700";

export function ReferralForm() {
  const [state, formAction, pending] = useActionState(submitReferral, initial);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-gold-700/30 bg-gold-300/20 p-8 text-ink"
      >
        <h3 className="font-display text-2xl font-medium">Thank you.</h3>
        <p className="mt-3">
          Your request has been received. For anything urgent, please call{" "}
          <a href={site.contact.phoneHref} className="font-medium text-gold-700 underline underline-offset-4">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-3xl border border-ink/10 bg-white p-8" aria-describedby="form-notice">
      <div className="grid gap-5">
        <div>
          <label htmlFor="rf-name" className="mb-1.5 block font-medium text-ink">
            Your name
          </label>
          <input id="rf-name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rf-phone" className="mb-1.5 block font-medium text-ink">
            Phone number
          </label>
          <input id="rf-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rf-who" className="mb-1.5 block font-medium text-ink">
            Who is this for?
          </label>
          <select id="rf-who" name="whoFor" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Myself</option>
            <option>A family member</option>
            <option>A friend</option>
            <option>A patient (physician / provider)</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="rf-help" className="mb-1.5 block font-medium text-ink">
            How can we help?
          </label>
          <textarea
            id="rf-help"
            name="message"
            rows={4}
            className={inputClass}
            placeholder="Briefly tell us what kind of care you're looking for."
          />
        </div>
        <div>
          <label htmlFor="rf-time" className="mb-1.5 block font-medium text-ink">
            Preferred contact time
          </label>
          <select id="rf-time" name="preferredTime" className={inputClass} defaultValue="Any time">
            <option>Any time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        {state.error && (
          <p role="alert" className="rounded-2xl border border-red-700/40 bg-red-50 p-4 text-red-800">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-full bg-gold-500 px-8 font-medium text-ink transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send referral request"}
        </button>

        <p id="form-notice" className="text-sm text-ink/60">
          {site.formNotice} Submitting this form is not a guarantee of coverage
          or admission. We never sell your information.
        </p>
      </div>
    </form>
  );
}
