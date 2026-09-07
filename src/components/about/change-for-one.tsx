import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "Change for the ONE. Change for the community." — module 5's Content
 * Split pattern (eyebrow-less here, since the live page has none), but with
 * two overlapping photos instead of module 5's single image, matching the
 * live About page's collage. Real project photos (about1/about2.webp) —
 * a community meeting under a field shelter, and the team on a newly built
 * project house.
 */
export function ChangeForOne() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-square w-full max-w-md">
          <div className="absolute top-0 left-0 h-3/4 w-3/5 overflow-hidden rounded-md shadow-lg">
            <Image src="/images/about1.webp" alt="Ninetynine41 team meeting with the local community" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 h-3/4 w-3/5 overflow-hidden rounded-md shadow-xl">
            <Image src="/images/about2.webp" alt="Ninetynine41 team on a newly built project house" fill sizes="30vw" className="object-cover" />
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal effect="B" as="h2" className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Change for the <span className="text-brand-orange">ONE</span>.
            <br />
            Change for the community.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-6 text-lg text-zinc-600">
            <span className="font-semibold text-brand-orange">Ninetynine41</span> fund, deliver and sustain
            real-world change through specific community projects helping the world&rsquo;s poorest people.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            Our commitment begins at a local level. We foster relationships within the local neighbourhood; with
            local leaders and the community. We understand real change is a collaborative effort. We don&rsquo;t
            take over.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            By partnering with local organizations and bringing our support, we amplify the good already present
            in these communities.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            In a world where challenges often overshadow positivity, we&rsquo;re not just dreamers, we are an
            action-focused organisation.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            We provide strategy and practical support bridging the gap from idea, to impact, to sustainability.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
