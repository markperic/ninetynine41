import Image from "next/image";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getWhatWeDoContent } from "@/lib/content/what-we-do";
import { getIcon } from "@/lib/icons";

export async function Collaborate() {
  const { collaborate } = await getWhatWeDoContent();
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-4/3 w-full overflow-hidden rounded-md">
          <Image src={collaborate.image} alt="Ninetynine41 team meeting with the local community" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </ScrollReveal>

        <div>
          <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold tracking-tight text-brand-orange sm:text-4xl">
            {collaborate.heading}
            <br />
            {collaborate.heading2}
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            {collaborate.subcopy}
          </ScrollReveal>

          <StaggerGroup className="mt-8 flex flex-col gap-6">
            {collaborate.points.map(({ icon, title, body }) => {
              const Icon = getIcon(icon);
              return (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200">
                    <Icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-950">{title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{body}</p>
                  </div>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
