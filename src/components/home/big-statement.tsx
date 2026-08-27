import { ScrollWordHighlight } from "@/registry/lib/motion-variants";

/**
 * Giant-type scroll statement, straight after the hero — the "editorial
 * big-type" moment referenced from i-d.co/spotlight. Each line is its own
 * element, independently sized in `vw` so it fills ~90-95% of the viewport
 * width at any screen size (the reference site does the same thing: every
 * line has its own font-size, not one size for the whole block, because a
 * uniform size would leave short lines like "Trust" tiny relative to long
 * ones like "Proven through"). `vw` was picked per line as
 * targetWidthFraction / (charCount * averageAdvanceWidth), then corrected
 * against the actual rendered width in the browser — see the values below,
 * each is a measured fit, not a guess.
 *
 * Word-by-word scroll reveal is Effect L (motion-variants.tsx). The visible
 * lines are aria-hidden fragments of one real, screen-reader-facing
 * sentence on the wrapping <h2>.
 */
const LINES: { text: string; vw: number; highlight?: string[] }[] = [
  { text: "Built on", vw: 20 },
  { text: "Trust", vw: 29, highlight: ["trust"] },
  { text: "Proven through", vw: 10.3 },
  { text: "ACTION.", vw: 23, highlight: ["action"] },
];

export function BigStatement() {
  return (
    <section className="overflow-hidden bg-brand-green py-20 sm:py-28">
      <h2 aria-label="Built on trust. Proven through action." className="px-[3vw]">
        {LINES.map((line) => (
          <div key={line.text} aria-hidden="true" style={{ fontSize: `${line.vw}vw` }} className="leading-[0.92]">
            <ScrollWordHighlight
              as="span"
              className="block font-display font-bold tracking-tight whitespace-nowrap text-white uppercase"
              highlight={line.highlight}
              highlightClassName="text-brand-orange"
            >
              {line.text}
            </ScrollWordHighlight>
          </div>
        ))}
      </h2>
    </section>
  );
}
