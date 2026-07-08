import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import ItemsHeader from "@/components/items/ItemsHeader";
import ItemsMarquee from "@/components/items/ItemsMarquee";
import ItemsPageContent from "@/components/items/ItemsPageContent";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WEARVEYRO | SHOP — The Archive",
  description:
    "Browse the wearveyro archive. Limited-release outerwear, tops, and accessories.",
  openGraph: {
    title: "WEARVEYRO | SHOP — The Archive",
    description:
      "Browse the wearveyro archive. Limited-release outerwear, tops, and accessories.",
  },
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1600px] mx-auto pt-28 md:pt-32 pb-24 px-container-margin">
        <ItemsHeader />
        <ItemsPageContent />
        <ItemsMarquee />
      </main>
      <Footer />
    </>
  );
}
