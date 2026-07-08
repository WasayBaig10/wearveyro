import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import ProductMarquee from "@/components/product/ProductMarquee";
import ProductDetailContent from "@/components/product/ProductDetailContent";
import ProductRelated from "@/components/product/ProductRelated";

export const metadata: Metadata = {
  title: "Product | WEARVEYRO",
  description: "View product details from the WEARVEYRO archive.",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <ProductMarquee />

      <main className="min-h-screen pt-4 pb-section-gap-lg">
        <ProductDetailContent productId={id} />
      </main>

      <ProductRelated currentSlug={id} />

      <footer className="bg-surface border-t border-white/15">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center px-container-margin py-8 gap-6">
          <div className="text-center md:text-left">
            <span className="font-headline-lg text-headline-lg text-primary tracking-tighter">
              wearveyro
            </span>
            <p className="font-label-sm text-label-sm text-secondary mt-2">
              ©2024 WEARVEYRO. ALL RIGHTS RESERVED.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-label-bold text-label-bold">
            <Link className="text-secondary hover:line-through hover:text-primary-fixed transition-all duration-300 cursor-pointer" href="/">
              DROPS
            </Link>
            <Link className="text-secondary hover:line-through hover:text-primary-fixed transition-all duration-300 cursor-pointer" href="/shop">
              ARCHIVE
            </Link>
            <Link className="text-secondary hover:line-through hover:text-primary-fixed transition-all duration-300 cursor-pointer" href="/">
              LEGAL
            </Link>
            <Link className="text-secondary hover:line-through hover:text-primary-fixed transition-all duration-300 cursor-pointer" href="/">
              SUPPORT
            </Link>
          </nav>
          <div className="flex gap-4">
            {["instagram", "twitter"].map((social) => (
              <a
                key={social}
                className="p-2 border border-white/15 hover:border-primary-fixed transition-colors"
                href="#"
                aria-label={social}
              >
                <svg
                  className="w-5 h-5 fill-current text-secondary hover:text-primary-fixed transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d={social === "instagram"
                    ? "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    : "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"}
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
