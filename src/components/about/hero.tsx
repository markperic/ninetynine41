import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal, StaggerGroup } from "@/registry/lib/motion-variants";

/**
 * About page hero — same full-bleed cliff photo and INSTAGRAM/FACEBOOK edge
 * labels as the homepage hero (src/components/home/hero.tsx), but with the
 * About page's own headline/CTA, plus the bottom-right EMAIL block the live
 * About page shows that the homepage hero doesn't. Kept as its own file
 * rather than parametrizing the homepage Hero — same call this repo already
 * made for every other home/* section, each is real content per page, not a
 * shared component with content props.
 *
 * Background video (Hero-Video.mp4) rather than a static photo — same
 * animated cliff shot as the homepage hero, autoplaying/muted/looped, with
 * a `motion-reduce:` swap back to the plain photo. See home/hero.tsx's
 * comment for the full rationale; not repeated here.
 */
export function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col overflow-hidden bg-brand-green pr-6 pl-8 sm:pl-16 xl:pl-6 pt-[calc(var(--page-chrome)+1.5rem)] pb-10">
      <Image src="/brand/hero-cliff.jpg" alt="" fill priority className="hidden object-cover motion-reduce:block" />
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/hero-cliff.jpg"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/images/Hero-Video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        INSTAGRAM
      </div>
      <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        FACEBOOK
      </div>

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal effect="M" as="h1" className="max-w-2xl text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
            About Ninetynine41
          </Reveal>

          <StaggerGroup className="mt-6 flex flex-col gap-6">
            <Reveal effect="A" as="p" className="max-w-md text-base text-white/80 sm:text-lg">
              <span className="font-semibold text-brand-orange">Ninetynine41</span> fund, deliver and sustain
              specific community projects, bringing hope and dignity to those who need it most.
            </Reveal>

            <Reveal effect="A" as="div">
              <a
                href="#stats"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
              >
                Our Impact
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </StaggerGroup>
        </div>
      </div>

      <Reveal effect="A" as="div" className="relative mx-auto flex w-full max-w-6xl justify-end border-t border-white/15 pt-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-white/70" />
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-white/60">EMAIL</p>
            <p className="text-sm text-white">info@ninetynine41.org</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
