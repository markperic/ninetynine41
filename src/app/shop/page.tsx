import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { ShopProductGrid } from "@/components/shop/product-grid";

/**
 * Shop2Give — storefront backed by Medusa (see src/lib/medusa/). Product
 * catalog and checkout are Medusa's own; this page just lists what's in
 * the connected Medusa store. Real Shop2Give merch still needs importing
 * from the old WooCommerce store — until then this shows whatever's in
 * Medusa (its own demo products on a fresh instance).
 */
export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />
      <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-8 text-center">
        <ScrollReveal effect="A" as="h1" className="text-3xl font-semibold text-zinc-950 sm:text-4xl">
          Shop2Give
        </ScrollReveal>
        <ScrollReveal effect="A" as="p" className="mx-auto mt-4 max-w-xl text-zinc-600">
          Every purchase supports Ninetynine41&rsquo;s work. Merch, made with purpose.
        </ScrollReveal>
      </section>
      <ShopProductGrid />
      <SiteFooter />
    </main>
  );
}
