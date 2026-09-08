"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCart,
  getCartId,
  removeLineItem,
  updateLineItemQuantity,
  type Cart,
  type CartLineItem,
} from "@/lib/medusa/cart";

const currencyFormatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

export function CartPageClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);

  useEffect(() => {
    getCart()
      .then(setCart)
      .finally(() => setLoading(false));
  }, []);

  async function handleQuantityChange(lineItemId: string, quantity: number) {
    const cartId = getCartId();
    if (!cartId || quantity < 1) return;
    setPendingItemId(lineItemId);
    try {
      const updated = await updateLineItemQuantity(cartId, lineItemId, quantity);
      setCart(updated);
    } finally {
      setPendingItemId(null);
    }
  }

  async function handleRemove(lineItemId: string) {
    const cartId = getCartId();
    if (!cartId) return;
    setPendingItemId(lineItemId);
    try {
      await removeLineItem(cartId, lineItemId);
      setCart(await getCart());
    } finally {
      setPendingItemId(null);
    }
  }

  if (loading) {
    return <p className="mt-12 text-zinc-500">Loading your cart…</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mt-12">
        <p className="text-zinc-600">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <ul className="flex flex-col divide-y divide-zinc-200 border-t border-b border-zinc-200">
        {cart.items.map((item: CartLineItem) => (
          <li key={item.id} className="flex items-center gap-4 py-6">
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.product_title ?? item.title}
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-zinc-950">{item.product_title ?? item.title}</p>
              {item.variant_title && <p className="text-sm text-zinc-500">{item.variant_title}</p>}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center rounded-full border border-zinc-200">
                  <button
                    type="button"
                    disabled={pendingItemId === item.id}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-zinc-950 disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    disabled={pendingItemId === item.id}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-zinc-950 disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  disabled={pendingItemId === item.id}
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-zinc-400 underline-offset-2 hover:text-red-600 hover:underline disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="shrink-0 font-semibold text-zinc-950">{currencyFormatter.format(item.total ?? 0)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-zinc-600">Subtotal</span>
        <span className="text-xl font-semibold text-zinc-950">{currencyFormatter.format(cart.subtotal ?? 0)}</span>
      </div>

      <Link
        href="/shop/checkout"
        className="mt-8 flex w-full items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
      >
        Checkout
      </Link>
    </div>
  );
}
