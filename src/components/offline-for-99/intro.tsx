import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getOfflineContent } from "@/lib/content/offline";

export async function OfflineFor99Intro() {
  const { intro } = await getOfflineContent();
  return (
    <section className="bg-[#e8e1d0] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-brand-green sm:text-4xl">
          {intro.heading}
          <br />
          {intro.heading2}
        </ScrollReveal>

        {intro.paragraphs.map((p, i) => (
          <ScrollReveal effect="A" as="p" key={i} className={i === 0 ? "mt-6 text-lg text-zinc-700" : "mt-4 text-zinc-600"}>
            {p}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
