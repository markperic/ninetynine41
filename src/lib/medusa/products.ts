import { medusa } from "./client";
import { getAustraliaRegion } from "./region";

export type StoreProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail: string | null;
  description: string | null;
};

type MedusaStoreProduct = Awaited<ReturnType<typeof medusa.store.product.list>>["products"][number];

export async function getProducts(): Promise<StoreProduct[]> {
  const { products } = await medusa.store.product.list({ limit: 20 });
  return products.map((p: MedusaStoreProduct) => ({
    id: p.id,
    title: p.title,
    handle: p.handle ?? p.id,
    thumbnail: p.thumbnail ?? null,
    description: p.description ?? null,
  }));
}

export type ProductVariant = {
  id: string;
  title: string;
  sku: string | null;
  options: Record<string, string>;
  price: number | null;
  currencyCode: string | null;
};

export type ProductOption = {
  title: string;
  values: string[];
};

export type ProductDetail = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  images: string[];
  options: ProductOption[];
  variants: ProductVariant[];
};

type MedusaVariant = {
  id: string;
  title?: string;
  sku?: string;
  options?: { option?: { title?: string }; value: string }[];
  calculated_price?: { calculated_amount?: number; currency_code?: string };
};

export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  const region = await getAustraliaRegion();
  const { products } = await medusa.store.product.list({
    handle,
    region_id: region.id,
    fields: "*variants.calculated_price,*variants.options,*options,*images",
  });
  const product = products[0];
  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle ?? product.id,
    description: product.description ?? null,
    images: (product.images ?? []).map((img: { url: string }) => img.url),
    options: (product.options ?? []).map((o: { title: string; values?: { value: string }[] }) => ({
      title: o.title,
      values: (o.values ?? []).map((v) => v.value),
    })),
    variants: (product.variants ?? []).map((v: MedusaVariant) => {
      const options: Record<string, string> = {};
      for (const opt of v.options ?? []) {
        if (opt.option?.title) options[opt.option.title] = opt.value;
      }
      return {
        id: v.id,
        title: v.title ?? "",
        sku: v.sku ?? null,
        options,
        price: v.calculated_price?.calculated_amount ?? null,
        currencyCode: v.calculated_price?.currency_code ?? null,
      };
    }),
  };
}
