"use client";

import { useState } from "react";

interface Spec {
  label: string;
  value: string;
}

interface RelatedProduct {
  name: string;
  category: string;
  price: string;
  imageSrc: string;
  slug: string;
  soldOut?: boolean;
}

interface ProductPurchasePanelProps {
  name: string;
  price: string;
  description: string;
  badge?: string;
  material?: string;
  stockRemaining: number;
  stockTotal: number;
  sizes: string[];
  specs: Spec[];
  relatedProducts: RelatedProduct[];
}

export default function ProductPurchasePanel({
  name,
  price,
  description,
  badge,
  material,
  stockRemaining,
  stockTotal,
  sizes,
  specs,
  relatedProducts,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const stockPct = Math.round((stockRemaining / stockTotal) * 100);

  function handleAddToCart() {
    if (!selectedSize) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="flex flex-col gap-10">

      {/* ── Title & Price ─────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex justify-between items-start gap-4">
          <h1
            className="font-headline-lg uppercase leading-none tracking-tight text-primary"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: "1.05", letterSpacing: "-0.02em", fontFamily: "var(--font-syne)" }}
          >
            {name}
          </h1>
          <div className="flex flex-col items-end shrink-0">
            <span
              className="font-headline-md text-primary-fixed"
              style={{ fontSize: "clamp(22px, 2.5vw, 32px)", lineHeight: "1.2", fontWeight: 700, fontFamily: "var(--font-syne)" }}
            >
              {price}
            </span>
            <span className="font-label-sm text-secondary opacity-60 tracking-widest text-[11px]">TAX INCL.</span>
          </div>
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-2">
          {badge && (
            <span className="px-2 py-1 border border-primary-fixed text-primary-fixed font-label-bold text-[11px] tracking-widest uppercase">
              {badge}
            </span>
          )}
          {material && (
            <span className="px-2 py-1 border border-white/15 text-secondary font-label-bold text-[11px] tracking-widest uppercase">
              {material}
            </span>
          )}
        </div>
      </div>

      {/* ── Description + Stock bar ────────────────────── */}
      <div className="space-y-5">
        <p className="font-body-lg text-secondary leading-relaxed text-[16px]">
          {description}
        </p>

        {/* 1px razor divider */}
        <div className="w-full h-px bg-white/15" />

        {/* Stock urgency indicator */}
        <div>
          <div className="flex items-center gap-3 text-primary-fixed mb-3">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-label-bold tracking-wider text-[12px] uppercase">
              ONLY {stockRemaining} PIECES REMAINING
            </span>
          </div>
          {/* Stock progress bar */}
          <div className="w-full h-[3px] bg-white/5 overflow-hidden">
            <div
              className="h-full bg-primary-fixed transition-all duration-1000 ease-out"
              style={{ width: `${stockPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Size Selector ─────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <label className="font-label-bold tracking-widest uppercase text-[12px] text-primary">
            SELECT SIZE
          </label>
          <button className="font-label-bold text-[11px] underline text-secondary hover:text-primary-fixed transition-colors tracking-widest uppercase cursor-pointer">
            SIZE GUIDE
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => {
            const isActive = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-14 flex items-center justify-center font-label-bold text-[13px] tracking-wider transition-all active:scale-95 cursor-pointer border ${
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed border-primary-fixed"
                    : "border-white/15 text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {!selectedSize && (
          <p className="text-[11px] font-label-bold text-secondary/50 tracking-wider uppercase">
            → PLEASE SELECT A SIZE TO CONTINUE
          </p>
        )}
      </div>

      {/* ── Quantity ──────────────────────────────────── */}
      <div className="space-y-3">
        <label className="font-label-bold tracking-widest uppercase text-[12px] text-primary">
          QUANTITY
        </label>
        <div className="flex items-center border border-white/15 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-12 h-12 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/5 transition-all active:scale-90 cursor-pointer border-r border-white/15 text-xl"
          >
            −
          </button>
          <span className="w-14 h-12 flex items-center justify-center font-label-bold text-primary text-[14px] tracking-widest select-none">
            {String(quantity).padStart(2, "0")}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(stockRemaining, q + 1))}
            className="w-12 h-12 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/5 transition-all active:scale-90 cursor-pointer border-l border-white/15 text-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* ── CTA Buttons ───────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <button
          id="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full h-16 font-label-bold text-[13px] tracking-widest uppercase transition-all active:scale-[0.98] cursor-pointer neon-glow border ${
            addedToCart
              ? "bg-on-primary-fixed text-primary-fixed border-on-primary-fixed"
              : selectedSize
              ? "bg-primary-fixed text-on-primary-fixed border-primary-fixed hover:bg-black hover:text-primary hover:border-primary"
              : "bg-white/5 text-secondary/30 border-white/10 cursor-not-allowed"
          }`}
        >
          {addedToCart ? "✓ ADDED TO ARCHIVE" : `ADD TO ARCHIVE — ${price}`}
        </button>

        <button
          disabled={!selectedSize}
          className={`w-full h-16 font-label-bold text-[13px] tracking-widest uppercase transition-all active:scale-[0.98] cursor-pointer border ${
            selectedSize
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-white/10 text-secondary/30 cursor-not-allowed"
          }`}
        >
          EXPRESS CHECKOUT
        </button>
      </div>

      {/* ── Specifications Accordion ──────────────────── */}
      <div className="border border-white/15">
        <button
          onClick={() => setSpecsOpen((o) => !o)}
          className="w-full p-5 border-b border-white/15 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors group"
        >
          <span className="font-label-bold tracking-widest uppercase text-[12px] text-primary">
            SPECIFICATIONS
          </span>
          <span
            className={`material-symbols-outlined text-secondary transition-transform duration-300 ${specsOpen ? "rotate-180" : ""}`}
          >
            expand_more
          </span>
        </button>

        {specsOpen && (
          <div className="grid grid-cols-2 divide-x divide-y divide-white/15">
            {specs.map((spec, i) => (
              <div key={i} className="p-5 space-y-1">
                <span className="block text-secondary font-label-bold text-[10px] tracking-[0.15em] uppercase">
                  {spec.label}
                </span>
                <span className="font-body-md text-primary text-[13px]">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Trust Signals ─────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3">
        <div className="p-4 bg-surface-container-low border-l-2 border-primary-fixed flex items-start gap-4">
          <span className="material-symbols-outlined text-primary-fixed text-[22px] shrink-0">
            package_2
          </span>
          <div>
            <h4 className="font-label-bold text-[12px] tracking-widest uppercase text-primary">
              SAME-DAY DISPATCH
            </h4>
            <p className="font-label-sm text-secondary text-[12px] mt-1 leading-relaxed">
              Orders placed before 4PM PKT ship same day via express logistics.
            </p>
          </div>
        </div>
        <div className="p-4 bg-surface-container-low border-l-2 border-white/15 flex items-start gap-4">
          <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
            security
          </span>
          <div>
            <h4 className="font-label-bold text-[12px] tracking-widest uppercase text-primary">
              CRYPTO SECURE CHECKOUT
            </h4>
            <p className="font-label-sm text-secondary text-[12px] mt-1 leading-relaxed">
              End-to-end encrypted purchase architecture. Visa, Mastercard, JazzCash.
            </p>
          </div>
        </div>
        <div className="p-4 bg-surface-container-low border-l-2 border-white/15 flex items-start gap-4">
          <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
            replay
          </span>
          <div>
            <h4 className="font-label-bold text-[12px] tracking-widest uppercase text-primary">
              FREE RETURNS — 14 DAYS
            </h4>
            <p className="font-label-sm text-secondary text-[12px] mt-1 leading-relaxed">
              Hassle-free returns within 14 days. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
