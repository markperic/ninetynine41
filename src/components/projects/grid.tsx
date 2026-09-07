import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { StaggerGroup, ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * Project card grid — image, orange title link, date, excerpt. Matches the
 * live site's archive-page card style, on the same warm off-white the live
 * page uses behind the grid (rest of this rebuild runs white/brand-green,
 * but this section keeps that cream tint since it's a distinct visual beat
 * from the intro panel above it).
 */
export function ProjectsGrid() {
  return (
    <section className="bg-[#faf3e6] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ScrollReveal effect="A" key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-brand-orange transition-colors group-hover:text-brand-orange/80">{project.title}</h2>
                  <p className="mt-1 text-xs font-medium text-zinc-500">{project.displayDate}</p>
                  <p className="mt-3 text-sm text-zinc-600">{project.excerpt}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
