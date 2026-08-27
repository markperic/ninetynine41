import Image from "next/image";
import { Reveal } from "@/registry/lib/motion-variants";

export function ImpactCta() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <Image src="/brand/cta-running.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal effect="A" as="h2" className="max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl">
          Bring change to <span className="text-brand-orange">ONE</span>.
          <br />
          Bring change to many.
        </Reveal>

        <Reveal effect="A" as="div" className="mt-8">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-orange/90"
          >
            Let&rsquo;s get to work
          </a>
        </Reveal>
      </div>
    </section>
  );
}
