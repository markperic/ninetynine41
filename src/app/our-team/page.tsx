import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TeamGrid } from "@/components/our-team/team-grid";

/**
 * Our Team page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/our-team/), same as the other page rebuilds. No hero
 * on the live page — the team grid is the first thing below the header.
 */
export default function OurTeamPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />
      <TeamGrid />
      <SiteFooter />
    </main>
  );
}
