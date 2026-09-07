import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getAboutContent } from "@/lib/content/about";
import { renderHighlighted } from "@/lib/highlight";

export async function AboutTestimonial() {
  const { testimonial } = await getAboutContent();
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <Image
            src={testimonial.image}
            alt="The flood-safe house built for Srey Oun's family"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>

        <div>
          <ScrollReveal effect="A" as="p" className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-orange uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            {testimonial.eyebrow}
          </ScrollReveal>

          <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {renderHighlighted(testimonial.heading, [testimonial.headingHighlight])}
            <br />
            {testimonial.heading2}
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-6 text-xl font-medium text-zinc-800">
            &ldquo;{testimonial.quote}&rdquo;
          </ScrollReveal>

          <ScrollReveal effect="A" as="div" className="mt-6">
            <p className="font-semibold text-zinc-950">{testimonial.name}</p>
            <p className="text-sm text-zinc-500 uppercase">{testimonial.role}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
