"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import {
  addShippingMethod,
  clearCartId,
  completeCart,
  getCart,
  getCartId,
  initiatePayment,
  listShippingOptions,
  setCheckoutDetails,
  type Cart,
  type CartLineItem,
  type PaymentSession,
  type StoreShippingOption,
} from "@/lib/medusa/cart";
import { CheckoutPaymentForm } from "./checkout-payment-form";

const AU_STATES = ["QLD", "NSW", "VIC", "ACT", "SA", "WA", "NT", "TAS"];
const FIELD_CLASS =
  "w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-brand-orange";
const currencyFormatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

type Step = "loading" | "empty" | "address" | "shipping" | "payment";
type ShippingOption = { id: string; name: string; amount: number | null };

export function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [step, setStep] = useState<Step>("loading");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCart().then((c) => {
      setCart(c);
      setStep(!c || c.items.length === 0 ? "empty" : "address");
    });
  }, []);

  async function handleAddressSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cartId = getCartId();
    if (!cartId) return;

    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const updated = await setCheckoutDetails(cartId, {
        email: data.email,
        shipping_address: {
          first_name: data.firstName,
          last_name: data.lastName,
          address_1: data.address1,
          address_2: data.address2 || undefined,
          city: data.city,
          province: data.province,
          postal_code: data.postalCode,
          country_code: "au",
          phone: data.phone || undefined,
        },
      });
      setCart(updated);

      const options = await listShippingOptions(cartId);
      setShippingOptions(
        options.map((o: StoreShippingOption) => ({ id: o.id, name: o.name, amount: o.amount ?? null })),
      );
      setSelectedOptionId(options[0]?.id ?? "");
      setStep("shipping");
    } catch {
      setErrorMessage("Something went wrong saving your details — please check them and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleShippingSubmit() {
    const cartId = getCartId();
    if (!cartId || !selectedOptionId) return;

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const updated = await addShippingMethod(cartId, selectedOptionId);
      setCart(updated);
      const paymentCollection = await initiatePayment(updated);
      const stripeSession = paymentCollection.payment_sessions?.find(
        (s: PaymentSession) => s.provider_id === "pp_stripe_stripe",
      );
      const secret = (stripeSession?.data as { client_secret?: string } | undefined)?.client_secret;
      if (!secret) throw new Error("No Stripe client secret returned.");
      setClientSecret(secret);
      setStep("payment");
    } catch {
      setErrorMessage("Something went wrong setting up payment — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePaymentAuthorized() {
    const cartId = getCartId();
    if (!cartId) return;

    setSubmitting(true);
    try {
      const result = await completeCart(cartId);
      if (result.type === "order") {
        sessionStorage.setItem(
          "last_order",
          JSON.stringify({
            display_id: result.order.display_id,
            email: result.order.email,
            total: result.order.total,
          }),
        );
        clearCartId();
        router.push("/shop/order-confirmed");
      } else {
        setErrorMessage("Your payment went through, but we couldn't finalize the order — please contact us.");
      }
    } catch {
      setErrorMessage("Your payment went through, but we couldn't finalize the order — please contact us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "loading") return <p className="mt-12 text-zinc-500">Loading…</p>;

  if (step === "empty") {
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
    <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">
      <div>
        {step === "address" && (
          <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-950">Contact &amp; Shipping</h2>
            <input required type="email" name="email" placeholder="Email Address" className={FIELD_CLASS} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="text" name="firstName" placeholder="First Name" className={FIELD_CLASS} />
              <input required type="text" name="lastName" placeholder="Last Name" className={FIELD_CLASS} />
            </div>
            <input required type="text" name="address1" placeholder="Address" className={FIELD_CLASS} />
            <input type="text" name="address2" placeholder="Apartment, suite, etc. (optional)" className={FIELD_CLASS} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input required type="text" name="city" placeholder="City" className={FIELD_CLASS} />
              <select required name="province" defaultValue="" className={FIELD_CLASS}>
                <option value="" disabled>
                  State
                </option>
                {AU_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input required type="text" name="postalCode" placeholder="Postcode" className={FIELD_CLASS} />
            </div>
            <input type="tel" name="phone" placeholder="Phone (optional)" className={FIELD_CLASS} />

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Continue to Shipping"}
            </button>
          </form>
        )}

        {step === "shipping" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-950">Shipping Method</h2>
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 has-checked:border-brand-orange"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingOption"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={() => setSelectedOptionId(option.id)}
                  />
                  <span className="text-sm font-medium text-zinc-950">{option.name}</span>
                </span>
                <span className="text-sm text-zinc-600">
                  {option.amount != null ? currencyFormatter.format(option.amount) : ""}
                </span>
              </label>
            ))}

            <button
              type="button"
              onClick={handleShippingSubmit}
              disabled={submitting || !selectedOptionId}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
            >
              {submitting ? "Loading payment…" : "Continue to Payment"}
            </button>
          </div>
        )}

        {step === "payment" && clientSecret && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-950">Payment</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutPaymentForm onAuthorized={handlePaymentAuthorized} onError={setErrorMessage} />
            </Elements>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>}
      </div>

      {cart && (
        <aside className="h-fit rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">Order Summary</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {cart.items.map((item: CartLineItem) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-zinc-600">
                  {item.product_title ?? item.title} × {item.quantity}
                </span>
                <span className="font-medium text-zinc-950">{currencyFormatter.format(item.total ?? 0)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{currencyFormatter.format(cart.subtotal ?? 0)}</span>
            </div>
            {cart.shipping_total != null && cart.shipping_total > 0 && (
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{currencyFormatter.format(cart.shipping_total)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold text-zinc-950">
              <span>Total</span>
              <span>{currencyFormatter.format(cart.total ?? 0)}</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
