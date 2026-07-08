"use client";

import { useState } from "react";

interface ProductInfoProps {
  name?: string;
  price?: string;
  description?: string;
  sizes?: string[];
  stockStatus?: "low" | "soldout" | "new" | "normal";
  stock?: number;
  inventoryPercent?: number;
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
  stockStatus,
  stock,
  inventoryPercent,
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
    const phone = "92318217144";
    const text = selectedSize
      ? `Hi! I would like to order the ${name} (Size: ${selectedSize}) for ${price}.`
      : `Hi! I would like to order the ${name} for ${price}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
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
                  stock <= 5 ? "bg-error animate-pulse" : "bg-emerald-500"
                }`}
              />
              <span
                className={`font-label-bold text-[11px] uppercase tracking-widest ${
                  stock <= 5 ? "text-error" : "text-emerald-500"
                }`}
              >
                {stock <= 5
                  ? `Low Stock: Only ${stock} left`
                  : "In Stock"}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 border border-primary-fixed text-primary-fixed text-label-sm font-label-bold tracking-widest uppercase">
              Limited Edition
            </span>
            <span className="px-2 py-1 border border-white/15 text-secondary text-label-sm font-label-bold tracking-widest uppercase">
              240GSM COTTON
            </span>
          </div>
        </div>

        {/* Description & Stock */}
        <div className="w-full flex flex-col gap-4">
          <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
            {description}
          </p>
          <div className="w-full h-px bg-white/15" />
          {(stockStatus === "low" || (typeof stock === "number" && stock > 0 && stock < 15)) && (
            <>
              <div className="flex items-center gap-3 text-primary-fixed">
                <span className="material-symbols-outlined [font-variation-settings:'FILL'_1]">
                  local_fire_department
                </span>
                <span className="font-label-bold text-label-bold">
                  ONLY {stock} PIECES REMAINING
                </span>
              </div>
              <div className="w-full h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-primary-fixed w-[12%] transition-all duration-1000 ease-out" />
              </div>
            </>
          )}
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
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`h-14 border flex items-center justify-center font-label-bold text-sm transition-all active:scale-95 cursor-pointer ${
                  size === selectedSize
                    ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed"
                    : "border-white/15 text-secondary hover:border-primary"
                }`}
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
        </div>

        {/* Specs Table */}
        <div className="w-full border border-white/15">
          <div className="p-6 border-b border-white/15 flex justify-between items-center">
            <span className="font-label-bold text-label-bold uppercase tracking-wider">
              Specifications
            </span>
            <span className="material-symbols-outlined text-secondary">
              expand_more
            </span>
          </div>
          <div className="grid grid-cols-2">
            {[
              { label: "FABRIC", value: "100% SUPIMA COTTON" },
              { label: "WEIGHT", value: "240 GSM HEAVY" },
              { label: "FIT", value: "BOX OVERSIZED" },
              { label: "ORIGIN", value: "KARACHI, PK" },
            ].map((spec, i) => (
              <div
                key={spec.label}
                className={`p-6 ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""} border-white/15`}
              >
                <span className="block text-secondary font-label-sm mb-1 tracking-wider uppercase">
                  {spec.label}
                </span>
                <span className="font-body-md text-primary">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full grid grid-cols-1 gap-4">
          <div className="p-4 bg-surface-container-low border-l-2 border-primary-fixed flex items-start gap-4">
            <span className="material-symbols-outlined text-primary-fixed">
              package_2
            </span>
            <div>
              <h4 className="font-label-bold text-label-bold uppercase tracking-wider">
                SAME-DAY DISPATCH
              </h4>
              <p className="text-label-sm text-secondary">
                Orders placed before 4PM PKT ship same day.
              </p>
            </div>
          </div>
          <div className="p-4 bg-surface-container-low border-l-2 border-white/15 flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary">
              security
            </span>
            <div>
              <h4 className="font-label-bold text-label-bold uppercase tracking-wider">
                CRYPTO SECURE
              </h4>
              <p className="text-label-sm text-secondary">
                End-to-end encrypted checkout architecture.
              </p>
            </div>
          </div>
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
