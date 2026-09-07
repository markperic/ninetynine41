import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getProductByHandle } from "@/lib/medusa/products";
import { getAustraliaRegion } from "@/lib/medusa/region";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductDetailClient } from "@/components/shop/product-detail-client";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  return { title: product ? `${product.title} | Shop2Give | Ninetynine41` : "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [product, region] = await Promise.all([getProductByHandle(handle), getAustraliaRegion()]);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white" style={{ "--page-chrome": "6rem" } as CSSProperties}>
      <SiteHeader light />

      <section className="bg-white px-6 pt-[calc(var(--page-chrome)+2rem)] pb-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal effect="A" as="p" className="mb-8 text-sm text-zinc-500">
            <Link href="/shop" className="hover:text-brand-orange">
              Shop2Give
            </Link>
            <span className="mx-2">/</span>
            {product.title}
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ScrollReveal effect="E">
              <ProductGallery images={product.images} alt={product.title} />
            </ScrollReveal>

            <ScrollReveal effect="A">
              <ProductDetailClient product={product} regionId={region.id} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
