import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import ProductMarquee from "@/components/product/ProductMarquee";
import ProductDetailContent from "@/components/product/ProductDetailContent";
import ProductRelated from "@/components/product/ProductRelated";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Product | WEARVEYRO",
  description: "View product details from the WEARVEYRO archive.",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("[product/[slug]/page.tsx] Resolved slug:", slug);

  return (
    <>
      <Navbar />
      <ProductMarquee />

      <main className="min-h-screen pt-4 pb-section-gap-lg">
        <ProductDetailContent productId={slug} />
      </main>

      <ProductRelated currentSlug={slug} />
      <Footer />
    </>
  );
}
