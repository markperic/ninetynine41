import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectsIntro } from "@/components/projects/intro";
import { ProjectsGrid } from "@/components/projects/grid";

/**
 * Projects listing page — a faithful rebuild of the live WordPress archive
 * (ninetynine41.org/projects-2026/), same as the other page rebuilds.
 */
export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <ProjectsIntro />
      <ProjectsGrid />
      <SiteFooter />
    </main>
  );
}
