"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import ShippingForm from "@/components/checkout/ShippingForm";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCartStore } from "../../store/useCartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce((sum, i) => sum + i.priceValue * i.quantity, 0);
  const shipping = 350;
  const total = subtotal + shipping;

  function handleSuccess(orderId: string) {
    clearCart();
    router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1600px] mx-auto pt-28 pb-24 px-container-margin">
        <h1 className="font-display-xl text-display-xl uppercase tracking-tighter leading-none mb-12">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-12">
            <ShippingForm />
            <CheckoutForm
              items={items.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
                size: i.size,
              }))}
              onSuccess={handleSuccess}
            />
          </div>
          <div className="lg:col-span-5">
            <aside className="bg-surface-container-lowest border border-white/15 p-6 md:p-8 md:sticky md:top-24 space-y-6">
              <h2 className="font-headline-md text-headline-md uppercase text-primary">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="font-label-sm text-sm text-secondary">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-4 border-b border-white/10 pb-4">
                        <div className="relative w-16 h-20 bg-surface-container shrink-0 overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-label-bold text-sm text-primary truncate uppercase tracking-wide">
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

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between font-label-bold text-sm text-secondary tracking-wider">
                      <span>Subtotal</span>
                      <span className="text-primary">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-label-bold text-sm text-secondary tracking-wider">
                      <span>Shipping</span>
                      <span className="text-primary">Rs. {shipping.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/15 pt-3 flex justify-between font-headline-md text-headline-md">
                      <span className="text-primary uppercase">Total</span>
                      <span className="text-primary-fixed">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
