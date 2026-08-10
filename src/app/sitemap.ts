import type { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/items`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/shipping`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "monthly", priority: 0.2 },
  ];

  try {
    const products = await fetchQuery(api.products.listProductSlugs);
    for (const product of products) {
      if (!product.slug) continue;
      routes.push({
        url: `${SITE_URL}/product/${encodeURIComponent(product.slug)}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("[sitemap] fetchQuery failed:", error);
  }

  return routes;
}