"use client";

import { ScrollReveal } from "@/registry/lib/motion-variants";
import { cn } from "@/lib/utils";

const REGISTRATION_TYPES = ["Individual", "School", "Church", "Organisation"];
const STATES = ["QLD", "NSW", "VIC", "ACT", "SA", "WA", "NT", "TAS"];

const FIELD_CLASS =
  "w-full rounded-lg border-0 bg-white/90 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-white";

/**
 * "I Want In — Register Your Interest" — the live page's lead-capture
 * form (Name, Email, Phone, Registration type, State, Message). No backend
 * wired up yet, so this is UI only — `onSubmit` just prevents the native
 * GET navigation; swap for a real handler once there's somewhere to send it.
 */
export function OfflineFor99RegisterForm() {
  return (
    <section id="register" className="bg-brand-orange px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal effect="A" as="h2" className="text-4xl font-bold text-white sm:text-5xl">
          I Want In
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-10 rounded-2xl bg-white/10 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">Register Your Interest</h3>

          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="text" name="name" placeholder="Name" className={FIELD_CLASS} />
              <input type="email" name="email" placeholder="Email Address" className={FIELD_CLASS} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="tel" name="phone" placeholder="Phone" className={FIELD_CLASS} />
              <select name="registrationType" defaultValue="" className={FIELD_CLASS}>
                <option value="" disabled>
                  Registration type
                </option>
                {REGISTRATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <select name="state" defaultValue="" className={cn(FIELD_CLASS, "sm:w-1/2")}>
              <option value="" disabled>
                Your State
              </option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <textarea name="message" placeholder="Message" rows={5} className={FIELD_CLASS} />

            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90"
            >
              Submit
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
