import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getOfflineContent } from "@/lib/content/offline";
import { getSiteSettings } from "@/lib/content/site-settings";
import { renderHighlighted } from "@/lib/highlight";

export async function OfflineFor99Hero() {
  const [{ hero }, { email }] = await Promise.all([getOfflineContent(), getSiteSettings()]);
  return (
    <section className="relative flex min-h-[70vh] flex-col overflow-hidden bg-brand-green pr-6 pl-8 sm:pl-16 xl:pl-6 pt-[calc(var(--page-chrome)+1.5rem)] pb-10">
      <Image src={hero.backgroundImage} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        INSTAGRAM
      </div>
      <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 text-xs font-semibold tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
        FACEBOOK
      </div>

      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal effect="E" as="div" className="mb-6">
            <Image src={hero.logo} alt="OFFLINEFOR99" width={240} height={240} className="h-40 w-auto sm:h-52" />
          </Reveal>

          <Reveal effect="M" as="h1" className="max-w-2xl text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
            {renderHighlighted(hero.headline, hero.highlightWords)}
          </Reveal>

          <StaggerGroup className="mt-6 flex flex-col gap-3">
            <Reveal effect="A" as="p" className="max-w-md text-base text-white/80 sm:text-lg">
              {hero.subcopy1}
            </Reveal>
            <Reveal effect="A" as="p" className="max-w-md text-base text-white/80 sm:text-lg">
              {renderHighlighted(hero.subcopy2, ["99 minutes", "feel alive", "ONE"])}
            </Reveal>

            <Reveal effect="A" as="div" className="mt-3">
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

      <Reveal effect="A" as="div" className="relative mx-auto flex w-full max-w-6xl justify-end border-t border-white/15 pt-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-white/70" />
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-white/60">EMAIL</p>
            <p className="text-sm text-white">{email}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
