import { GiantLineFan } from "@/registry/lib/motion-variants";
import { getHomeContent } from "@/lib/content/home";

/** Line sizes tuned so each line fills ~90-95% of the viewport width regardless of character count. */
const LINE_SIZES = ["20vw", "29vw", "10.3vw", "23vw"];

/**
 * Giant-type scroll statement, straight after the hero. Each line is its
 * own element, independently sized in `vw` so it fills ~90-95% of the
 * viewport width at any screen size — a uniform size for the whole block
 * would leave short lines like "Trust" tiny relative to long ones like
 * "Proven through", so each line's vw was picked from its character count
 * then corrected against actual measured render width in the browser
 * (94% fill confirmed at both 1440px and 390px via scrollWidth). Text is
 * editable via Sanity; the four line sizes stay fixed since they're tuned
 * to the current line lengths, not generic.
 *
 * Fan-out-from-center reveal is Effect L (motion-variants.tsx), scrubbed
 * directly off scroll position — reverses automatically scrolling back up.
 */
export async function BigStatement() {
  const { bigStatement } = await getHomeContent();
  const ariaLabel = bigStatement.map((l) => l.text).join(" ");

  return (
    <section className="overflow-hidden bg-brand-green py-10 sm:py-14">
      <h2 aria-label={ariaLabel} className="px-[3vw]">
        <GiantLineFan
          className="leading-[0.85]"
          lineClassName="block text-center font-display font-bold tracking-tight whitespace-nowrap text-white uppercase"
          highlightClassName="text-brand-orange"
          lines={bigStatement.map((line, i) => ({
            text: line.text,
            style: { fontSize: LINE_SIZES[i] ?? "15vw" },
            highlight: line.highlighted ? [line.text.toLowerCase()] : undefined,
          }))}
        />
      </h2>
    </section>
  );
}
