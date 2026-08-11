"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  buildOrderWhatsAppMessage,
  initialShipping,
  isShippingComplete,
  openWhatsApp,
  type CheckoutMethod,
  type ShippingInfo,
} from "@/lib/checkout";

interface ExpressCheckoutModalProps {
  productId: Id<"products">;
  name: string;
  price: string;
  size: string;
  onClose: () => void;
}

const inputClass =
  "w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors";

export default function ExpressCheckoutModal({
  productId,
  name,
  price,
  size,
  onClose,
}: ExpressCheckoutModalProps) {
  const router = useRouter();
  const checkout = useMutation(api.orders.checkout);

  const [shipping, setShipping] = useState<ShippingInfo>(initialShipping);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = useCallback(
    (field: keyof ShippingInfo, value: string) => {
      setShipping((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const processOrder = useCallback(
    async (method: CheckoutMethod) => {
      setError(null);

      if (!isShippingComplete(shipping)) {
        setError("Please fill in all shipping fields.");
        return;
      }

      setSubmitting(true);
      try {
        const result = await checkout({
          items: [{ productId, quantity: 1, size }],
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

        if (method === "whatsapp") {
          const text = buildOrderWhatsAppMessage({
            orderId: result.orderId!,
            total: result.total!,
            shipping,
            items: [{ name, size, quantity: 1, price }],
            intro: `Hi! I would like to order the ${name} (Size: ${size}) for ${price}.`,
          });
          openWhatsApp(text);
        }

        router.push(`/checkout/success?orderId=${encodeURIComponent(result.orderId!)}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Checkout failed.");
        setSubmitting(false);
      }
    },
    [checkout, shipping, productId, size, name, price, router],
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg border border-white/15 bg-surface-container-low max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-white/15 bg-surface-container-low flex justify-between items-center">
          <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
            Express Checkout
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="border border-white/15 bg-surface-container p-4 flex justify-between items-center">
            <div className="min-w-0">
              <h3 className="font-label-bold text-sm text-primary uppercase tracking-wide truncate">
                {name}
              </h3>
              <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                Size: {size} • Qty: 1
              </p>
            </div>
            <span className="font-label-bold text-sm text-primary-fixed shrink-0 ml-4">
              {price}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Full Name
              </label>
              <input
                type="text"
                value={shipping.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="John Doe"
                autoFocus
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Email
              </label>
              <input
                type="email"
                value={shipping.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Phone
              </label>
              <input
                type="tel"
                value={shipping.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+92 300 0000000"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Address
              </label>
              <input
                type="text"
                value={shipping.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Street Name"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                City
              </label>
              <input
                type="text"
                value={shipping.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Karachi"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Postal Code
              </label>
              <input
                type="text"
                value={shipping.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
                placeholder="75000"
                className={inputClass}
              />
            </div>
          </div>

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
              {submitting ? "Placing Order..." : "Cash on Delivery Checkout"}
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
      </div>
    </div>
  );
}
