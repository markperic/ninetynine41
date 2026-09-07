"use client";

import { ScrollReveal } from "@/registry/lib/motion-variants";

const FIELD_CLASS =
  "w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-brand-orange";

export function ContactFormClient({
  heading,
  description,
  info,
}: {
  heading: string;
  description: string;
  info: { label: string; value: string }[];
}) {
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
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="text" name="name" placeholder="Name" className={FIELD_CLASS} />
              <input type="email" name="email" placeholder="Email Address" className={FIELD_CLASS} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="tel" name="phone" placeholder="Phone" className={FIELD_CLASS} />
              <input type="text" name="organisation" placeholder="Your Organisation" className={FIELD_CLASS} />
            </div>
            <textarea name="message" placeholder="Tell us about your project" rows={6} className={FIELD_CLASS} />

            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
            >
              Submit
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
