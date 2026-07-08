"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[201] bg-background border-l border-white/15 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/15">
              <div className="flex items-center gap-3">
                <h2 className="font-headline-md text-headline-md text-primary tracking-tight">
                  YOUR ARCHIVE
                </h2>
                {totalItems > 0 && (
                  <span className="font-label-bold text-label-bold text-primary-fixed bg-primary-fixed/10 px-2 py-0.5 tracking-wider">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-secondary hover:text-primary transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-secondary/30" />
                  <p className="font-label-bold text-label-bold text-secondary tracking-wider uppercase">
                    Your archive is empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="font-label-bold text-label-bold text-primary-fixed border-b border-primary-fixed pb-0.5 hover:line-through transition-all tracking-wider uppercase"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 border border-white/15 p-4 bg-surface-container-lowest"
                    >
                      <div className="relative w-20 h-24 bg-surface-container shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container animate-pulse" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-label-bold text-label-bold text-primary truncate tracking-wide uppercase">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.productId, item.size)}
                            className="text-secondary hover:text-error transition-colors cursor-pointer shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <span className="font-label-sm text-[11px] text-secondary tracking-wider">
                          Size: {item.size}
                        </span>
                        <span className="font-label-bold text-primary-fixed tracking-wide mb-3">
                          {item.price}
                        </span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-white/15">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity - 1)
                              }
                              className="p-1.5 text-secondary hover:text-primary transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 font-label-bold text-label-bold text-primary text-sm border-x border-white/15 min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.quantity + 1)
                              }
                              className="p-1.5 text-secondary hover:text-primary transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/15 px-6 py-6 space-y-4 bg-surface-container-lowest">
                <div className="flex justify-between items-center">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-headline-md text-headline-md text-primary-fixed">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-secondary opacity-50 uppercase tracking-wider">
                  Shipping &amp; taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full h-14 leading-[3.5rem] bg-primary-fixed text-on-primary-fixed font-label-bold text-lg tracking-widest uppercase hover:bg-black hover:text-white border border-transparent hover:border-white transition-all active:scale-[0.98] text-center neon-glow"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <button
                  onClick={onClose}
                  className="w-full font-label-bold text-label-bold text-secondary hover:text-primary transition-colors cursor-pointer text-center uppercase tracking-wider text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
