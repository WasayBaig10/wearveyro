"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";

interface EditProductModalProps {
  product: Doc<"products">;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditProductModal({
  product,
  onSuccess,
  onCancel,
}: EditProductModalProps) {
  const updateProduct = useMutation(api.products.updateProduct);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [priceValue, setPriceValue] = useState(String(product.priceValue));
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const imageId = product.imageId ?? null;
  const secondaryImageId = product.imageSecondaryId ?? null;
  const galleryImageIds = product.galleryImageIds ?? [];
  const [stock, setStock] = useState(String(product.stock));
  const [sizes, setSizes] = useState(product.sizes.join(", "));
  const [status, setStatus] = useState(product.status);
  const [badge, setBadge] = useState<"new" | "hot" | null>(product.badge ?? null);

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [secondaryFile, setSecondaryFile] = useState<File | null>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null]);
  const galleryInputRef1 = useRef<HTMLInputElement>(null);
  const galleryInputRef2 = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const existingImageUrl = useQuery(
    api.storage.getUrl,
    imageId ? { storageId: imageId } : "skip"
  );
  const existingSecondaryUrl = useQuery(
    api.storage.getUrl,
    secondaryImageId ? { storageId: secondaryImageId } : "skip"
  );
  const galleryUrl0 = useQuery(
    api.storage.getUrl,
    galleryImageIds[0] ? { storageId: galleryImageIds[0] } : "skip"
  );
  const galleryUrl1 = useQuery(
    api.storage.getUrl,
    galleryImageIds[1] ? { storageId: galleryImageIds[1] } : "skip"
  );

  const slug = toSlug(name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !price || !priceValue || !description || !category || !stock) {
      setError("All required fields must be filled.");
      return;
    }

    setSubmitting(true);
    try {
      let finalImageId = imageId;
      if (file) {
        const uploadUrl = await generateUploadUrl();
        const uploadResult = await fetch(uploadUrl, { method: "POST", body: file });
        const { storageId } = await uploadResult.json();
        finalImageId = storageId;
      }

      let finalSecondaryId = secondaryImageId;
      if (secondaryFile) {
        const sUploadUrl = await generateUploadUrl();
        const sResult = await fetch(sUploadUrl, { method: "POST", body: secondaryFile });
        const { storageId: sId } = await sResult.json();
        finalSecondaryId = sId;
      }

      const finalGallery: (Id<"_storage"> | undefined)[] = [
        galleryImageIds[0],
        galleryImageIds[1],
      ];
      for (let i = 0; i < 2; i++) {
        if (galleryFiles[i]) {
          const gUploadUrl = await generateUploadUrl();
          const gResult = await fetch(gUploadUrl, { method: "POST", body: galleryFiles[i]! });
          const { storageId: gId } = await gResult.json();
          finalGallery[i] = gId;
        }
      }
      const finalGalleryIds = finalGallery.filter((id): id is Id<"_storage"> => !!id);

      await updateProduct({
        id: product._id,
        fields: {
          name,
          slug,
          price,
          priceValue: Number(priceValue),
          description,
          category,
          imageId: finalImageId ?? undefined,
          imageSecondaryId: finalSecondaryId ?? undefined,
          galleryImageIds: finalGalleryIds.length > 0 ? finalGalleryIds : undefined,
          stock: Number(stock),
          sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
          status,
          badge: badge ?? undefined,
        },
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/15 bg-surface-container-low">
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-white/15 bg-surface-container-low flex justify-between items-center">
          <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
            Edit Product
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm uppercase tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Slug (auto-generated, read-only) */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full h-12 px-4 bg-surface-container border border-white/15 text-secondary font-label-bold text-sm tracking-wide cursor-not-allowed"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Price (display) *
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Price Value */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Price (numeric) *
            </label>
            <input
              type="number"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm uppercase tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Stock *
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["active", "draft", "soldout"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`h-12 border font-label-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                    status === s
                      ? s === "active"
                        ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed"
                        : s === "draft"
                          ? "border-secondary bg-secondary text-background"
                          : "border-error bg-error text-white"
                      : "border-white/15 text-secondary hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-white/15 text-primary font-label-bold text-sm uppercase tracking-wide focus:outline-none focus:border-primary-fixed transition-colors"
            />
          </div>

          {/* Badge */}
          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Badge (optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { value: null, label: "None" },
                  { value: "new", label: "NEW" },
                  { value: "hot", label: "HOT" },
                ] as { value: "new" | "hot" | null; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setBadge(opt.value)}
                  className={`h-12 border font-label-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                    badge === opt.value
                      ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed"
                      : "border-white/15 text-secondary hover:border-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image upload */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Product Image *
            </label>
            {existingImageUrl && (
              <div className="w-24 h-24 bg-surface-container overflow-hidden border border-white/15">
                <img
                  src={existingImageUrl}
                  alt="Current product image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 border border-dashed border-white/15 flex items-center justify-center gap-3 text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">upload</span>
              <span className="font-label-bold text-sm">
                {file ? file.name : existingImageUrl ? "Click to replace image" : "Click to upload image"}
              </span>
            </button>
<input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          </div>

          {/* Secondary image upload */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Secondary Image (optional)
            </label>
            {existingSecondaryUrl && (
              <div className="w-24 h-24 bg-surface-container overflow-hidden border border-white/15">
                <img
                  src={existingSecondaryUrl}
                  alt="Current secondary image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => secondaryFileInputRef.current?.click()}
              className="w-full h-24 border border-dashed border-white/15 flex items-center justify-center gap-3 text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">upload</span>
              <span className="font-label-bold text-sm">
                {secondaryFile ? secondaryFile.name : existingSecondaryUrl ? "Click to replace secondary image" : "Click to upload secondary image"}
              </span>
            </button>
            <input
              ref={secondaryFileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setSecondaryFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </div>

          {/* Gallery images */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Gallery Images (optional, up to 2)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {galleryUrl0 && (
                  <div className="w-full h-24 bg-surface-container overflow-hidden border border-white/15 mb-2">
                    <img
                      src={galleryUrl0}
                      alt="Current gallery image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => galleryInputRef1.current?.click()}
                  className="w-full h-24 border border-dashed border-white/15 flex items-center justify-center gap-3 text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">upload</span>
                  <span className="font-label-bold text-[11px]">
                    {galleryFiles[0] ? galleryFiles[0].name : "Gallery 1"}
                  </span>
                </button>
              </div>
              <div>
                {galleryUrl1 && (
                  <div className="w-full h-24 bg-surface-container overflow-hidden border border-white/15 mb-2">
                    <img
                      src={galleryUrl1}
                      alt="Current gallery image 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => galleryInputRef2.current?.click()}
                  className="w-full h-24 border border-dashed border-white/15 flex items-center justify-center gap-3 text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">upload</span>
                  <span className="font-label-bold text-[11px]">
                    {galleryFiles[1] ? galleryFiles[1].name : "Gallery 2"}
                  </span>
                </button>
              </div>
            </div>
            <input
              ref={galleryInputRef1}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const next = [...galleryFiles];
                next[0] = e.target.files?.[0] ?? null;
                setGalleryFiles(next);
              }}
              className="hidden"
            />
            <input
              ref={galleryInputRef2}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const next = [...galleryFiles];
                next[1] = e.target.files?.[0] ?? null;
                setGalleryFiles(next);
              }}
              className="hidden"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-white/15 text-primary font-label-bold text-sm tracking-wide focus:outline-none focus:border-primary-fixed transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="md:col-span-2 p-4 border border-error/30 bg-error/10 text-error font-label-bold text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="h-14 px-8 bg-primary-fixed text-on-primary-fixed font-label-bold text-label-bold tracking-widest uppercase hover:bg-black hover:text-white hover:border hover:border-white transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-14 px-8 border border-white/15 text-secondary font-label-bold text-label-bold tracking-widest uppercase hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
