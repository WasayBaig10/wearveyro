"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface AdminTableImageProps {
  storageId?: string;
  fallbackUrl?: string;
  name: string;
}

export default function AdminTableImage({ storageId, fallbackUrl, name }: AdminTableImageProps) {
  const imageUrl = useQuery(
    api.storage.getUrl,
    storageId ? { storageId: storageId as any } : "skip"
  );
  const finalUrl = imageUrl ?? fallbackUrl;

  return (
    <div className="relative w-10 h-12 bg-surface-container overflow-hidden">
      {finalUrl && (
        <img src={finalUrl} alt={name} className="w-full h-full object-cover" />
      )}
    </div>
  );
}
