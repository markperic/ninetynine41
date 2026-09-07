import Image from "next/image";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getTeamMembers } from "@/lib/team";
import { getOurTeamPageContent } from "@/lib/content/our-team";

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
export async function TeamGrid() {
  const [team, { heading, subheading }] = await Promise.all([getTeamMembers(), getOurTeamPageContent()]);
  return (
    <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-24">
      <div className="mx-auto max-w-5xl text-center">
        <ScrollReveal effect="A" as="h1" className="text-sm font-semibold tracking-[0.25em] text-zinc-950 uppercase">
          {heading}
        </ScrollReveal>
        <ScrollReveal effect="A" as="p" className="mt-2 text-brand-orange">
          {subheading}
        </ScrollReveal>

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {team.map(({ name, role, photo }) => (
            <div key={name} className="flex flex-col items-center">
              {photo ? (
                <Image
                  src={photo}
                  alt={name}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-orange/10 text-2xl font-semibold text-brand-orange">
                  {initials(name)}
                </div>
              )}
              <p className="mt-4 text-sm font-bold tracking-wide text-zinc-950 uppercase">{name}</p>
              <p className="mt-1 text-xs text-zinc-500 uppercase">{role}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
