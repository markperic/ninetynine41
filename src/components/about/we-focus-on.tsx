import { Target, Users, Globe2, ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const FOCUS_AREAS = [
  {
    icon: Target,
    title: "Strategy & Structure",
    body: "Ninetynine41 brings strategy, structure and important on-the-ground information to create practical, cost-effective solutions to pressing community issues. A sustainable plan is paramount so projects are not only implemented but also supported and maintained.",
  },
  {
    icon: Users,
    title: "Grassroots Connection",
    body: "We maintain close liaison with local community leaders to create practical strategy particular to the region. The communities we serve are our number one priority.",
  },
  {
    icon: Globe2,
    title: "Global Vision",
    body: "We are an Australian organisation addressing important global issues by connecting like-minded people lending a hand where they can. Together, we're leaving a legacy both locally and globally.",
  },
];

/**
 * "We Focus On" — a bordered, centered variant of module 4 (Feature Grid):
 * white cards with a centered icon badge, title, body, and a small round
 * arrow button, unlike homepage WhatWeDo's borderless left-aligned take on
 * the same module. Distinct file per section-per-page convention (see
 * change-for-one.tsx / hero.tsx in this folder).
 */
export function WeFocusOn() {
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal effect="A" as="p" className="text-center text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
          Our Expertise
        </ScrollReveal>
        <ScrollReveal effect="A" as="h2" className="mt-3 text-center font-display text-3xl font-semibold text-white sm:text-4xl">
          We Focus On
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FOCUS_AREAS.map(({ icon: Icon, title, body }) => (
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
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
