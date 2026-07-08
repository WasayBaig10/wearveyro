"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

interface CheckoutFormProps {
  items: { productId: Id<"products">; quantity: number; size: string }[];
  onSuccess?: (orderId: string) => void;
}

export default function CheckoutForm({ items, onSuccess }: CheckoutFormProps) {
  const checkout = useMutation(api.orders.checkout);
  const { user } = useUser();

  const [name, setName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await checkout({
        items,
        customerName: name,
        email,
        userId: user?.id,
      });
      onSuccess?.(result.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Contact
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Zara Vance"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="zara@resilio.co"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>

        {error && (
          <div className="p-4 border border-error/30 bg-error/10 text-error font-label-bold text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-14 bg-primary-fixed text-on-primary-fixed font-label-bold text-lg tracking-widest uppercase hover:bg-black hover:text-white border border-transparent hover:border-white transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Processing..." : user ? "Place Order" : "Place Order as Guest"}
        </button>
      </form>
    </section>
  );
}
