import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * Two stacked, alternating-background copy bands right under the hero —
 * matches the live page's own rhythm of short centered statements on
 * dark-green then cream.
 */
export function ChurchesIntro() {
  return (
    <>
      <section className="bg-brand-green px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-2xl text-center text-lg text-white">
          Feeling called to make a change but not sure where to start?{" "}
          <span className="font-semibold text-brand-orange">Ninetynine41</span> is your answer.
        </ScrollReveal>
      </section>

      <section className="bg-[#e8e1d0] px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-3xl text-center text-zinc-700">
          <span className="font-semibold text-brand-orange">Ninetynine41</span> fund, deliver and sustain
          real-world change through specific community projects, helping some of the world&rsquo;s poorest people.
          Ninetynine41 is a registered Australian charity with the{" "}
          <span className="font-semibold text-zinc-950">ACNC</span> (The Australian Charities and Not-for-profits
          Commission). Working closely with overarching Australian charity,{" "}
          <span className="font-semibold text-zinc-950">Global Development Group</span>, Ninetynine41 has the
          background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.
        </ScrollReveal>
      </section>
    </>
  );
}
