import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "Feeling tired & bored of your phone?" — centered copy block on the
 * live page's warm cream background, ending in the same "I Want In" CTA
 * anchored to the registration form below.
 */
export function OfflineFor99Intro() {
  return (
    <section className="bg-[#e8e1d0] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-brand-green sm:text-4xl">
          Feeling tired &amp; bored of your phone?
          <br />
          Yup. Us too.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-6 text-lg text-zinc-700">
          We want to <span className="font-semibold">FEEL</span> more. Actually{" "}
          <span className="font-semibold">LIVE</span> our life.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 text-lg text-zinc-700">
          Enter <span className="font-semibold text-brand-orange">OFFLINEFOR99</span>.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
          <span className="font-semibold text-brand-orange">OFFLINEFOR99</span> is an initiative where you put the
          phone down, jump offline for 99 minutes, feel alive and help those around the world who need it most.
          Get your friends and family involved — a group of mates doing the challenge together, raising money for
          communities who really need it, and feeling good doing it.{" "}
          <span className="font-semibold text-zinc-950">Register your interest below</span> to be the first to
          find out how to get OFFLINEFOR99 in your school, church or organisation.
        </ScrollReveal>
      </div>
    </section>
  );
}
