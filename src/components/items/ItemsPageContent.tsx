"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "convex/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import ItemsFilterBar from "./ItemsFilterBar";
import ItemsProductGrid, { ProductGridSkeleton } from "./ItemsProductGrid";
import { useSearchStore } from "@/store/useSearchStore";

const sortFns: Record<string, (a: any, b: any) => number> = {
  "price-asc": (a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0),
  "price-desc": (a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0),
  "newest": (a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0),
  "best-selling": (a, b) => (a.stock ?? 0) - (b.stock ?? 0),
};

const CATEGORY_ALIASES: Record<string, string> = {
  "OVERSIZETEES": "OVERSIZE TEES",
  "OVERSIZETEE": "OVERSIZE TEES",
  "TOPS": "TOPS",
  "TEES": "TEES",
  "HOODIES": "HOODIES",
  "SWEATSHIRTS": "SWEATSHIRTS",
  "BASICS": "BASICS",
  "BOTTOMS": "BOTTOMS",
  "OUTERWEAR": "OUTERWEAR",
  "SHIRTS": "SHIRTS",
  "ACCESSORIES": "ACCESSORIES",
};

export default function ItemsPageContent() {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("");
  const searchQuery = useSearchStore((s) => s.query);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");

  const clearCategory = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const products = useQuery(api.products.listProducts);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = products.filter((p) => p.status !== "draft");

    const q = searchQuery.trim().toLowerCase();
    const min = priceMin ? parseFloat(priceMin) : NaN;
    const max = priceMax ? parseFloat(priceMax) : NaN;

    result = result.filter((p) => {
      const price = p.priceValue ?? 0;

      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (categoryParam) {
        const cat = p.category?.trim().toUpperCase();
        const paramCat = categoryParam.toUpperCase();
        const normalized = paramCat.replace(/[- ]/g, "");
        if (
          cat !== paramCat &&
          cat !== paramCat.replace(/[- ]/g, "") &&
          cat !== CATEGORY_ALIASES[normalized]
        )
          return false;
      }
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;

      return true;
    });

    if (sortBy && sortFns[sortBy]) {
      result = [...result].sort(sortFns[sortBy]);
    }

    return result;
  }, [products, searchQuery, priceMin, priceMax, sortBy, categoryParam]);

  return (
    <>
      <ItemsFilterBar
        totalItems={filtered.length}
        activeCategory={categoryParam ? categoryParam.toUpperCase() : undefined}
        onClearCategory={clearCategory}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {products === undefined ? (
        <ProductGridSkeleton />
      ) : (
        <ItemsProductGrid items={filtered} />
      )}
    </>
  );
}
