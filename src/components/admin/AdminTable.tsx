"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import EditProductModal from "./EditProductModal";
import AdminTableImage from "./AdminTableImage";
import AdminTableShell from "./AdminTableShell";

const statusStyles: Record<string, string> = {
  active: "text-primary-fixed border-primary-fixed",
  draft: "text-secondary border-white/30",
  soldout: "text-error border-error",
};

export default function AdminTable() {
  const products = useQuery(api.products.listProducts);
  const deleteProduct = useMutation(api.products.deleteProduct);
  const [editingProduct, setEditingProduct] = useState<Doc<"products"> | null>(null);

  async function handleDelete(id: string) {
    await deleteProduct({ id: id as any });
  }

  if (products === undefined) {
    return (
      <AdminTableShell>
        <div className="animate-pulse">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/15 bg-surface-container">
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Image</th>
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Product Name</th>
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Price</th>
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Stock</th>
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Status</th>
              <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-4"><div className="w-10 h-12 bg-surface-container" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-32" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-20" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-10" /></td>
                <td className="p-4"><div className="h-5 bg-surface-container w-16" /></td>
                <td className="p-4"><div className="h-5 bg-surface-container w-24" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </AdminTableShell>
    );
  }

  return (
    <>
    <AdminTableShell>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/15 bg-surface-container">
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Image</th>
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Product Name</th>
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Price</th>
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Stock</th>
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Status</th>
            <th className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-12 text-center">
                <p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
                  No products yet
                </p>
                <p className="font-label-sm text-label-sm text-secondary mt-2">
                  Create your first product to get started.
                </p>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                    <AdminTableImage
                      storageId={product.imageId}
                      fallbackUrl={product.imageUrl}
                      name={product.name}
                    />
                </td>
                <td className="p-4 font-label-bold text-sm text-primary whitespace-nowrap uppercase tracking-wide">
                  {product.name}
                </td>
                <td className="p-4 font-label-bold text-sm text-primary-fixed whitespace-nowrap">
                  {product.price}
                </td>
                <td className="p-4">
                  <span className={`font-label-bold text-sm ${product.stock === 0 ? "text-error" : product.stock < 10 ? "text-primary-fixed" : "text-primary"}`}>
                    {product.stock === 0 ? "OUT" : product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 border font-label-bold text-[10px] uppercase tracking-widest ${statusStyles[product.status]}`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminTableShell>

    {editingProduct && (
      <EditProductModal
        product={editingProduct}
        onSuccess={() => setEditingProduct(null)}
        onCancel={() => setEditingProduct(null)}
      />
    )}
    </>
  );
}
