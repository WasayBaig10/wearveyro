"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";

interface ItemsProductCardProps {
  product: {
    _id: string;
    slug: string;
    name: string;
    price: string;
    category: string;
    imageId?: string;
    imageSecondaryId?: string;
    sizes: string[];
    stock: number;
    status: string;
    inventoryPercent?: number;
  };
}

export default function ItemsProductCard({ product }: ItemsProductCardProps) {
  const { slug, name, price, category, imageId, imageSecondaryId, sizes, stock, status, inventoryPercent } = product;

  const mainUrl = useQuery(
    api.storage.getUrl,
    imageId ? { storageId: imageId as any } : "skip"
  );
  const secondaryUrl = useQuery(
    api.storage.getUrl,
    imageSecondaryId ? { storageId: imageSecondaryId as any } : "skip"
  );

  const imagePrimary = mainUrl ?? "";
  const imageSecondary = secondaryUrl ?? undefined;

  const isSoldOut = status === "soldout" || stock === 0;
  const stockStatus = isSoldOut
    ? "soldout"
    : stock > 0 && stock < 15
      ? "low"
      : "normal";

  return (
    <Link href={`/product/${slug}`} className={`border-r border-b border-white/15 flex flex-col group relative ${isSoldOut ? "opacity-80" : ""}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-lowest">
        {imagePrimary ? (
          <Image
            src={imagePrimary}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className={`absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-opacity duration-500 group-hover:opacity-0 ${isSoldOut ? "brightness-50" : ""}`}
          />
        ) : (
          <div className="w-full h-full bg-surface-container animate-pulse" />
        )}

        {imageSecondary && !isSoldOut && (
          <Image
            src={imageSecondary}
            alt={`${name} detail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-headline-md text-headline-md -rotate-12 border-2 border-white/40 px-4 py-1 uppercase opacity-40 select-none">
              Sold Out
            </span>
          </div>
        )}

        {!isSoldOut && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 backdrop-blur-sm border-t border-primary-fixed translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="font-label-bold text-[10px] text-primary-fixed mb-2 tracking-wider">QUICK ADD SIZE</p>
            <div className="flex justify-between gap-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="flex-1 py-1.5 text-[10px] font-label-bold border border-white/30 hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer tracking-wider"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow bg-surface-container-lowest">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className={`font-label-bold text-sm uppercase tracking-tight ${isSoldOut ? "line-through decoration-primary-fixed" : "text-primary"}`}>
            {name}
          </h3>
          <span className={`font-label-bold text-sm shrink-0 ${isSoldOut ? "text-secondary" : "text-primary-fixed"}`}>
            {price}
          </span>
        </div>
        <p className="text-secondary font-label-sm text-[11px] uppercase mb-4 opacity-60 tracking-wider">
          ARCHIVE / {category}
        </p>

        {stockStatus === "low" && !isSoldOut && (
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
              <span className="text-[10px] font-label-bold uppercase text-primary-fixed tracking-wider">Low Stock</span>
            </div>
            <button className="material-symbols-outlined text-lg text-primary hover:text-primary-fixed transition-colors cursor-pointer">
              add_circle
            </button>
          </div>
        )}

        {stockStatus === "normal" && typeof inventoryPercent === "number" && !isSoldOut && (
          <div className="mt-auto">
            <div className="w-full h-[2px] bg-white/10 mb-2">
              <div className="h-full bg-primary-fixed transition-all" style={{ width: `${inventoryPercent}%` }} />
            </div>
            <div className="flex justify-between text-[9px] font-label-bold uppercase tracking-wider">
              <span className="text-secondary">Inventory Status</span>
              <span className="text-primary-fixed">{inventoryPercent}% Sold</span>
            </div>
          </div>
        )}

        {stockStatus === "normal" && !inventoryPercent && !isSoldOut && (
          <div className="mt-auto">
            <span className="block w-full py-2 border border-white/15 font-label-bold text-[10px] uppercase tracking-wider hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-300 text-center cursor-pointer">
              View Details
            </span>
          </div>
        )}

        {status === "active" && stock > 0 && !isSoldOut && (
          <div className="mt-auto">
            <span className="text-[10px] font-label-bold uppercase text-primary-fixed border border-primary-fixed px-2 py-0.5 tracking-wider">
              New Drop
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
