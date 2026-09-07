import Image from "next/image";
import { Reveal, ScrollReveal } from "@/registry/lib/motion-variants";
import { getHomeContent } from "@/lib/content/home";
import { renderHighlighted } from "@/lib/highlight";

export async function ImpactCta() {
  const { impactCta } = await getHomeContent();
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <Image src={impactCta.backgroundImage} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal effect="M" as="h2" className="text-6xl leading-[0.95] font-semibold text-white sm:text-7xl lg:text-8xl">
          {impactCta.lines.map((line, i) => (
            <span className="block whitespace-nowrap" key={i}>
              {renderHighlighted(line.text, line.highlightWords)}
            </span>
          ))}
        </ScrollReveal>

        <Reveal effect="A" as="div" className="mt-8">
          <a
            href={impactCta.ctaHref}
            className="inline-flex items-center rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange/90"
          >
            {impactCta.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
