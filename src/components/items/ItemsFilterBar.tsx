"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const sortOptions = [
  { label: "PRICE: LOW-HIGH", value: "price-asc" },
  { label: "PRICE: HIGH-LOW", value: "price-desc" },
  { label: "NEWEST", value: "newest" },
  { label: "BEST SELLING", value: "best-selling" },
];

interface ItemsFilterBarProps {
  totalItems: number;
  priceMin: string;
  priceMax: string;
  onPriceMinChange: (v: string) => void;
  onPriceMaxChange: (v: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ItemsFilterBar({
  totalItems,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  sortBy,
  onSortChange,
}: ItemsFilterBarProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <section className="relative flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
      <div className="flex items-center gap-4 text-secondary font-label-sm shrink-0">
        <span className="font-label-bold text-[12px] tracking-wider">VIEWING {totalItems} SHIRTS</span>
        <div className="h-4 w-px bg-white/15" />
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-1.5 hover:text-primary transition-colors uppercase font-label-bold text-[12px] tracking-wider cursor-pointer"
          aria-expanded={filterOpen}
          aria-label="Toggle filters"
        >
          Filter <SlidersHorizontal size={14} />
        </button>
      </div>

      {filterOpen && (
        <div className="w-full md:w-72 absolute top-full right-0 mt-2 bg-surface-container border border-white/15 p-6 space-y-5 z-10">
          <h4 className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-primary">Sort By</h4>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(sortBy === opt.value ? "" : opt.value)}
                className={`font-label-bold text-[10px] uppercase tracking-wider border px-3 py-1.5 transition-colors cursor-pointer ${
                  sortBy === opt.value
                    ? "border-primary-fixed text-primary-fixed"
                    : "border-white/15 text-secondary hover:border-primary-fixed hover:text-primary-fixed"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-primary">Price Range (PKR)</h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={priceMin}
                onChange={(e) => onPriceMinChange(e.target.value)}
                placeholder="Min"
                className="w-full bg-surface border border-white/15 px-3 py-2 font-label-bold text-sm text-primary placeholder:text-white/30 focus:border-primary-fixed focus:ring-0 outline-none transition-colors"
              />
              <span className="text-secondary text-xs">—</span>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => onPriceMaxChange(e.target.value)}
                placeholder="Max"
                className="w-full bg-surface border border-white/15 px-3 py-2 font-label-bold text-sm text-primary placeholder:text-white/30 focus:border-primary-fixed focus:ring-0 outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
