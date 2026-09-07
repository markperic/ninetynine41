import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChurchesHero } from "@/components/churches/hero";
import { ChurchesIntro } from "@/components/churches/intro";
import { ChurchesTrust } from "@/components/churches/trust";
import { ChurchesCallToAction } from "@/components/churches/call-to-action";

/**
 * Churches page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/churches/), same as the other page rebuilds.
 */
export default function ChurchesPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <ChurchesHero />
      <ChurchesIntro />
      <ChurchesTrust />
      <ChurchesCallToAction />
      <SiteFooter />
    </main>
  );
}
