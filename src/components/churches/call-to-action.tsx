import Script from "next/script";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getChurchesContent } from "@/lib/content/churches";

/**
 * "Will you answer the call?" — the $99/week vs $99/month framing plus the
 * live page's embedded donation form. That form is Little Green Light's
 * hosted form engine (LGL Forms), not Raisely (the /donate page's embed).
 * The LGL form ID is editable in Sanity (Churches Page → Call to Action).
 */
export async function ChurchesCallToAction() {
  const { callToAction: cta } = await getChurchesContent();
  const anchorId = `${cta.lglFormId}-top`;

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-brand-green sm:text-4xl">
          {cta.heading}
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-3 text-zinc-600">
          {cta.intro}
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-8 rounded-2xl bg-[#e8e1d0] px-8 py-10">
          <p className="text-2xl font-semibold text-zinc-950 sm:text-3xl">
            <span className="text-brand-orange">{cta.weeklyAmount}</span> = <span className="text-brand-orange">{cta.weeklyYearly}</span>
          </p>
          <p className="mt-3 text-2xl font-semibold text-zinc-950 sm:text-3xl">
            <span className="text-brand-orange">{cta.monthlyAmount}</span> = <span className="text-brand-orange">{cta.monthlyYearly}</span>
          </p>
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-12 text-left">
          <div id={anchorId} />
          <Script src={`https://secure.lglforms.com/form_engine/s/${cta.lglFormId}.js`} strategy="afterInteractive" />
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-16">
          <h3 className="text-2xl font-semibold text-brand-orange">{cta.closingHeading}</h3>
          <p className="mt-2 text-zinc-600">{cta.closingBody}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
