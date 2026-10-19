"use client";

import { useMemo, useState } from "react";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { buildStorageUrlQueries } from "@/lib/storageQueries";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  slug: string;
  name: string;
  price: string;
  description: string;
  imageId?: string;
  imageSecondaryId?: string;
  status?: string;
  stock?: number;
  badge?: string;
  colorVariants?: {
    name: string;
    hex?: string;
    imageId?: string;
    imageSecondaryId?: string;
  }[];
}

export default function ProductCard({
  slug,
  name,
  price,
  description,
  imageId,
  imageSecondaryId,
  status,
  stock,
  badge,
  colorVariants,
}: ProductCardProps) {
  const mainUrl = useQuery(
    api.storage.getUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageId ? { storageId: imageId as any } : "skip"
  );
  const hoverUrl = useQuery(
    api.storage.getUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageSecondaryId ? { storageId: imageSecondaryId as any } : "skip"
  );

  const variants = colorVariants ?? [];
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Memoized so the `useQueries` object identity is stable across renders —
  // Convex's useSubscription render-phase-setStates on identity change.
  const variantPrimaryQueries = useMemo(
    () =>
      buildStorageUrlQueries(
        (colorVariants ?? []).map((v) => v.imageId),
        "p"
      ),
    [colorVariants]
  );
  const variantSecondaryQueries = useMemo(
    () =>
      buildStorageUrlQueries(
        (colorVariants ?? []).map((v) => v.imageSecondaryId),
        "s"
      ),
    [colorVariants]
  );

  const variantPrimaryResults = useQueries(variantPrimaryQueries);
  const variantSecondaryResults = useQueries(variantSecondaryQueries);

  const activeVariant = variants[selectedVariantIdx];
  const variantPrimary = variantPrimaryResults[`p${selectedVariantIdx}`];
  const variantSecondary = variantSecondaryResults[`s${selectedVariantIdx}`];

  const imageSrc = typeof variantPrimary === "string" ? variantPrimary : mainUrl ?? "";
  const hoverImageSrc = activeVariant
    ? typeof variantSecondary === "string"
      ? variantSecondary
      : undefined
    : hoverUrl ?? undefined;

  const isSoldOut = status === "soldout" || stock === 0;

  const cardClassName = `border-r border-b border-black/15 relative overflow-hidden group flex flex-col bg-surface-container-lowest ${
    isSoldOut ? "cursor-not-allowed pointer-events-none select-none" : ""
  }`;
  const inner = (
    <>
      <div className="aspect-[3/4] bg-surface-container-lowest relative overflow-hidden w-full">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${
              hoverImageSrc && !isSoldOut
                ? "group-hover:opacity-0"
                : "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-surface-container animate-pulse" />
        )}

        {hoverImageSrc && !isSoldOut && (
          <Image
            src={hoverImageSrc}
            alt={`${name} alternate view`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
        )}

        {!isSoldOut && (
          <div className="absolute inset-x-2 md:inset-x-4 bottom-2 md:bottom-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button className="w-full bg-primary text-background py-2 md:py-3 font-label-bold text-[10px] md:text-[11px] tracking-wider uppercase neon-glow cursor-pointer transition-all">
              QUICK ADD ({price})
            </button>
          </div>
        )}

        {badge && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 select-none">
            <span
              className={`text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 tracking-widest uppercase ${
                badge === "hot"
                  ? "bg-primary text-background"
                  : "bg-primary-fixed text-on-primary-fixed"
              }`}
            >
              {badge === "hot" ? "HOT" : "NEW"}
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 select-none">
            <span className="font-headline-md text-headline-md text-primary/30 rotate-[-45deg] border-y border-primary/20 px-8 py-1 tracking-widest">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="p-3 md:p-6 space-y-1.5 bg-surface-container-lowest">
        <div className="flex justify-between items-start gap-2">
          <h4
            className={`font-label-bold text-xs md:text-sm tracking-wider transition-colors ${
              isSoldOut
                ? "text-secondary/60 line-through"
                : "text-primary group-hover:text-primary-fixed"
            }`}
          >
            {name}
          </h4>
          <span
            className={`font-label-bold text-xs md:text-base shrink-0 ${
              isSoldOut ? "text-secondary/60" : "text-primary-fixed"
            }`}
          >
            {price}
          </span>
        </div>
        <p
          className={`text-[10px] md:text-[12px] uppercase tracking-wide ${
            isSoldOut ? "text-secondary/30" : "text-secondary"
          }`}
        >
          {description}
        </p>
        {variants.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {variants.slice(0, 6).map((variant, i) => (
              <button
                key={i}
                type="button"
                title={variant.name}
                aria-label={`Select ${variant.name}`}
                aria-pressed={i === selectedVariantIdx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedVariantIdx(i);
                }}
                className={`w-3 h-3 rounded-full border border-black/20 transition-all hover:scale-110 cursor-pointer ${
                  i === selectedVariantIdx
                    ? "ring-2 ring-black ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: variant.hex || "#000" }}
              />
            ))}
            {variants.length > 6 && (
              <span className="w-3 h-3 rounded-full border border-black/20 flex items-center justify-center text-[8px] font-label-bold text-secondary">
                +{variants.length - 6}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  if (isSoldOut) {
    return <div className={cardClassName}>{inner}</div>;
  }

  return (
    <Link href={`/product/${slug}`} className={cardClassName}>
      {inner}
    </Link>
  );
}
