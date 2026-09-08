"use client";

import { useState } from "react";
import { ScrollReveal } from "@/registry/lib/motion-variants";

const FIELD_CLASS =
  "w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-brand-orange";

type Status = "idle" | "pending" | "success" | "error";

export function ContactFormClient({
  heading,
  description,
  info,
}: {
  heading: string;
  description: string;
  info: { label: string; value: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("pending");
    try {
      const res = await fetch("/api/contact", {
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
    <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <ScrollReveal effect="A">
            <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">{heading}</h1>
            <p className="mt-4 text-zinc-600">{description}</p>
          </ScrollReveal>

          <ScrollReveal effect="A" as="dl" className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200">
            {info.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <dt className="text-sm font-semibold text-zinc-950">{label}</dt>
                <dd className="text-sm text-zinc-600">{value}</dd>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal effect="A" as="div" className="mt-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="text" name="name" placeholder="Name" className={FIELD_CLASS} />
              <input required type="email" name="email" placeholder="Email Address" className={FIELD_CLASS} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="tel" name="phone" placeholder="Phone" className={FIELD_CLASS} />
              <input type="text" name="organisation" placeholder="Your Organisation" className={FIELD_CLASS} />
            </div>
            <textarea required name="message" placeholder="Tell us about your project" rows={6} className={FIELD_CLASS} />

            <button
              type="submit"
              disabled={status === "pending"}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
            >
              {status === "pending" ? "Sending…" : "Submit"}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-brand-green">Thanks — we&rsquo;ll be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-600">
                Something went wrong sending your message — please try again.
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
