import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} | Ninetynine41` : "Project not found" };
}

/**
 * Single project template — the live WordPress version of this page
 * (ninetynine41.org/project/srey-oun-2/) is itself sparse: a title, a date,
 * and a broken thumbnail, no real body copy beyond the excerpt already
 * shown on the archive page. Rather than reproduce that gap, this template
 * uses the project's real excerpt as its opening paragraph plus one more
 * real, already-published fact (from the About page's own Srey Oun
 * testimonial) — same content, not invented. "More projects" sidebar
 * mirrors the live single-post page's own recent-posts list.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />

      <section className="bg-brand-green px-6 pt-[calc(var(--page-chrome)+3rem)] pb-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
            Ninetynine41 Projects
          </ScrollReveal>
          <ScrollReveal effect="B" as="h1" className="mt-3 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
            {project.title}
          </ScrollReveal>
          <ScrollReveal effect="A" as="p" className="mt-4 text-sm text-white/60">
            {project.displayDate}
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <ScrollReveal effect="E" className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </ScrollReveal>

            <div className="mt-8 flex flex-col gap-4">
              {project.body.map((paragraph, i) => (
                <ScrollReveal effect="A" as="p" key={i} className="text-lg text-zinc-600">
                  {paragraph}
                </ScrollReveal>
              ))}
            </div>
          </div>

          <aside>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase">More Projects</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {otherProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="block rounded-xl border border-zinc-200 p-4 transition-colors hover:border-brand-orange">
                    <p className="font-semibold text-zinc-950">{p.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{p.displayDate}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
