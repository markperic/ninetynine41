import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OfflineFor99Hero } from "@/components/offline-for-99/hero";
import { OfflineFor99Intro } from "@/components/offline-for-99/intro";
import { OfflineFor99RegisterForm } from "@/components/offline-for-99/register-form";

/**
 * OFFLINEFOR99 page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/offline-for-99/), same as the other page rebuilds.
 */
export default function OfflineFor99Page() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader />
      <OfflineFor99Hero />
      <OfflineFor99Intro />
      <OfflineFor99RegisterForm />
      <SiteFooter />
    </main>
  );
}
