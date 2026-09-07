import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatWeDoHero } from "@/components/what-we-do/hero";
import { ActionPlan } from "@/components/what-we-do/action-plan";
import { Pillars } from "@/components/what-we-do/pillars";
import { Collaborate } from "@/components/what-we-do/collaborate";
import { WhatWeDoCta } from "@/components/what-we-do/cta-banner";

/**
 * What We Do page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/what-we-do/), same as the Home and About rebuilds.
 */
export default function WhatWeDoPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <WhatWeDoHero />
      <ActionPlan />
      <Pillars />
      <Collaborate />
      <WhatWeDoCta />
      <SiteFooter />
    </main>
  );
}
