"use client";

import { medusa } from "./client";

const CART_ID_KEY = "medusa_cart_id";

async function createCart(regionId: string): Promise<string> {
  const { cart } = await medusa.store.cart.create({ region_id: regionId });
  localStorage.setItem(CART_ID_KEY, cart.id);
  return cart.id;
}

async function getOrCreateCartId(regionId: string): Promise<string> {
  const existing = localStorage.getItem(CART_ID_KEY);
  if (!existing) return createCart(regionId);

  try {
    await medusa.store.cart.retrieve(existing);
    return existing;
  } catch {
    return createCart(regionId);
  }
}

export async function addToCart(regionId: string, variantId: string, quantity = 1) {
  const cartId = await getOrCreateCartId(regionId);
  return medusa.store.cart.createLineItem(cartId, { variant_id: variantId, quantity });
}
