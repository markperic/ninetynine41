import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "Safety for the ONE — Srey Oun" — a single project-story testimonial,
 * photo left / quote right. Same beat as module 07 (Testimonial, Single
 * Quote) but with a supporting photo, closer to modules 08/64's image+quote
 * card shape without the carousel controls (this page only has the one).
 * Real project photo (srey1.webp) of the flood-safe house this story
 * describes.
 */
export function AboutTestimonial() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/srey1.webp"
            alt="The flood-safe house built for Srey Oun's family"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>

        <div>
          <ScrollReveal effect="A" as="p" className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-orange uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            Testimonials
          </ScrollReveal>

          <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Safety for the <span className="text-brand-orange">ONE</span>
            <br />
            Srey Oun
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-6 text-xl font-medium text-zinc-800">
            &ldquo;Because of generous supporters like you, we&rsquo;ve been able to purchase land for the family,
            and thanks to a team of volunteers, we built a brand-new, flood-safe house in just four days.&rdquo;
          </ScrollReveal>

          <ScrollReveal effect="A" as="div" className="mt-6">
            <p className="font-semibold text-zinc-950">Srey Oun</p>
            <p className="text-sm text-zinc-500 uppercase">Project Participant</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
