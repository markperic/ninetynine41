"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { addToCart } from "@/lib/medusa/cart";
import type { ProductDetail } from "@/lib/medusa/products";

const currencyFormatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

function findMatchingVariant(variants: ProductDetail["variants"], selection: Record<string, string>) {
  return variants.find((v) => Object.entries(selection).every(([title, value]) => v.options[title] === value));
}

export function ProductDetailClient({ product, regionId }: { product: ProductDetail; regionId: string }) {
  const [selection, setSelection] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      if (option.values[0]) initial[option.title] = option.values[0];
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">("idle");

  const variant = useMemo(() => findMatchingVariant(product.variants, selection), [product.variants, selection]);

  async function handleAddToCart() {
    if (!variant) return;
    setStatus("adding");
    try {
      await addToCart(regionId, variant.id, quantity);
      setStatus("added");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">{product.title}</h1>

      {variant?.price != null && (
        <p className="mt-3 text-2xl font-semibold text-brand-orange">
          {currencyFormatter.format(variant.price)}
        </p>
      )}

      {product.description && <p className="mt-6 text-zinc-600">{product.description}</p>}

      {product.options.map((option) => (
        <div key={option.title} className="mt-8">
          <p className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">{option.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selection[option.title] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setSelection((prev) => ({ ...prev, [option.title]: value }));
                    setStatus("idle");
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isSelected
                      ? "border-brand-orange bg-brand-orange text-white"
                      : "border-zinc-200 text-zinc-700 hover:border-zinc-400",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-8 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-zinc-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-950"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-950"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!variant || status === "adding"}
          className="flex-1 rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "adding" ? "Adding…" : status === "added" ? "Added to cart ✓" : "Add to Cart"}
        </button>
      </div>

      {status === "error" && <p className="mt-3 text-sm text-red-600">Something went wrong — please try again.</p>}
    </div>
  );
}
