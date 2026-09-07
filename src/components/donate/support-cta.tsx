import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getDonateContent } from "@/lib/content/donate";

export async function DonateSupportCta() {
  const { supportCta } = await getDonateContent();
  return (
    <section className="bg-brand-green px-6 py-24">
      <StaggerGroup className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-white sm:text-4xl">
          {supportCta.heading}
        </ScrollReveal>

        {supportCta.paragraphs.map((p, i) => (
          <ScrollReveal effect="A" as="p" key={i} className={i === 0 ? "mt-6 text-white/80" : "mt-4 text-white/80"}>
            {p}
          </ScrollReveal>
        ))}
      </StaggerGroup>
    </section>
  );
}
