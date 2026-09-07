import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getHomeContent } from "@/lib/content/home";
import { renderHighlighted } from "@/lib/highlight";

/**
 * Homepage hero — full-bleed brief photo, static for now. The client is
 * planning a Lenis-driven scroll treatment for this section separately;
 * this is a faithful, plain rebuild of the current WordPress hero to get
 * the rest of the page moving in the meantime.
 *
 * Top padding clears the fixed SiteHeader via `--page-chrome` (set on the
 * page root) rather than a hardcoded value, so the two stay in sync if the
 * header's height ever changes.
 *
 * Left padding is wider than the right from `sm` up (where the vertical
 * INSTAGRAM label switches on) so the headline never runs into it — at the
 * widths where content still sits flush against the section's own padding
 * (before `max-w-6xl`'s auto margins start doing the centering themselves,
 * around 1152px), `pl-8`/`pl-6` alone put body copy right underneath the
 * label. Past `xl` the auto margins have taken over, so it steps back down
 * to match the right side.
 *
 * The headline block is centered vertically in the section (a `flex-1`
 * wrapper around it) rather than pinned to the bottom edge.
 *
 * Background is the client's animated version of this same cliff shot
 * (Hero-Video.mp4) rather than the static photo — autoplaying, muted, and
 * looped so it reads as ambient motion, not a video someone needs to
 * control. `motion-reduce:hidden`/`motion-reduce:block` swap it back to the
 * plain photo for prefers-reduced-motion, same as the reduced-motion checks
 * modules 66/68/70/71 do for their own animation. The photo also stays on
 * as the video's `poster`, so there's never a blank frame before it loads.
 */
export async function Hero() {
  const { hero } = await getHomeContent();
  return (
    <section className="relative flex min-h-[85vh] flex-col overflow-hidden bg-brand-green pr-6 pl-8 sm:pl-16 xl:pl-6 pt-[calc(var(--page-chrome)+1.5rem)] pb-14">
      <Image
        src="/brand/hero-cliff.jpg"
        alt=""
        fill
        priority
        className="hidden object-cover motion-reduce:block"
      />
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

      {/* vertical social labels, split to opposite screen edges */}
      <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        INSTAGRAM
      </div>
      <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        FACEBOOK
      </div>

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl">
          {hero.eyebrow && (
            <Reveal effect="A" as="p" className="mb-3 text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
              {hero.eyebrow}
            </Reveal>
          )}
          <Reveal effect="M" as="h1" className="max-w-3xl text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
            {renderHighlighted(hero.headline, hero.highlightWords)}
          </Reveal>

          <StaggerGroup className="mt-6 flex flex-col gap-6">
            <Reveal effect="A" as="p" className="max-w-md text-base text-white/80 sm:text-lg">
              {hero.subcopy}
            </Reveal>

            <Reveal effect="A" as="div">
              <a
                href={hero.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
              >
                {hero.ctaLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
