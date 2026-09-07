import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getChurchesContent } from "@/lib/content/churches";

export async function ChurchesIntro() {
  const { intro } = await getChurchesContent();
  return (
    <>
      <section className="bg-brand-green px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-2xl text-center text-lg text-white">
          {intro.paragraph1}
        </ScrollReveal>
      </section>

      <section className="bg-[#e8e1d0] px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-3xl text-center text-zinc-700">
          {intro.paragraph2}
        </ScrollReveal>
      </section>
    </>
  );
}
