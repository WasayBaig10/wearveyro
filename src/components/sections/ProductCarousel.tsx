"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    alt: "Plain heavyweight t-shirt product photo on front view",
    label: "THE ESSENTIAL TEE",
  },
  {
    src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1400&q=80",
    alt: "Stack of folded 240gsm cotton t-shirts",
    label: "240GSM COTTON",
  },
  {
    src: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1400&q=80",
    alt: "Oversized t-shirt styled on a model",
    label: "RELAXED FIT",
  },
  {
    src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=1400&q=80",
    alt: "Fold-over collared long sleeve garment",
    label: "STRUCTURED SILHOUETTE",
  },
  {
    src: "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1400&q=80",
    alt: "Minimalist white crew neck t-shirt hanging",
    label: "BLANK CANVAS",
  },
];

const AUTOPLAY_MS = 5000;

export default function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.min(SLIDES.length - 1, Math.max(0, idx));
    if (clamped !== activeRef.current) {
      activeRef.current = clamped;
      setActive(clamped);
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const normalized = (index + SLIDES.length) % SLIDES.length;
    el.scrollTo({ left: normalized * el.clientWidth, behavior: "smooth" });
    activeRef.current = normalized;
    setActive(normalized);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(
      () => goTo(activeRef.current + 1),
      AUTOPLAY_MS
    );
  }, [goTo, stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return (
    <div
      className="relative h-[300px] md:h-[600px] overflow-hidden border border-white/15 bg-surface-container-lowest select-none"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={stop}
      onTouchEnd={start}
    >
      <div
        ref={trackRef}
        onScroll={syncActive}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="relative w-full h-full shrink-0 snap-start"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <h3 className="font-headline-lg text-headline-lg uppercase text-primary">
                {slide.label}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(active - 1)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md text-primary hover:bg-primary-fixed hover:text-on-primary-fixed hover:border-primary-fixed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(active + 1)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md text-primary hover:bg-primary-fixed hover:text-on-primary-fixed hover:border-primary-fixed transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 border border-white/15 bg-black/50 backdrop-blur-md px-4 py-2 select-none">
        <span className="font-label-bold text-primary-fixed text-[12px] tracking-wider whitespace-nowrap">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1 transition-all cursor-pointer ${
                i === active
                  ? "w-6 bg-primary-fixed"
                  : "w-3 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
