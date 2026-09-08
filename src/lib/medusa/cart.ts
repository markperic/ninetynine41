"use client";

import { medusa } from "./client";

const CART_ID_KEY = "medusa_cart_id";

export type Cart = Awaited<ReturnType<typeof medusa.store.cart.retrieve>>["cart"];
export type CartLineItem = NonNullable<Cart>["items"][number];
export type StoreShippingOption = Awaited<ReturnType<typeof medusa.store.fulfillment.listCartOptions>>["shipping_options"][number];

export function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function clearCartId() {
  localStorage.removeItem(CART_ID_KEY);
}

async function createCart(regionId: string): Promise<string> {
  const { cart } = await medusa.store.cart.create({ region_id: regionId });
  localStorage.setItem(CART_ID_KEY, cart.id);
  return cart.id;
}

async function getOrCreateCartId(regionId: string): Promise<string> {
  const existing = getCartId();
  if (!existing) return createCart(regionId);

  try {
    await medusa.store.cart.retrieve(existing);
    return existing;
  } catch {
    return createCart(regionId);
  }
}

const CART_FIELDS = "*items,*items.variant,*shipping_methods,*shipping_address,*payment_collection";

export async function getCart(): Promise<Cart | null> {
  const cartId = getCartId();
  if (!cartId) return null;
  try {
    const { cart } = await medusa.store.cart.retrieve(cartId, { fields: CART_FIELDS });
    return cart;
  } catch {
    return null;
  }
}

export async function addToCart(regionId: string, variantId: string, quantity = 1) {
  const cartId = await getOrCreateCartId(regionId);
  return medusa.store.cart.createLineItem(cartId, { variant_id: variantId, quantity });
}

export async function updateLineItemQuantity(cartId: string, lineItemId: string, quantity: number) {
  const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, { quantity }, { fields: CART_FIELDS });
  return cart;
}

export async function removeLineItem(cartId: string, lineItemId: string) {
  await medusa.store.cart.deleteLineItem(cartId, lineItemId);
}

export async function setCheckoutDetails(
  cartId: string,
  details: {
    email: string;
    shipping_address: {
      first_name: string;
      last_name: string;
      address_1: string;
      address_2?: string;
      city: string;
      province: string;
      postal_code: string;
      country_code: string;
      phone?: string;
    };
  },
) {
  const { cart } = await medusa.store.cart.update(cartId, details, { fields: CART_FIELDS });
  return cart;
}

export async function listShippingOptions(cartId: string) {
  const { shipping_options } = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
  return shipping_options;
}

export async function addShippingMethod(cartId: string, optionId: string) {
  const { cart } = await medusa.store.cart.addShippingMethod(cartId, { option_id: optionId }, { fields: CART_FIELDS });
  return cart;
}

export async function initiatePayment(cart: NonNullable<Cart>) {
  const { payment_collection } = await medusa.store.payment.initiatePaymentSession(cart, {
    provider_id: "pp_stripe_stripe",
  });
  return payment_collection;
}

export type PaymentSession = NonNullable<Awaited<ReturnType<typeof initiatePayment>>["payment_sessions"]>[number];

export async function completeCart(cartId: string) {
  return medusa.store.cart.complete(cartId);
}
