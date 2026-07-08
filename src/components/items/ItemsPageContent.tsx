"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
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

export default function ItemsPageContent() {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("");
  const searchQuery = useSearchStore((s) => s.query);

  const products = useQuery(api.products.listProducts);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = products.filter(
      (p) => p.status !== "draft" && p.category.toLowerCase() === "tees"
    );

    const q = searchQuery.trim().toLowerCase();
    const min = priceMin ? parseFloat(priceMin) : NaN;
    const max = priceMax ? parseFloat(priceMax) : NaN;

    result = result.filter((p) => {
      const price = p.priceValue ?? 0;

      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;

      return true;
    });

    if (sortBy && sortFns[sortBy]) {
      result = [...result].sort(sortFns[sortBy]);
    }

    return result;
  }, [products, searchQuery, priceMin, priceMax, sortBy]);

  return (
    <>
      <ItemsFilterBar
        totalItems={filtered.length}
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
