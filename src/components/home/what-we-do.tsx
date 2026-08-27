import { HelpCircle, Handshake, Link2 } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const FEATURES = [
  {
    icon: HelpCircle,
    eyebrow: "Why",
    title: "Kindness",
    body: "We are all connected. What happens to ONE, happens to all. There is great need and we are moved to make a difference, no matter how small. No ONE should go without. Every ONE matters.",
  },
  {
    icon: Handshake,
    eyebrow: "How",
    title: "Connection",
    body: "Change begins at a grassroots level. Ninetynine41 comes alongside local organisations, community leaders and volunteers to create meaningful outcomes. We don't take over. We seek to understand through collaboration, empower through ongoing support and implement solutions to sustain in the long-term.",
  },
  {
    icon: Link2,
    eyebrow: "What",
    title: "Action",
    body: "Less talk. Better outcomes. Ninetynine41 is interested in lasting change and the projects we select reflect this. Working closely with leading Australian charity, Global Development Group, gives us insight into the most urgent needs around the globe. We share the same vision; to bring change to the ONE to bring change to many.",
  },
];

/**
 * "What We Do" — module 4 (Feature Grid), on the brand-green section:
 * plain icon + title + body columns, no card borders or backgrounds (module
 * 4 doesn't use either — that's what distinguishes it from a bordered-card
 * grid). Icon badge follows module 4's own proportions (h-10 w-10,
 * rounded-lg, solid fill), just in brand orange on white instead of module
 * 4's black-on-white. Heading is centered rather than module 4's own
 * left-aligned default, per client preference.
 */
export function WhatWeDo() {
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What We Do
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, eyebrow, title, body }) => (
            <ScrollReveal effect="A" key={title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <Icon className="h-5 w-5 text-brand-orange" />
              </div>
              <h3 className="text-lg font-medium text-white">
                {eyebrow} <span className="text-white/50">|</span> {title.toUpperCase()}
              </h3>
              <p className="mt-2 text-white/75">{body}</p>
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
