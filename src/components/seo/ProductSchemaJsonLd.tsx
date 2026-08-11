import JsonLdScript from "@/components/seo/JsonLdScript";
import { productJsonLd } from "@/lib/seo";

interface ProductSchemaJsonLdProps {
  product: {
    name: string;
    slug?: string | null;
    price?: string;
    priceValue?: number;
    description?: string;
    status?: string;
    stock?: number;
    imageUrl?: string | null;
    imageSecondaryUrl?: string | null;
  };
}

export default function ProductSchemaJsonLd({ product }: ProductSchemaJsonLdProps) {
  return <JsonLdScript data={productJsonLd(product)} />;
}