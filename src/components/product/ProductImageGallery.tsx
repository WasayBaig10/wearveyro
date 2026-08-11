"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  imageUrl?: string;
  imageSecondaryUrl?: string;
  galleryUrls?: string[];
}

const FALLBACK_MAIN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdlWXZgKEw3FryVbQNghSSYQTeL-K3Gz8lLSDSdl7w5fAPBXnxCk-mLIZDZpLBDZj9Ix9abyQub4wsKK-w6Ezn4b3XYp1jrBW8GQnnYylFUywxezygs-QjHOXfYtpsDEBbUqMN3Sn4w3PuERKQpUbxYVC5Kbz3cb3V6Mo9Kuis_6RYjH9Lc6ot1sTqTMfae3brgmfD5b22Fc56xIvp0jfL8dHmW0Wg9qt3dWn_0qjXZqM6Y5BB00i5O4ZdRYwE8uS9QYGl";

export default function ProductImageGallery({
  imageUrl,
  imageSecondaryUrl,
  galleryUrls = [],
}: ProductImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const allImages = [
    ...(imageUrl ? [imageUrl] : []),
    ...(imageSecondaryUrl ? [imageSecondaryUrl] : []),
    ...(galleryUrls ?? []).filter((u): u is string => !!u),
  ];

  const displayImages = allImages.length > 0 ? allImages : [FALLBACK_MAIN];

  return (
    <section className="flex flex-col overflow-hidden">
      <div className="aspect-square w-full bg-surface-container-lowest overflow-hidden group relative">
        <img
          src={displayImages[activeIdx % displayImages.length]}
          alt="Product view"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
      {displayImages.length > 1 && (
        <div
          className="grid border-t border-white/15"
          style={{ gridTemplateColumns: `repeat(${Math.min(displayImages.length, 4)}, 1fr)` }}
        >
          {displayImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`aspect-square overflow-hidden cursor-pointer border-r border-white/15 last:border-r-0 transition-all ${
                i === activeIdx ? "ring-2 ring-primary-fixed" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
