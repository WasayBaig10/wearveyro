export const SITE_NAME = "Wearveyro";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_KEYWORDS = [
  "men's shirts in Pakistan",
  "buy shirts online",
  "streetwear apparel Pakistan",
  "streetwear shirts Pakistan",
  "premium shirts Pakistan",
  "designer fashion Pakistan",
  "online clothing store Pakistan",
  "karachi streetwear",
  "lahore fashion",
  "wearveyro",
];

export const BRAND = { name: SITE_NAME, url: SITE_URL };

interface ProductShape {
  name: string;
  slug?: string | null;
  price?: string;
  priceValue?: number;
  description?: string;
  status?: string;
  stock?: number;
  imageUrl?: string | null;
  imageSecondaryUrl?: string | null;
  sizes?: string[];
  badge?: string | null;
}

function buildUrl(slug: string) {
  return `${SITE_URL}/product/${encodeURIComponent(slug)}`;
}

export function toAvailability(product: ProductShape): string {
  const soldOut =
    product.status === "soldout" ||
    (typeof product.stock === "number" && product.stock <= 0);
  return soldOut
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";
}

export function toPriceValue(product: ProductShape): number {
  if (typeof product.priceValue === "number" && product.priceValue > 0) {
    return product.priceValue;
  }
  const parsed = Number(String(product.price ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function productJsonLd(product: ProductShape) {
  const images = [
    product.imageUrl,
    product.imageSecondaryUrl,
  ].filter((u): u is string => typeof u === "string" && u.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(images.length ? { image: images } : {}),
    description: product.description || `${product.name} from Wearveyro`,
    sku: product.slug || undefined,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: toPriceValue(product),
      priceCurrency: "PKR",
      availability: toAvailability(product),
      itemCondition: "https://schema.org/NewCondition",
      url: product.slug ? buildUrl(product.slug) : SITE_URL,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 3600 * 1000)
        .toISOString()
        .slice(0, 10),
      seller: {
        "@type": "ClothingStore",
        name: SITE_NAME,
        url: SITE_URL,
      },
      shippingDetails: [
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 350,
            currency: "PKR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "PK",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 2,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 3,
              maxValue: 7,
              unitCode: "DAY",
            },
          },
        },
      ],
      areaServed: {
        "@type": "Place",
        name: "Pakistan",
      },
    },
  };
}

export function clothingStoreJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ClothingStore", "OnlineStore"],
    name: SITE_NAME,
    alternateName: "Wearveyro Apparel",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Wearveyro — men's shirts, streetwear apparel and premium fashion online in Pakistan. Buy shirts online with nationwide delivery.",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash on Delivery, Bank Transfer, Card Payment",
    priceRange: "PKR 500-15000",
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-PK",
    description:
      "Wearveyro — premium men's shirts and streetwear apparel in Pakistan. Shop trending shirts online with nationwide delivery across Pakistan.",
  };
}

export function escapeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}