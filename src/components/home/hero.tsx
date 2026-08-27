import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/registry/lib/motion-variants";

/**
 * Homepage hero — full-bleed brief photo, static for now. The client is
 * planning a Lenis-driven scroll treatment for this section separately;
 * this is a faithful, plain rebuild of the current WordPress hero to get
 * the rest of the page moving in the meantime.
 *
 * Top padding clears the fixed SiteHeader via `--page-chrome` (set on the
 * page root) rather than a hardcoded value, so the two stay in sync if the
 * header's height ever changes.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden bg-brand-green px-6 pt-[calc(var(--page-chrome)+1.5rem)] pb-14">
      <Image
        src="/brand/hero-cliff.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      {/* vertical social labels, split to opposite screen edges */}
      <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        INSTAGRAM
      </div>
      <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        FACEBOOK
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl justify-end">
        <a
          href="mailto:info@ninetynine41.org"
          className="flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-brand-orange"
        >
          <Mail className="h-4 w-4 text-brand-orange" />
          <span className="hidden sm:inline">EMAIL</span>
          <span>info@ninetynine41.org</span>
        </a>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal effect="B" as="h1" className="max-w-3xl text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl">
          For the <span className="text-brand-orange">ONE</span>
          <br />
          who has no one.
        </Reveal>

        <StaggerGroup className="mt-6 flex flex-col gap-6">
          <Reveal effect="A" as="p" className="max-w-md text-base text-white/80 sm:text-lg">
            Ever wanted to make a change in the world but didn&rsquo;t know where to start?{" "}
            <span className="font-semibold text-brand-orange">Ninetynine41</span> is your answer.
          </Reveal>

          <Reveal effect="A" as="div">
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
            >
              Change starts here
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </StaggerGroup>
      </div>
    </section>
  );
}
