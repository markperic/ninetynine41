"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

type LastOrder = { display_id: number; email: string; total: number };

export function OrderConfirmedClient() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("last_order");
    if (raw) {
      setOrder(JSON.parse(raw));
      sessionStorage.removeItem("last_order");
    }
  }, []);

  return (
    <div className="mt-10">
      <p className="text-lg text-zinc-950">Thank you — your order has been placed!</p>
      {order && (
        <div className="mt-6 rounded-2xl border border-zinc-200 p-6">
          <p className="text-sm text-zinc-600">Order number</p>
          <p className="text-2xl font-semibold text-zinc-950">#{order.display_id}</p>
          <p className="mt-4 text-sm text-zinc-600">
            A confirmation has been sent to <span className="font-medium text-zinc-950">{order.email}</span>.
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Total paid: <span className="font-medium text-zinc-950">{currencyFormatter.format(order.total)}</span>
          </p>
        </div>
      )}
      <Link
        href="/shop"
        className="mt-8 inline-flex rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
