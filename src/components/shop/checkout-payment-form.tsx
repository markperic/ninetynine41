"use client";

import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

export function CheckoutPaymentForm({
  onAuthorized,
  onError,
}: {
  onAuthorized: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Payment failed — please try again.");
      setSubmitting(false);
      return;
    }

    onAuthorized();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Processing…" : "Place Order"}
      </button>
    </form>
  );
}
