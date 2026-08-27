import { ScrollWordHighlight } from "@/registry/lib/motion-variants";

/**
 * Giant-type scroll statement, straight after the hero — the "editorial
 * big-type" moment referenced from i-d.co/spotlight (large condensed type,
 * revealed word-by-word as it scrolls into view; turns out to be a
 * scroll-triggered reveal on their site, not a continuous scroll scrub — see
 * Effect L in motion-variants.tsx). "Trust" and "action" pick up the brand
 * orange since they're the load-bearing words in this line.
 *
 * Placeholder copy for now per the client brief — swap when the real
 * statement is decided.
 */
export function BigStatement() {
  return (
    <section className="bg-brand-green px-6 py-28 sm:py-40">
      <ScrollWordHighlight
        as="h2"
        className="mx-auto max-w-5xl text-center font-display text-5xl leading-[1.05] font-bold tracking-tight text-white sm:text-7xl"
        highlight={["trust", "action"]}
        highlightClassName="text-brand-orange"
      >
        Built on trust. Proven through action.
      </ScrollWordHighlight>
    </section>
  );
}
