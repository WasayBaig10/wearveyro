"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
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
}: ProductCardProps) {
  const mainUrl = useQuery(
    api.storage.getUrl,
    imageId ? { storageId: imageId as any } : "skip"
  );
  const hoverUrl = useQuery(
    api.storage.getUrl,
    imageSecondaryId ? { storageId: imageSecondaryId as any } : "skip"
  );

  const imageSrc = mainUrl ?? "";
  const hoverImageSrc = hoverUrl ?? undefined;

  const isSoldOut = status === "soldout" || stock === 0;
  const isNew = status === "active" && stock !== undefined && stock > 0;

  return (
    <Link href={`/product/${slug}`} className="border-r border-b border-white/15 relative overflow-hidden group flex flex-col bg-surface-container-lowest">
      <div className="aspect-[3/4] bg-surface-container-lowest relative overflow-hidden w-full">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
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
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
        )}

        {!isSoldOut && (
          <div className="absolute inset-x-4 bottom-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button className="w-full bg-primary text-background py-3 font-label-bold text-[11px] tracking-wider uppercase neon-glow cursor-pointer transition-all">
              QUICK ADD ({price})
            </button>
          </div>
        )}

        {isNew && (
          <div className="absolute top-4 left-4 z-10 select-none">
            <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
              NEW
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

      <div className="p-4 md:p-6 space-y-2 bg-surface-container-lowest">
        <div className="flex justify-between items-start gap-4">
          <h4
            className={`font-label-bold text-sm tracking-wider transition-colors ${
              isSoldOut
                ? "text-secondary/60 line-through"
                : "text-primary group-hover:text-primary-fixed"
            }`}
          >
            {name}
          </h4>
          <span
            className={`font-label-bold text-sm shrink-0 ${
              isSoldOut ? "text-secondary/60" : "text-primary-fixed"
            }`}
          >
            {price}
          </span>
        </div>
        <p
          className={`text-[12px] uppercase tracking-wide ${
            isSoldOut ? "text-secondary/30" : "text-secondary"
          }`}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
