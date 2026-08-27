import { GiantLineFan } from "@/registry/lib/motion-variants";

/**
 * Giant-type scroll statement, straight after the hero. Each line is its
 * own element, independently sized in `vw` so it fills ~90-95% of the
 * viewport width at any screen size — a uniform size for the whole block
 * would leave short lines like "Trust" tiny relative to long ones like
 * "Proven through", so each line's vw was picked from its character count
 * then corrected against actual measured render width in the browser
 * (94% fill confirmed at both 1440px and 390px via scrollWidth).
 *
 * Fan-out-from-center reveal is Effect L (motion-variants.tsx), scrubbed
 * directly off scroll position — reverses automatically scrolling back up.
 *
 * Placeholder copy for now per the client brief — swap when the real
 * statement is decided.
 */
export function BigStatement() {
  return (
    <section className="overflow-hidden bg-brand-green py-10 sm:py-14">
      <h2 aria-label="Built on trust. Proven through action." className="px-[3vw]">
        <GiantLineFan
          className="leading-[0.85]"
          lineClassName="block text-center font-display font-bold tracking-tight whitespace-nowrap text-white uppercase"
          highlightClassName="text-brand-orange"
          lines={[
            { text: "Built on", style: { fontSize: "20vw" } },
            { text: "Trust", style: { fontSize: "29vw" }, highlight: ["trust"] },
            { text: "Proven through", style: { fontSize: "10.3vw" } },
            { text: "ACTION.", style: { fontSize: "23vw" }, highlight: ["action"] },
          ]}
        />
      </h2>
    </section>
  );
}
