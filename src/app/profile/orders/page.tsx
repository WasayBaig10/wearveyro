"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrderDetailsModal from "@/components/orders/OrderDetailsModal";
import { Skeleton } from "@/components/ui/skeleton";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  shipped: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  delivered: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
};

export default function ProfileOrdersPage() {
  const { user, isSignedIn } = useUser();
  const orders = useQuery(
    api.orders.listUserOrders,
    user?.id ? { userId: user.id } : "skip"
  );

  const [selectedOrder, setSelectedOrder] = useState<{
    id: Id<"orders">;
    displayId: string;
  } | null>(null);

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto pt-28 pb-24 px-container-margin">
        <h1 className="font-display-xl text-display-xl uppercase tracking-tighter leading-none mb-12">
          My Orders
        </h1>

        {!isSignedIn ? (
          <div className="text-center py-24 space-y-6">
            <p className="font-headline-md text-secondary">
              Sign in to view your orders.
            </p>
            <Link
              href="/sign-in"
              className="inline-block font-label-bold text-label-bold text-primary-fixed border border-primary-fixed px-6 py-3 hover:bg-primary-fixed hover:text-on-primary-fixed transition-all uppercase tracking-widest"
            >
              Sign In
            </Link>
          </div>
        ) : orders === undefined ? (
          <div className="overflow-x-auto border border-white/15">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-left">
                  <th className="pb-4 pr-6 pt-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Order ID
                  </th>
                  <th className="pb-4 pr-6 pt-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Date
                  </th>
                  <th className="pb-4 pr-6 pt-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Status
                  </th>
                  <th className="pb-4 pt-4 text-right font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-5 pr-6">
                      <Skeleton className="h-4 w-24 rounded-none bg-surface-container" />
                    </td>
                    <td className="py-5 pr-6">
                      <Skeleton className="h-4 w-20 rounded-none bg-surface-container" />
                    </td>
                    <td className="py-5 pr-6">
                      <Skeleton className="h-5 w-16 rounded-none bg-surface-container" />
                    </td>
                    <td className="py-5 text-right">
                      <Skeleton className="h-4 w-24 ml-auto rounded-none bg-surface-container" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 space-y-6 border border-white/15 bg-surface-container-lowest">
            <p className="font-headline-md text-secondary uppercase tracking-wider">
              No orders yet.
            </p>
            <Link
              href="/shop"
              className="inline-block font-label-bold text-label-bold text-primary-fixed border border-primary-fixed px-6 py-3 hover:bg-primary-fixed hover:text-on-primary-fixed transition-all uppercase tracking-widest"
            >
              Browse Drops
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-left">
                  <th className="pb-4 pr-6 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Order ID
                  </th>
                  <th className="pb-4 pr-6 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Date
                  </th>
                  <th className="pb-4 pr-6 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Status
                  </th>
                  <th className="pb-4 text-right font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-5 pr-6">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedOrder({
                            id: order._id,
                            displayId: order.orderId,
                          })
                        }
                        className="font-label-bold text-sm text-primary-fixed tracking-wide underline underline-offset-2 decoration-primary-fixed/30 hover:decoration-primary-fixed transition-colors cursor-pointer"
                      >
                        {order.orderId}
                      </button>
                    </td>
                    <td className="py-5 pr-6">
                      <span className="font-label-sm text-sm text-secondary">
                        {formatDate(order.date)}
                      </span>
                    </td>
                    <td className="py-5 pr-6">
                      <span
                        className={`inline-block px-3 py-1 text-[10px] font-label-bold uppercase tracking-wider border ${
                          statusColors[order.status] ?? "text-secondary border-white/15 bg-white/5"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <span className="font-label-bold text-sm text-primary-fixed">
                        Rs. {order.total.toLocaleString("en-PK")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder.id}
          displayId={selectedOrder.displayId}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <Footer />
    </>
  );
}
