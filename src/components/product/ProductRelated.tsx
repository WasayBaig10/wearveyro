"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";

interface ProductRelatedProps {
  currentSlug: string;
}

function RelatedCardSkeleton() {
  return (
    <div className="border border-white/15 animate-pulse">
      <div className="aspect-[4/5] bg-surface-container" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-3 bg-surface-container rounded w-1/2" />
      </div>
    </div>
  );
}

function RelatedCard({
  slug,
  name,
  category,
  price,
  imageId,
  status,
  stock,
}: {
  slug: string;
  name: string;
  category: string;
  price: string;
  imageId?: string;
  status: string;
  stock: number;
}) {
  const imageUrl = useQuery(
    api.storage.getUrl,
    imageId ? { storageId: imageId as any } : "skip"
  );

  const isSoldOut = status === "soldout" || stock === 0;

  return (
    <Link
      href={`/product/${slug}`}
      className={`group border border-white/15 hover:border-primary transition-colors ${
        isSoldOut ? "opacity-60 relative overflow-hidden" : ""
      }`}
    >
      {isSoldOut && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="bg-black text-white px-4 py-2 font-label-bold text-label-bold border border-white z-20 uppercase tracking-wider select-none">
            SOLD OUT
          </span>
        </div>
      )}
      <div className="aspect-[4/5] bg-surface overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-surface-container animate-pulse" />
        )}
      </div>
      <div className="p-4 flex justify-between items-end gap-4">
        <div>
          <span className="block font-label-bold text-sm uppercase tracking-tight">
            {name}
          </span>
          <span className="text-label-sm text-secondary uppercase tracking-wider">
            {category}
          </span>
        </div>
        {!isSoldOut && (
          <span className="font-label-bold text-primary-fixed text-sm shrink-0">
            {price}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function ProductRelated({ currentSlug }: ProductRelatedProps) {
  const products = useQuery(api.products.listProducts);

  const related = products
    ?.filter((p) => p.slug !== currentSlug && p.status !== "draft")
    .slice(0, 4) ?? [];

  return (
    <section className="border-t border-white/15 py-section-gap-lg px-container-margin overflow-hidden bg-surface-dim">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-headline-lg text-headline-lg mb-8 md:mb-12 uppercase">
          COMPLEMENTARY_ARCHIVE
        </h2>

        {products === undefined ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {Array.from({ length: 4 }).map((_, i) => (
              <RelatedCardSkeleton key={i} />
            ))}
          </div>
        ) : related.length === 0 ? (
          <p className="font-label-bold text-secondary tracking-widest uppercase">
            No other products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {related.map((product) => (
              <RelatedCard
                key={product._id}
                slug={product.slug}
                name={product.name}
                category={product.category}
                price={product.price}
                imageId={product.imageId}
                status={product.status}
                stock={product.stock}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
