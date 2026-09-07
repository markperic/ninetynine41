import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getAboutContent } from "@/lib/content/about";
import { renderHighlighted } from "@/lib/highlight";

/**
 * "Change for the ONE. Change for the community." — module 5's Content
 * Split pattern, with two overlapping photos matching the live About
 * page's collage.
 */
export async function ChangeForOne() {
  const { changeForOne } = await getAboutContent();
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-square w-full max-w-md">
          <div className="absolute top-0 left-0 h-3/4 w-3/5 overflow-hidden rounded-md shadow-lg">
            <Image src={changeForOne.image1} alt="Ninetynine41 team meeting with the local community" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 h-3/4 w-3/5 overflow-hidden rounded-md shadow-xl">
            <Image src={changeForOne.image2} alt="Ninetynine41 team on a newly built project house" fill sizes="30vw" className="object-cover" />
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal effect="B" as="h2" className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {renderHighlighted(changeForOne.heading, [changeForOne.headingHighlight])}
            <br />
            {changeForOne.heading2}
          </ScrollReveal>

          {changeForOne.paragraphs.map((p, i) => (
            <ScrollReveal effect="A" as="p" key={i} className={i === 0 ? "mt-6 text-lg text-zinc-600" : "mt-4 text-zinc-600"}>
              {p}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
