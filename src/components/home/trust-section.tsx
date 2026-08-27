import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * Orange band with a centered white card, matching the live site — the
 * headline that used to sit here ("Built on trust. Proven through action.")
 * now opens the page as its own giant-type moment (see BigStatement,
 * rendered right after the hero), so this card starts straight into the
 * supporting copy instead of repeating it. The two pills below the copy
 * link out to Projects and What We Do rather than functioning as tabs
 * (that's what they do on the current WordPress site too — no content
 * actually swaps beneath them).
 */
export function TrustSection() {
  return (
    <section className="bg-brand-orange px-6 py-20">
      <ScrollReveal
        effect="A"
        as="div"
        className="mx-auto max-w-4xl rounded-3xl bg-white px-8 py-14 text-center shadow-xl sm:px-16"
      >
        <p className="mx-auto max-w-2xl text-balance text-zinc-600">
          <span className="font-semibold text-brand-orange">Ninetynine41</span> fund, deliver and sustain
          real-world change through specific community projects, helping the world&rsquo;s poorest people.{" "}
          <span className="font-semibold text-brand-orange">Ninetynine41</span> has the background,
          infrastructure and on-the-ground intel to bridge the gap between challenge and solution. We don&rsquo;t
          take over; we strengthen what exists. We trust local knowledge and trust the process. We see each
          project through to completion.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/projects"
            className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90"
          >
            Current Projects
          </a>
          <a
            href="/what-we-do"
            className="rounded-full bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-200"
          >
            What We Do
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
