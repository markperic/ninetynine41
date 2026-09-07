import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact/contact-form";

/**
 * Contact page — a faithful rebuild of the live WordPress page
 * (ninetynine41.org/contact/), same as the other page rebuilds. No hero —
 * white background from the top, so the header uses `light` (see
 * SiteHeader's comment).
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />
      <ContactForm />
      <SiteFooter />
    </main>
  );
}
