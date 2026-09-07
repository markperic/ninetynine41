import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";
import { getProducts } from "@/lib/medusa/products";

/**
 * Shop2Give product grid — fetches live from the Medusa Store API. Until
 * real Shop2Give merch is imported, this renders whatever Medusa's own
 * instance currently has (its demo products, on first setup), which is
 * enough to prove the storefront <-> Medusa wiring end to end.
 */
export async function ShopProductGrid() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <section className="bg-white px-6 py-24 text-center">
        <p className="text-zinc-600">No products yet — check back soon.</p>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ScrollReveal effect="A" key={product.id}>
              <Link href={`/shop/${product.handle}`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-zinc-950">{product.title}</h2>
                  {product.description && <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{product.description}</p>}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
