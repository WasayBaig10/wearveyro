"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  isShippingComplete,
  type CheckoutMethod,
  type ShippingInfo,
} from "@/lib/checkout";
import { getItemStockStatus, useInventory } from "@/hooks/useInventory";

interface CheckoutFormProps {
  items: { productId: Id<"products">; quantity: number; size: string }[];
  shipping: ShippingInfo;
  onSuccess?: (orderId: string, total: number, method: CheckoutMethod) => void;
}

export default function CheckoutForm({
  items,
  shipping,
  onSuccess,
}: CheckoutFormProps) {
  const checkout = useMutation(api.orders.checkout);
  const { inventory } = useInventory();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function processOrder(method: CheckoutMethod) {
    setError(null);

    if (!isShippingComplete(shipping)) {
      setError("Please fill in all shipping fields.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    for (const item of items) {
      const status = getItemStockStatus(
        inventory,
        item.productId,
        item.quantity
      );
      if (status.soldOut || status.overStock) {
        setError(`${status.message} Remove the item or reduce its quantity to continue.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await checkout({
        items,
        customerName: shipping.name,
        email: shipping.email,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
      });

      if (!result.ok) {
        setError(result.message);
        setSubmitting(false);
        return;
      }

      onSuccess?.(result.orderId, result.total, method);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Contact
      </h2>
      <div className="space-y-4">
        {error && (
          <div className="p-4 border border-error/30 bg-error/10 text-error font-label-bold text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => processOrder("cod")}
            disabled={submitting}
            className="w-full h-14 bg-primary-fixed text-on-primary-fixed font-label-bold text-lg tracking-widest uppercase hover:bg-black hover:text-white border border-transparent hover:border-white transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing..." : "Cash on Delivery Checkout"}
          </button>
          <button
            type="button"
            onClick={() => processOrder("whatsapp")}
            disabled={submitting}
            className="w-full h-14 border border-white text-white font-label-bold text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay via Online & Continue on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
