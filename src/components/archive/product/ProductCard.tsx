"use client";

import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  hoverImageSrc?: string;
  badge?: {
    text: string;
    type: "new" | "limited" | "soldout";
  };
}

export default function ProductCard({
  name,
  price,
  description,
  imageSrc,
  hoverImageSrc,
  badge
}: ProductCardProps) {
  const isSoldOut = badge?.type === "soldout";

  return (
    <div className="product-card border border-white/15 relative overflow-hidden group flex flex-col bg-surface-container-lowest">
      {/* Product Image Frame */}
      <div className="aspect-[3/4] bg-surface-container-lowest relative overflow-hidden w-full">
        {/* Main Product Image */}
        <Image 
          src={imageSrc} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={`object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${
            hoverImageSrc ? "group-hover:opacity-0" : "group-hover:scale-105"
          }`}
        />

        {/* Hover Image Swap */}
        {hoverImageSrc && !isSoldOut && (
          <Image 
            src={hoverImageSrc} 
            alt={`${name} hover view`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
        )}

        {/* Quick Add Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-x-4 bottom-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button className="w-full bg-primary text-background py-3 font-label-bold text-[11px] tracking-wider uppercase neon-glow cursor-pointer transition-all">
              QUICK ADD ({price})
            </button>
          </div>
        )}

        {/* Badges */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 select-none">
            {badge.type === "new" && (
              <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
                {badge.text}
              </span>
            )}
            {badge.type === "limited" && (
              <span className="border border-primary-fixed text-primary-fixed bg-black/60 backdrop-blur-sm text-[10px] font-bold px-2 py-1 tracking-widest uppercase">
                {badge.text}
              </span>
            )}
            {badge.type === "soldout" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center" />
            )}
          </div>
        )}

        {/* Sold Out Visual Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 select-none">
            <span className="font-headline-md text-headline-md text-primary/30 rotate-[-45deg] border-y border-primary/20 px-8 py-1 tracking-widest">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Card Info Bottom */}
      <div className="p-6 space-y-2 bg-surface-container-lowest">
        <div className="flex justify-between items-start gap-4">
          <h4 className={`font-label-bold text-sm tracking-wider transition-colors ${
            isSoldOut ? "text-secondary/60 line-through" : "text-primary group-hover:text-primary-fixed"
          }`}>
            {name}
          </h4>
          <span className={`font-label-bold text-sm ${isSoldOut ? "text-secondary/60" : "text-primary-fixed"}`}>
            {price}
          </span>
        </div>
        <p className={`text-[12px] uppercase tracking-wide ${isSoldOut ? "text-secondary/30" : "text-secondary"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
