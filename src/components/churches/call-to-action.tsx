"use client";

import Script from "next/script";
import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "Will you answer the call?" — the $99/week vs $99/month framing plus the
 * live page's embedded donation form. That form is Little Green Light's
 * hosted form engine (LGL Forms), not Raisely (the /donate page's
 * embed) — a different giving product for a church-specific ask. Same
 * "don't build someone else's checkout" call as the Donate page: this is
 * LGL's own iframe, injected by their own form-specific loader script into
 * the target div below (`{formId}-top`), exactly matching the live page's
 * markup rather than us guessing at LGL's internal iframe structure.
 */
const LGL_FORM_ID = "22QylqlNw7D4p-6Xvzlclg";

export function ChurchesCallToAction() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-brand-green sm:text-4xl">
          Will you answer the call?
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-3 text-zinc-600">
          There are <span className="font-semibold text-brand-orange">two simple ways</span> to answer the call:
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-8 rounded-2xl bg-[#e8e1d0] px-8 py-10">
          <p className="text-2xl font-semibold text-zinc-950 sm:text-3xl">
            <span className="text-brand-orange">$99</span>/week = <span className="text-brand-orange">$5,148</span>
            /year
          </p>
          <p className="mt-3 text-2xl font-semibold text-zinc-950 sm:text-3xl">
            <span className="text-brand-orange">$99</span>/month = <span className="text-brand-orange">$1,188</span>
            /year
          </p>
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-12 text-left">
          <div id={`${LGL_FORM_ID}-top`} />
          <Script src={`https://secure.lglforms.com/form_engine/s/${LGL_FORM_ID}.js`} strategy="afterInteractive" />
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-16">
          <h3 className="text-2xl font-semibold text-brand-orange">We can do this TOGETHER.</h3>
          <p className="mt-2 text-zinc-600">
            Would you consider supporting <span className="font-semibold text-brand-orange">Ninetynine41</span>?
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
