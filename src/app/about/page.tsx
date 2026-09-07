import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutHero } from "@/components/about/hero";
import { ChangeForOne } from "@/components/about/change-for-one";
import { WeFocusOn } from "@/components/about/we-focus-on";
import { SupportCta } from "@/components/about/support-cta";
import { AboutStats } from "@/components/about/stats";
import { AboutTestimonial } from "@/components/about/testimonial";

/**
 * About page — a faithful rebuild of the live WordPress About page
 * (ninetynine41.org/about/), section for section, same as the homepage
 * rebuild. One deliberate departure: the "Global Projects" stats band is
 * module 89 (Stats, Column Scroller) instead of the live site's simple
 * static orange stat row — see components/about/stats.tsx.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <AboutHero />
      <ChangeForOne />
      <WeFocusOn />
      <SupportCta />
      <AboutStats />
      <AboutTestimonial />
      <SiteFooter />
    </main>
  );
}
