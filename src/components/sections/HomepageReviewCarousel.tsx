"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Star } from "lucide-react";
import Image from "next/image";
import type { Id } from "../../../convex/_generated/dataModel";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-5 h-5 ${star <= rating ? "fill-primary text-primary" : "text-black/15"}`} />
      ))}
    </div>
  );
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
    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-black/15">
      <Image
        src={imageUrl}
        alt="Review image"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

export default function HomepageReviewCarousel() {
  const reviews = useQuery(api.reviews.getRandomReviews, { limit: 6 });

  if (reviews === undefined) {
    return (
      <section className="border-t border-black/15 pt-12 md:pt-16" aria-labelledby="reviews-heading">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-surface-container w-48 rounded-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-black/15 p-6 space-y-4">
                <div className="h-5 bg-surface-container w-24 rounded-none" />
                <div className="h-4 bg-surface-container w-full rounded-none" />
                <div className="h-4 bg-surface-container w-3/4 rounded-none" />
                <div className="h-4 bg-surface-container w-1/2 rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="border-t mb-20 border-black/15 pt-12 md:pt-16" aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-8">
        <h2 id="reviews-heading" className="font-headline-lg text-headline-lg uppercase tracking-tighter text-primary select-none">
          Customer Reviews
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reviews.map((review: { _id: string; userId: string; userName?: string; rating: number; comment: string; createdAt: number; title?: string; imageStorageId?: Id<"_storage"> }) => (
          <article
            key={review._id}
            className="border border-black/15 p-6 space-y-4 hover:border-primary-fixed/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-label-bold text-primary text-sm">
                    {review.userName ? getInitials(review.userName) : review.userId.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-bold text-sm text-primary truncate">{review.userName ?? "Verified Buyer"}</p>
                  <p className="font-label-sm text-[11px] text-secondary">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            {review.title && (
              <h4 className="font-label-bold text-sm text-primary line-clamp-1">{review.title}</h4>
            )}
            {review.imageStorageId && (
              <ReviewImage storageId={review.imageStorageId} />
            )}
            <p className="font-body-md text-body-md text-secondary leading-relaxed line-clamp-4">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}