import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="py-section-gap-lg border-t border-white/15 grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-16">
      <div className="md:col-span-4 space-y-6">
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary select-none">
          CRAFTED FOR THE REBEL
        </h2>
        <p className="text-secondary font-body-lg leading-relaxed">
          wearveyro is more than a label. It&apos;s a digital-native movement
          born in the streets, blending brutalist geometry with the precision of
          luxury tailoring. Every stitch is an act of defiance against the
          mundane.
        </p>
        <div className="pt-4">
          <Link
            className="inline-flex items-center gap-4 group cursor-pointer"
            href="/shop"
          >
            <span className="font-label-bold text-label-bold border-b border-primary-fixed pb-0.5 tracking-widest">
              READ OUR MANIFESTO
            </span>
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-[18px]">
              arrow_right_alt
            </span>
          </Link>
        </div>
      </div>

      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
        <div className="border border-white/15 p-6 md:p-8 space-y-4 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-primary-fixed text-4xl select-none">
            security
          </span>
          <h4 className="font-headline-md text-[20px] uppercase text-primary">
            SECURE VAULT
          </h4>
          <p className="text-secondary text-sm leading-relaxed">
            Every piece is verified on the blockchain for authenticity and
            lifetime ownership tracking.
          </p>
        </div>
        <div className="border border-white/15 p-6 md:p-8 space-y-4 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-primary-fixed text-4xl select-none">
            bolt
          </span>
          <h4 className="font-headline-md text-[20px] uppercase text-primary">
            RAPID SHIP
          </h4>
          <p className="text-secondary text-sm leading-relaxed">
            Domestic orders processed and shipped within 24 hours via express
            logistics network.
          </p>
        </div>
      </div>
    </section>
  );
}
