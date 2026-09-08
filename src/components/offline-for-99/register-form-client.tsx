"use client";

import { useState } from "react";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-lg border-0 bg-white/90 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-white";

type Status = "idle" | "pending" | "success" | "error";

export function OfflineFor99RegisterFormClient({
  heading,
  formHeading,
  registrationTypes,
  states,
}: {
  heading: string;
  formHeading: string;
  registrationTypes: string[];
  states: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("pending");
    try {
      const res = await fetch("/api/offline-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="register" className="bg-brand-orange px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal effect="A" as="h2" className="text-4xl font-bold text-white sm:text-5xl">
          {heading}
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-10 rounded-2xl bg-white/10 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">{formHeading}</h3>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="text" name="name" placeholder="Name" className={FIELD_CLASS} />
              <input required type="email" name="email" placeholder="Email Address" className={FIELD_CLASS} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="tel" name="phone" placeholder="Phone" className={FIELD_CLASS} />
              <select required name="registrationType" defaultValue="" className={FIELD_CLASS}>
                <option value="" disabled>
                  Registration type
                </option>
                {registrationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <select required name="state" defaultValue="" className={cn(FIELD_CLASS, "sm:w-1/2")}>
              <option value="" disabled>
                Your State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <textarea name="message" placeholder="Message" rows={5} className={FIELD_CLASS} />

            <button
              type="submit"
              disabled={status === "pending"}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90 disabled:opacity-60"
            >
              {status === "pending" ? "Sending…" : "Submit"}
            </button>

            {status === "success" && <p className="text-sm font-medium text-white">Thanks — you&rsquo;re registered.</p>}
            {status === "error" && (
              <p className="text-sm font-medium text-red-200">Something went wrong — please try again.</p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
