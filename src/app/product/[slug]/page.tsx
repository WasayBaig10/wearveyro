import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

import Navbar from "@/components/layout/Navbar";
import ProductMarquee from "@/components/product/ProductMarquee";
import ProductDetailContent from "@/components/product/ProductDetailContent";
import ProductRelated from "@/components/product/ProductRelated";
import ProductSchemaJsonLd from "@/components/seo/ProductSchemaJsonLd";
import { SITE_NAME } from "@/lib/seo";
import Footer from "@/components/layout/Footer";

async function getProduct(slug: string) {
  try {
    return await fetchQuery(api.products.getProductBySlug, { slug });
  } catch (error) {
    console.error("[product/[slug]] fetchQuery failed:", error);
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Shop Men's Shirts Online",
      description: "Browse premium men's shirts and streetwear apparel from Wearveyro.",
    };
  }

  const title = `${product.name} — Men's Shirts in Pakistan`;
  const description = `${product.name} by ${SITE_NAME}. ${
    product.description || "Shop this premium men's shirt online in Pakistan with nationwide delivery."
  }`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: `${product.name} — Shop Men's Shirts Online | ${SITE_NAME}`,
      description,
      images: product?.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <>
      <Navbar />
      {product && <ProductSchemaJsonLd product={product} />}
      <ProductMarquee />

      <main className="min-h-screen pt-4 pb-section-gap-lg">
        <ProductDetailContent productId={slug} />
      </main>

      <ProductRelated currentSlug={slug} />
      <Footer />
    </>
  );
}