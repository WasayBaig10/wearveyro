"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="max-w-[600px] mx-auto pt-28 pb-24 px-container-margin">
      <div className="border border-white/15 bg-surface-container-lowest p-8 md:p-12 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-display-xl text-display-xl uppercase tracking-tighter leading-none text-primary-fixed">
            Thank You
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-sm mx-auto leading-relaxed">
            Your order has been placed and is being processed.
          </p>
        </div>

        {orderId && (
          <div className="border border-white/15 bg-surface-container p-6 space-y-2">
            <p className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Order ID
            </p>
            <p className="font-label-bold text-lg text-primary tracking-wide break-all">
              {orderId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/profile/orders"
            className="h-14 px-10 bg-primary-fixed text-on-primary-fixed font-label-bold text-label-bold uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-white transition-all flex items-center justify-center"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="h-14 px-10 border border-white/15 text-secondary font-label-bold text-label-bold uppercase tracking-widest hover:border-primary-fixed hover:text-primary-fixed transition-colors flex items-center justify-center"
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
