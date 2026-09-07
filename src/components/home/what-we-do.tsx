import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getHomeContent } from "@/lib/content/home";
import { getIcon } from "@/lib/icons";

/**
 * "What We Do" — module 4 (Feature Grid), on the brand-green section:
 * plain icon + title + body columns, no card borders or backgrounds (module
 * 4 doesn't use either — that's what distinguishes it from a bordered-card
 * grid). Icon badge follows module 4's own proportions (h-10 w-10,
 * rounded-lg, solid fill), just in brand orange on white instead of module
 * 4's black-on-white. Heading is centered rather than module 4's own
 * left-aligned default, per client preference.
 */
export async function WhatWeDo() {
  const { whatWeDoHeading, whatWeDoFeatures } = await getHomeContent();
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {whatWeDoHeading}
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {whatWeDoFeatures.map(({ icon, eyebrow, title, body }) => {
            const Icon = getIcon(icon);
            return (
              <ScrollReveal effect="A" key={title}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <Icon className="h-5 w-5 text-brand-orange" />
                </div>
                <h3 className="text-lg font-medium text-white">
                  {eyebrow} <span className="text-white/50">|</span> {title.toUpperCase()}
                </h3>
                <p className="mt-2 text-white/75">{body}</p>
              </ScrollReveal>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
