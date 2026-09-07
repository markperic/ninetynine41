import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getWhatWeDoContent } from "@/lib/content/what-we-do";
import { getIcon } from "@/lib/icons";

export async function Pillars() {
  const { pillars } = await getWhatWeDoContent();
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map(({ icon, title, body }) => {
            const Icon = getIcon(icon);
            return (
              <div key={title} className="rounded-2xl border border-zinc-200 p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-orange/10">
                  <Icon className="h-5 w-5 text-brand-orange" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950">{title}</h3>
                <p className="mt-4 text-sm text-zinc-600">{body}</p>
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
