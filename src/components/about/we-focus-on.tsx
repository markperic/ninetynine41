import { ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getAboutContent } from "@/lib/content/about";
import { getIcon } from "@/lib/icons";

export async function WeFocusOn() {
  const { weFocusOn } = await getAboutContent();
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal effect="A" as="p" className="text-center text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
          {weFocusOn.eyebrow}
        </ScrollReveal>
        <ScrollReveal effect="A" as="h2" className="mt-3 text-center font-display text-3xl font-semibold text-white sm:text-4xl">
          {weFocusOn.heading}
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {weFocusOn.features.map(({ icon, title, body }) => {
            const Icon = getIcon(icon);
            return (
              <div key={title} className="flex flex-col items-center rounded-2xl bg-white p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                  <Icon className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950">{title}</h3>
                <p className="mt-3 text-sm text-zinc-600">{body}</p>
                <button
                  aria-label={`Read more about ${title}`}
                  className="mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
