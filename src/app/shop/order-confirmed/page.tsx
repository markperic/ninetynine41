import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { OrderConfirmedClient } from "@/components/shop/order-confirmed-client";

export default function OrderConfirmedPage() {
  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />
      <section className="bg-white px-6 pt-[calc(var(--page-chrome)+3rem)] pb-24">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal effect="A" as="h1" className="text-3xl font-semibold text-zinc-950 sm:text-4xl">
            Order Confirmed
          </ScrollReveal>
          <OrderConfirmedClient />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
