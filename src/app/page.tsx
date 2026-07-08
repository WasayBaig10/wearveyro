import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeBar from "@/components/sections/MarqueeBar";
import BentoGrid from "@/components/sections/BentoGrid";
import ProductGrid from "@/components/sections/ProductGrid";
import BrandStory from "@/components/sections/BrandStory";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "wearveyro | High-Fashion Rebellion",
  description:
    "wearveyro is a digital-native streetwear movement, blending brutalist geometry with the precision of luxury tailoring.",
  openGraph: {
    title: "wearveyro | High-Fashion Rebellion",
    description:
      "wearveyro is a digital-native streetwear movement, blending brutalist geometry with the precision of luxury tailoring.",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1600px] mx-auto pt-24 px-container-margin space-y-section-gap-lg">
        <Hero />
        <MarqueeBar />
        <BentoGrid />
        <ProductGrid />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
