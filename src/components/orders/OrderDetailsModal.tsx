"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  shipped: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  delivered: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
};

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface OrderDetailsModalProps {
  orderId: Id<"orders">;
  displayId: string;
  onClose: () => void;
}

export default function OrderDetailsModal({
  orderId,
  displayId,
  onClose,
}: OrderDetailsModalProps) {
  const order = useQuery(api.orders.getOrderWithProducts, { orderId });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/15 bg-surface-container-low">
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-white/15 bg-surface-container-low flex justify-between items-center">
          <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
            Order {displayId}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        {order === undefined ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-surface-container animate-pulse border border-white/15"
              />
            ))}
          </div>
        ) : !order ? (
          <div className="p-6 text-center">
            <p className="font-headline-md text-secondary">Order not found.</p>
          </div>
        ) : (
          <div className="p-6 space-y-8">
            {/* Status + Date */}
            <div className="flex justify-between items-center">
              <span
                className={`inline-block px-4 py-2 text-xs font-label-bold uppercase tracking-wider border ${
                  statusColors[order.status] ?? "text-secondary border-white/15 bg-white/5"
                }`}
              >
                {order.status}
              </span>
              <span className="font-label-sm text-sm text-secondary">
                {formatDate(order.date)}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <h3 className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Items
              </h3>
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b border-white/10 pb-4"
                >
                  {item.imageUrl && (
                    <div className="w-16 h-20 bg-surface-container shrink-0 overflow-hidden border border-white/10">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-label-bold text-sm text-primary uppercase tracking-wide">
                      {item.name}
                    </h4>
                    <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                      Size: {item.size}
                    </p>
                    <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                      Qty: {item.quantity}
                    </p>
                    <span className="font-label-bold text-primary-fixed text-sm">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-white/15 pt-4">
              <span className="font-headline-md text-headline-md text-primary uppercase">
                Total
              </span>
              <span className="font-headline-md text-headline-md text-primary-fixed">
                Rs. {order.total.toLocaleString("en-PK")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
