"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export interface InventoryInfo {
  stock: number;
  status: string;
  isSellable: boolean;
}

export function useInventory(): {
  inventory: Map<string, InventoryInfo>;
  loaded: boolean;
} {
  const products = useQuery(api.products.listProducts);

  if (!products) return { inventory: new Map(), loaded: false };

  const map = new Map<string, InventoryInfo>();
  for (const p of products) {
    map.set(p._id, {
      stock: p.stock,
      status: p.status,
      isSellable: p.status !== "draft" && p.status !== "soldout" && p.stock > 0,
    });
  }
  return { inventory: map, loaded: true };
}

export function getItemStockStatus(
  inventory: Map<string, InventoryInfo>,
  productId: string,
  quantity: number
): { soldOut: boolean; overStock: boolean; message: string | null } {
  const info = inventory.get(productId);

  if (!info || info.status === "draft" || info.status === "soldout" || info.stock <= 0) {
    return {
      soldOut: true,
      overStock: false,
      message: "This item is currently out of stock.",
    };
  }

  if (quantity > info.stock) {
    return {
      soldOut: false,
      overStock: true,
      message: `Only ${info.stock} available. Reduce the quantity to continue.`,
    };
  }

  return { soldOut: false, overStock: false, message: null };
}
