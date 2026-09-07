import Image from "next/image";
import { Reveal } from "@/registry/lib/motion-variants";

/**
 * "For the ONE who has no one." closing CTA — photo background
 * (theone-web), top-anchored since the subject sits high in the frame, with
 * a flat black scrim rather than the homepage ImpactCta's gradient — this
 * photo's contrast needs even darkening across the whole frame, not just
 * the bottom where the text sits.
 */
export function WhatWeDoCta() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <Image src="/images/theone-web.jpg" alt="" fill sizes="100vw" className="object-cover object-top" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal effect="A" as="h2" className="text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
          For the <span className="text-brand-orange">ONE</span> who
          <br />
          has no one.
        </Reveal>

        <Reveal effect="A" as="div" className="mt-8">
          <a
            href="/donate"
            className="inline-flex items-center rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange/90"
          >
            Ways to help right now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
