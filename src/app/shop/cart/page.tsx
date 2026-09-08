import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { CartPageClient } from "@/components/shop/cart-page-client";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />
      <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal effect="A" as="h1" className="text-3xl font-semibold text-zinc-950 sm:text-4xl">
            Your Cart
          </ScrollReveal>
          <CartPageClient />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
