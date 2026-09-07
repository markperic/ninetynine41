import Image from "next/image";
import { Mail } from "lucide-react";
import { Reveal } from "@/registry/lib/motion-variants";

/**
 * Churches hero — same cliff video/photo background and chrome as the
 * other page heroes, but with the stacked wordmark above the headline (the
 * live page's own treatment for this audience-specific page) instead of a
 * CTA button. No dedicated full-color stacked logo exists in /brand, so
 * this reuses the warm-toned reverse variant (9941-logo-stacked-reverse) —
 * reads fine against the hero's dark gradient overlay.
 */
export function ChurchesHero() {
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
          <Reveal effect="E" as="div" className="mb-6">
            <Image src="/brand/9941-logo-stacked-reverse.png" alt="Ninetynine41" width={220} height={220} className="h-28 w-auto" />
          </Reveal>

          <Reveal effect="M" as="h1" className="max-w-2xl text-5xl leading-[0.95] font-semibold text-white sm:text-7xl">
            For the <span className="text-brand-orange">ONE</span>
            <br />
            who has no one.
          </Reveal>
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
