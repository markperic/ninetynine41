import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { BigStatement } from "@/components/home/big-statement";
import { TrustSection } from "@/components/home/trust-section";
import { WhatWeDo } from "@/components/home/what-we-do";
import { Governance } from "@/components/home/governance";
import { Donors } from "@/components/home/donors";
import { ImpactCta } from "@/components/home/impact-cta";
import { Testimonials } from "@/components/home/testimonials";

/**
 * Homepage — a faithful rebuild of the live WordPress homepage
 * (ninetynine41.org), section for section, as the starting point before the
 * Lenis-driven hero redesign lands. See README roadmap.
 */
export default function Home() {
  return (
    <main
      className="min-h-screen bg-white"
      // SiteHeader is a fixed h-24 (6rem) bar — see its own comment.
      style={{ "--page-chrome": "6rem" } as CSSProperties}
    >
      <SiteHeader />
      <Hero />
      <BigStatement />
      <TrustSection />
      <WhatWeDo />
      <Governance />
      <Donors />
      <ImpactCta />
      <Testimonials />
      <SiteFooter />
    </main>
  );
}
