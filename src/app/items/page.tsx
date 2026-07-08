import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import ItemsHeader from "@/components/items/ItemsHeader";
import ItemsMarquee from "@/components/items/ItemsMarquee";
import ItemsPageContent from "@/components/items/ItemsPageContent";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WEARVEYRO | EXPLORER — Volume 04 / The Archive",
  description:
    "Browse the wearveyro archive. Volume 04 features limited-release outerwear, tops, and accessories from Collection 004.",
  openGraph: {
    title: "WEARVEYRO | EXPLORER — Volume 04 / The Archive",
    description:
      "Browse the wearveyro archive. Volume 04 features limited-release outerwear, tops, and accessories from Collection 004.",
  },
  alternates: {
    canonical: "/items",
  },
};

export default function ItemsPage() {
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
