"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Star } from "lucide-react";
import Image from "next/image";

interface ProductReviewListProps {
  productId: Id<"products">;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${star <= rating ? "fill-primary text-primary" : "text-black/15"}`}
        />
      ))}
    </div>
  );
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ReviewImage({ storageId }: { storageId: Id<"_storage"> }) {
  const imageUrl = useQuery(api.storage.getUrl, storageId ? { storageId } : "skip");

  if (!imageUrl) return null;

  return (
    <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-black/15">
      <Image
        src={imageUrl}
        alt="Review image"
        fill
        sizes="192px"
        className="object-cover"
      />
    </div>
  );
}

export default function ProductReviewList({ productId }: ProductReviewListProps) {
  const reviews = useQuery(api.reviews.getReviewsByProduct, { productId, limit: 50 });
  const stats = useQuery(api.reviews.getReviewStats, { productId });

  if (reviews === undefined || stats === undefined) {
    return (
      <div className="border-t border-black/15 pt-12 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md uppercase tracking-tighter text-primary">
            Customer Reviews
          </h3>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-black/15 p-6 animate-pulse space-y-3">
              <div className="h-4 bg-surface-container w-1/4 rounded-none" />
              <div className="h-4 bg-surface-container w-3/4 rounded-none" />
              <div className="h-4 bg-surface-container w-1/2 rounded-none" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="border-t border-black/15 pt-12 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md uppercase tracking-tighter text-primary">
            Customer Reviews
          </h3>
        </div>
        <div className="border border-black/15 p-12 text-center">
          <p className="font-label-sm text-secondary uppercase tracking-wider">
            No reviews yet. Be the first to review!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-black/15 pt-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h3 className="font-headline-md text-headline-md uppercase tracking-tighter text-primary">
          Customer Reviews
        </h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="font-display-xl text-4xl font-bold text-primary">{stats.averageRating.toFixed(1)}</p>
            <p className="font-label-sm text-secondary uppercase tracking-wider">{stats.totalReviews} Reviews</p>
          </div>
          <div className="hidden md:flex flex-col gap-1.5 w-48">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.ratingBreakdown[star as keyof typeof stats.ratingBreakdown];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="font-label-bold text-[11px] text-secondary w-8">{star}★</span>
                  <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-label-bold text-[11px] text-secondary w-10 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border border-black/15 p-6 space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-label-bold text-primary text-sm">
                    {review.userName ? getInitials(review.userName) : review.userId.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-label-bold text-sm text-primary">
                    {review.userName ?? "Verified Buyer"}
                  </p>
                  <p className="font-label-sm text-[11px] text-secondary">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <StarRating rating={review.rating} size="md" />
            </div>
            {review.title && (
              <h4 className="font-label-bold text-base text-primary">
                {review.title}
              </h4>
            )}
            {review.imageStorageId && (
              <ReviewImage storageId={review.imageStorageId} />
            )}
            <p className="font-body-md text-body-md text-secondary leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}