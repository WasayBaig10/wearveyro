"use client";

import { useState } from "react";

interface ProductInfoProps {
  name?: string;
  price?: string;
  description?: string;
  sizes?: string[];
  stock?: number;
  isSoldOut?: boolean;
  isAdded?: boolean;
  onAddToCart?: (size: string) => void;
  onCheckout?: (size: string) => void;
}

const sizeChart = [
  { size: "S", chest: "36", length: "27", shoulder: "17" },
  { size: "M", chest: "38", length: "28", shoulder: "18" },
  { size: "L", chest: "40", length: "29", shoulder: "19" },
  { size: "XL", chest: "42", length: "30", shoulder: "20" },
];

export default function ProductInfo({
  name = "VORTEX GRAIL TEE",
  price = "Rs. 4,800",
  description = "Engineered for the digital nomad. The Vortex Grail Tee features a relaxed, drop-shoulder silhouette constructed from our custom-developed heavy-weight jersey.",
  sizes = ["S", "M", "L", "XL"],
  stock,
  isSoldOut = false,
  isAdded,
  onAddToCart,
  onCheckout,
}: ProductInfoProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    onAddToCart?.(selectedSize);
  }

  function handleCheckout() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    onCheckout?.(selectedSize);
  }

  return (
    <section className="px-container-margin py-12 md:py-16 bg-background overflow-hidden">
      <div className="w-full flex flex-col gap-6">
        {/* Title & Price */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="font-headline-lg text-headline-lg max-w-[70%] uppercase">
              {name}
            </h1>
            <div className="flex flex-col items-end shrink-0">
              <span className="font-headline-md text-headline-md text-primary-fixed">
                {price}
              </span>
              <span className="font-label-sm text-label-sm text-secondary opacity-60">
                TAX INCL.
              </span>
            </div>
          </div>

          {/* Stock indicator */}
          {typeof stock === "number" && (
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSoldOut ? "bg-white/25" : stock <= 5 ? "bg-error animate-pulse" : "bg-emerald-500"
                }`}
              />
              <span
                className={`font-label-bold text-[11px] uppercase tracking-widest ${
                  isSoldOut ? "text-error" : stock <= 5 ? "text-error" : "text-emerald-500"
                }`}
              >
                {isSoldOut ? "Sold Out" : stock <= 5 ? `Low Stock: Only ${stock} left` : "In Stock"}
              </span>
            </div>
          )}

        </div>

        {/* Description & Stock */}
        <div className="w-full flex flex-col gap-4">
          <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Size Selector */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <label className="font-label-bold text-label-bold tracking-tighter uppercase">
              Select Size
            </label>
            <button
              type="button"
              onClick={() => setShowSizeGuide(true)}
              className="text-label-sm font-label-bold underline text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              SIZE GUIDE
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                disabled={isSoldOut}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`h-14 border flex items-center justify-center font-label-bold text-sm transition-all active:scale-95 cursor-pointer ${
                  size === selectedSize
                    ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed"
                    : "border-white/15 text-secondary hover:border-primary"
                } ${isSoldOut ? "opacity-40 cursor-not-allowed disabled:cursor-not-allowed" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Size error toast */}
        {sizeError && (
          <div className="bg-error/10 border border-error/30 px-4 py-3">
            <p className="font-label-bold text-[11px] uppercase tracking-widest text-error">
              Please select a size first
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="w-full flex flex-col gap-4">
          {isSoldOut ? (
            <div className="w-full h-16 flex items-center justify-center font-label-bold text-lg tracking-widest uppercase bg-white/5 text-secondary/50 border border-white/15 cursor-not-allowed select-none">
              SOLD OUT
            </div>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                className={`w-full h-16 font-label-bold text-lg tracking-widest uppercase transition-all active:scale-[0.98] cursor-pointer ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-primary-fixed text-on-primary hover:bg-black hover:text-white hover:border border-white neon-glow"
                }`}>
                {isAdded ? "ADDED TO ARCHIVE ✓" : "Add to Archive"}
              </button>
              <button
                onClick={handleCheckout}
                className="w-full h-16 border border-white text-white font-label-bold text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all active:scale-[0.98] cursor-pointer"
              >
                Express Checkout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          />
          <div className="relative w-full max-w-md border border-white/15 bg-surface-container-low">
            <div className="sticky top-0 px-6 py-4 border-b border-white/15 bg-surface-container-low flex justify-between items-center">
              <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
                Size Guide
              </h2>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <p className="font-label-sm text-sm text-secondary mb-6 uppercase tracking-wider">
                Measurements in inches
              </p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="pb-3 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary pr-4">Size</th>
                    <th className="pb-3 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary pr-4">Chest</th>
                    <th className="pb-3 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary pr-4">Length</th>
                    <th className="pb-3 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Shoulder</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row) => (
                    <tr key={row.size} className="border-b border-white/10">
                      <td className="py-3 pr-4 font-label-bold text-sm text-primary">{row.size}</td>
                      <td className="py-3 pr-4 font-label-sm text-sm text-secondary">{row.chest}</td>
                      <td className="py-3 pr-4 font-label-sm text-sm text-secondary">{row.length}</td>
                      <td className="py-3 font-label-sm text-sm text-secondary">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
