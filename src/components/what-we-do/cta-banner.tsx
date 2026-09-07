import Image from "next/image";
import { Reveal } from "@/registry/lib/motion-variants";
import { getWhatWeDoContent } from "@/lib/content/what-we-do";
import { renderHighlighted } from "@/lib/highlight";

export async function WhatWeDoCta() {
  const { ctaBanner } = await getWhatWeDoContent();
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <Image src={ctaBanner.backgroundImage} alt="" fill sizes="100vw" className="object-cover object-top" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal effect="A" as="h2" className="text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
          {ctaBanner.lines.map((line, i) => (
            <span className="block" key={i}>
              {renderHighlighted(line.text, line.highlightWords)}
            </span>
          ))}
        </Reveal>

        <Reveal effect="A" as="div" className="mt-8">
          <a
            href={ctaBanner.ctaHref}
            className="inline-flex items-center rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange/90"
          >
            {ctaBanner.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
