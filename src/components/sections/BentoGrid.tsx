import Image from "next/image";

import ProductCarousel from "./ProductCarousel";

export default function BentoGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-10 gap-gutter">
      <div className="md:col-span-3 group relative min-h-[280px] md:h-[600px] overflow-hidden border border-white/15 bg-surface-container-lowest">
        <Image
          src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80"
          alt="Man in a plain heavyweight t-shirt photographed against a neutral wall"
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="absolute inset-0 object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
          <p className="font-label-bold text-primary-fixed mb-1 tracking-wider">
            ESSENTIALS
          </p>
          <h3 className="font-headline-lg text-headline-lg uppercase text-primary">
            THE TEES
          </h3>
        </div>
      </div>

      <div className="md:col-span-7 md:h-[600px]">
        <ProductCarousel />
      </div>
    </section>
  );
}
