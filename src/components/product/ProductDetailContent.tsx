"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCartStore } from "../../store/useCartStore";

import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ExpressCheckoutModal from "./ExpressCheckoutModal";

interface ProductDetailContentProps {
  productId: string;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="aspect-square bg-surface-container" />
      <div className="space-y-6 p-8">
        <div className="h-8 bg-surface-container w-3/4" />
        <div className="h-6 bg-surface-container w-1/4" />
        <div className="h-4 bg-surface-container w-full" />
        <div className="h-4 bg-surface-container w-2/3" />
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="text-center py-24">
      <p className="font-headline-md text-secondary">Product not found</p>
    </div>
  );
}

export default function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const product = useQuery(api.products.getProductBySlug, {
    slug: productId,
  });

  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [expressSize, setExpressSize] = useState<string | null>(null);

  const mainImageUrl = useQuery(
    api.storage.getUrl,
    product?.imageId ? { storageId: product.imageId } : "skip"
  );

  const secondaryImageUrl = useQuery(
    api.storage.getUrl,
    product?.imageSecondaryId ? { storageId: product.imageSecondaryId } : "skip"
  );

  const galleryUrl1 = useQuery(
    api.storage.getUrl,
    product?.galleryImageIds?.[0] ? { storageId: product.galleryImageIds[0] } : "skip"
  );

  const galleryUrl2 = useQuery(
    api.storage.getUrl,
    product?.galleryImageIds?.[1] ? { storageId: product.galleryImageIds[1] } : "skip"
  );

  useEffect(() => {
    if (product !== undefined) {
      console.log("[ProductDetailContent] slug searched:", productId);
      console.log("[ProductDetailContent] result:", product);
    }
  }, [productId, product]);

  if (product === undefined) {
    return <LoadingSkeleton />;
  }

  if (product === null) {
    console.error("[ProductDetailContent] Product not found for slug:", productId);
    return <NotFoundState />;
  }

  const isSoldOut = product.status === "soldout" || product.stock <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
      <ProductImageGallery
        imageUrl={mainImageUrl ?? product.imageUrl ?? undefined}
        imageSecondaryUrl={secondaryImageUrl ?? product.imageSecondaryUrl ?? undefined}
        galleryUrls={[galleryUrl1, galleryUrl2].filter((u): u is string => !!u)}
      />
      <ProductInfo
        name={product.name}
        price={product.price}
        description={product.description}
        sizes={product.sizes}
        stock={product.stock}
        isSoldOut={isSoldOut}
        isAdded={added}
        onAddToCart={(size) => {
          if (isSoldOut) return;
          addItem({
            productId: product._id,
            name: product.name,
            price: product.price,
            priceValue: product.priceValue,
            imageUrl: mainImageUrl ?? product.imageUrl ?? "",
            size,
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        onCheckout={(size) => {
          if (isSoldOut) return;
          setExpressSize(size);
        }}
      />

      {expressSize && (
        <ExpressCheckoutModal
          productId={product._id}
          name={product.name}
          price={product.price}
          size={expressSize}
          onClose={() => setExpressSize(null)}
        />
      )}
    </div>
  );
}
