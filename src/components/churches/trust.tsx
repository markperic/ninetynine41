import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "Built on trust. Proven through action." — a plain heading here, not the
 * homepage's giant scroll-scrubbed statement (BigStatement); this page
 * reuses the line as a short section title, not the hero-scale effect.
 */
export function ChurchesTrust() {
  return (
    <>
      <section className="bg-brand-green px-6 py-16">
        <ScrollReveal effect="B" as="h2" className="mx-auto max-w-2xl text-center text-2xl font-semibold text-brand-orange sm:text-3xl">
          Built on trust. Proven through action.
        </ScrollReveal>
      </section>

      <section className="bg-[#e8e1d0] px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-3xl text-center text-zinc-700">
          <span className="font-semibold text-brand-orange">Ninetynine41</span> chooses projects based on requests,
          reports and information provided to us by Global Development Group. Projects are assessed for their
          suitability, sustainability and maintainability. Ninetynine41 is committed to taking on only the
          projects we can see through to completion. Projects are monitored by GDG Project Officers through
          preliminary stages, during roll-out and beyond completion.
        </ScrollReveal>
      </section>
    </>
  );
}
