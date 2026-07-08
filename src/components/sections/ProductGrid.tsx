"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGrid() {
  const products = useQuery(api.products.listProducts);

  const activeProducts =
    products?.filter(
      (p) => p.status !== "draft" && p.category.toLowerCase() === "tees"
    ) ?? [];

  return (
    <section>
      <div className="flex justify-between items-end border-b border-white/15 pb-4">
        <h2 className="font-headline-lg text-headline-lg text-primary uppercase select-none">
          CURATED DROPS
        </h2>
        <Link
          className="font-label-bold text-label-bold text-secondary hover:text-primary transition-all hover:line-through tracking-widest"
          href="/shop"
        >
          VIEW ALL
        </Link>
      </div>

      {products === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-white/15">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r border-b border-white/15">
              <Skeleton className="aspect-[3/4] rounded-none bg-surface-container" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 rounded-none bg-surface-container w-3/4" />
                <Skeleton className="h-3 rounded-none bg-surface-container w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : activeProducts.length === 0 ? (
        <div className="border border-white/15 p-12 text-center">
          <p className="font-label-bold text-secondary tracking-widest uppercase">
            No products available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-white/15">
          {activeProducts.map((product) => (
            <ProductCard
              key={product._id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              description={product.description}
              imageId={product.imageId}
              imageSecondaryId={product.imageSecondaryId}
              status={product.status}
              stock={product.stock}
            />
          ))}
        </div>
      )}
    </section>
  );
}
