import { Target, HeartHandshake, Repeat } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const PILLARS = [
  {
    icon: Target,
    title: "Strategy for Action & Maximum Impact",
    body: "Working with local community leaders, Ninetynine41 develop clear and realistic strategic plans to overcome specific challenges. We collaborate with the community to identify the need and create a sustainable answer to a pressing problem. Our partnership with Global Development Group gives us the clarity and insight to move community projects from intention to action, and from action to outcomes.",
  },
  {
    icon: HeartHandshake,
    title: "Fundraising & Donor Confidence",
    body: "Ninetynine41 makes it simple for donors to support specific projects which bring lasting change to communities in need. Donors give to causes they trust, and trust is built through transparency, structure and consistent, open communication. We work closely with Global Development Group as our advisory body, so donor reporting stays consistent and available.",
  },
  {
    icon: Repeat,
    title: "Fund | Deliver | Sustain",
    body: "Implementing a community project is challenging; maintaining it afterward is often more so. Our goal is to leave communities with the strategy to sustain the work long after we've finished. We provide practical delivery oversight so funded projects are managed well, milestones are met, and outcomes are reported and sustained with integrity.",
  },
];

/**
 * The three white bordered cards under the funding panel — icon badge added
 * per card (not on the live page, which is just title + body), same badge
 * treatment as about/we-focus-on.tsx's centered cards, just left-aligned to
 * match this card's own title/body alignment.
 */
export function Pillars() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-zinc-200 p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-orange/10">
                <Icon className="h-5 w-5 text-brand-orange" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-950">{title}</h3>
              <p className="mt-4 text-sm text-zinc-600">{body}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
