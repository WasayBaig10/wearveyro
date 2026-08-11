import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { SITE_URL } from "@/lib/seo";

export async function GET() {
  let productSlugs: string[] = [];
  try {
    const products = await fetchQuery(api.products.listProductSlugs);
    productSlugs = products.map((p: any) => p.slug).filter(Boolean);
  } catch (error) {
    console.error("[sitemap] Failed to fetch product slugs:", error);
  }

  const staticRoutes = ["", "/shop", "/items", "/shipping", "/privacy", "/terms"];

  const xml = `<?xml-stylesheet type="text/xsl" href="//www.google.com/schemas/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>${route === "" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("")}
  ${productSlugs
    .map(
      (slug) => `
    <url>
      <loc>${SITE_URL}/product/${encodeURIComponent(slug)}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}