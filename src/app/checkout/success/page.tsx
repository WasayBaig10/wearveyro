"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { buildStorageUrlQueries } from "@/lib/storageQueries";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function OrderItemsSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="w-16 h-20 bg-surface-container shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 bg-surface-container w-2/3" />
            <div className="h-2.5 bg-surface-container w-1/3" />
            <div className="h-2.5 bg-surface-container w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const order = useQuery(
    api.orders.getOrderByDisplayId,
    orderId ? { orderId } : "skip"
  );

  // Memoized on the items array (stable via Convex structural sharing) so the
  // useQueries object identity never changes across re-renders.
  const itemStorageQueries = useMemo(() => {
    const ids = order?.items.map((it) => it.imageId ?? null) ?? [];
    return buildStorageUrlQueries(ids, "i");
  }, [order?.items]);
  const itemStorageResults = useQueries(itemStorageQueries);

  function resolveItemImage(
    item: { imageUrl?: string | null; imageId?: string | null },
    index: number
  ): string | null {
    const clientUrl = itemStorageResults[`i${index}`];
    if (typeof clientUrl === "string" && clientUrl) return clientUrl;
    return item.imageUrl ?? null;
  }

  return (
    <main className="max-w-[600px] mx-auto pt-28 pb-24 px-container-margin">
      <div className="border border-black/15 bg-surface-container-lowest p-8 md:p-12 pb-10 md:pb-14 text-center">
        <div className="space-y-4 mb-8">
          <h1 className="font-display-xl text-display-xl uppercase tracking-tighter leading-none text-primary">
            Thank You For Your Order !
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-sm mx-auto leading-relaxed">
            Your order has been placed and is being processed.
            <br />
            You will shortly Receive an email and whatsapp message from our team.
          </p>
        </div>

        {orderId && (
          <div className="border border-black/15 bg-surface-container p-6 space-y-3 mb-8">
            <p className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Order ID
            </p>
            <p className="font-label-bold text-lg text-primary tracking-wide break-all">
              {orderId}
            </p>
          </div>
        )}

        <div className="text-left border-t border-black/15 pt-6 mb-8">
          <p className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary mb-4">
            Order Summary
          </p>

          {order === undefined ? (
            <OrderItemsSkeleton />
          ) : order === null || order.items.length === 0 ? (
            <p className="font-label-sm text-sm text-secondary">
              No item details available for this order.
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {order.items.map((item, i) => {
                  const src = resolveItemImage(item, i);
                  return (
                    <div
                      key={`${item.productId}-${i}`}
                      className="flex gap-4 border-b border-black/10 pb-4 last:border-b-0"
                    >
                      <div className="relative w-16 h-20 bg-surface-container shrink-0 overflow-hidden">
                        {src && (
                          <Image
                            src={src}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-label-bold text-sm text-primary truncate uppercase tracking-wide">
                          {item.name}
                        </h4>
                        <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                          Size: {item.size ?? "OS"}
                        </p>
                        <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-label-bold text-sm text-primary-fixed shrink-0">
                        {item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between border-t border-black/15 pt-4 mt-2">
                <span className="font-label-bold text-sm uppercase tracking-widest text-primary">
                  Total
                </span>
                <span className="font-label-bold text-sm text-primary-fixed">
                  Rs. {order.total.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-row gap-4 justify-center">
          <Link
            href="/profile/orders"
            className="h-14 text-wrap px-6 md:px-10 whitespace-nowrap bg-primary text-on-primary font-label-bold text-label-bold uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-black transition-all flex items-center justify-center"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="h-14 text-wrap px-6 md:px-10 whitespace-nowrap border border-black/15 text-secondary font-label-bold text-label-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
