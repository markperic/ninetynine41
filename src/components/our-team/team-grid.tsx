import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const TEAM = [
  { name: "Nathan Higgins", role: "Founder" },
  { name: "Tomas Soner", role: "Business Strategy" },
  { name: "Stacey Peric", role: "Marketing & Communications" },
  { name: "Mark Peric", role: "Website & Graphic Design" },
  { name: "Lachie Goldsworthy", role: "Brand Strategy" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

/**
 * "Meet Our Team" — the live page uses the brand icon as a placeholder
 * photo for every member (no real headshots yet). Initials-in-a-circle
 * reads more clearly as "no photo yet, swap per person" than stamping the
 * same logo five times — swap each for a real headshot once supplied.
 */
export function TeamGrid() {
  return (
    <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-24">
      <div className="mx-auto max-w-5xl text-center">
        <ScrollReveal effect="A" as="h1" className="text-sm font-semibold tracking-[0.25em] text-zinc-950 uppercase">
          Meet Our Team
        </ScrollReveal>
        <ScrollReveal effect="A" as="p" className="mt-2 text-brand-orange">
          Collaboration is key.
        </ScrollReveal>

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map(({ name, role }) => (
            <div key={name} className="flex flex-col items-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-orange/10 text-2xl font-semibold text-brand-orange">
                {initials(name)}
              </div>
              <p className="mt-4 text-sm font-bold tracking-wide text-zinc-950 uppercase">{name}</p>
              <p className="mt-1 text-xs text-zinc-500 uppercase">{role}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
