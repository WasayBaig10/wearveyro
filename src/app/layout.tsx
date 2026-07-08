import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Wearveyro | Minimalist High-End Apparel",
  description:
    "A curated collection of high-end, minimal clothing. Discover our latest drops and archival pieces.",
  openGraph: {
    title: "Wearveyro | Minimalist High-End Apparel",
    description:
      "A curated collection of high-end, minimal clothing. Discover our latest drops and archival pieces.",
    url: process.env.SITE_URL || "http://localhost:3000",
    type: "website",
  },
  icons: { shortcut: '/logo.png' },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/*
  Deployment Prep:
  Once you move to a public domain, add a robots.txt file to the public/ folder:
    public/robots.txt

  Example content:
    User-agent: *
    Allow: /
    Sitemap: https://yourdomain.com/sitemap.xml
*/

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={cn("dark", "antialiased", syne.variable, plusJakartaSans.variable, "font-sans", geist.variable)}
    >
      <body className="bg-background text-on-background font-body-md min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
