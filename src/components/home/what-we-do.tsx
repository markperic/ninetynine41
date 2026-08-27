import { HelpCircle, Handshake, Link2 } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const CARDS = [
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
 * "What We Do" — three-card grid on the brand-green section, matching the
 * live site's icon-badge cards (question mark / handshake / chain-link).
 */
export function WhatWeDo() {
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal
          effect="A"
          as="h2"
          className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          WHAT WE DO
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid gap-8 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, eyebrow, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/15 px-7 py-9 text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-orange">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">
                {eyebrow} <span className="text-white/60">|</span> {title.toUpperCase()}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{body}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
