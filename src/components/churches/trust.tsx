import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getChurchesContent } from "@/lib/content/churches";

export async function ChurchesTrust() {
  const { trust } = await getChurchesContent();
  return (
    <>
      <section className="bg-brand-green px-6 py-16">
        <ScrollReveal effect="B" as="h2" className="mx-auto max-w-2xl text-center text-2xl font-semibold text-brand-orange sm:text-3xl">
          {trust.heading}
        </ScrollReveal>
      </section>

      <section className="bg-[#e8e1d0] px-6 py-16">
        <ScrollReveal effect="A" as="p" className="mx-auto max-w-3xl text-center text-zinc-700">
          {trust.paragraph}
        </ScrollReveal>
      </section>
    </>
  );
}
