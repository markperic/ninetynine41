import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DonatePanel } from "@/components/donate/donate-panel";
import { DonateSupportCta } from "@/components/donate/support-cta";

/**
 * Donate page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/donate/), same as the other page rebuilds. No photo
 * hero on the live page — the orange donation panel is the first thing
 * below the header, and clears it with its own top padding (see
 * donate-panel.tsx) rather than a spacer div here, same as every hero on
 * every other page.
 */
export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <DonatePanel />
      <DonateSupportCta />
      <SiteFooter />
    </main>
  );
}
