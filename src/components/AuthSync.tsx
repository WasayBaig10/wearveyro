"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCartStore } from "../store/useCartStore";
import type { CartItem } from "../store/useCartStore";

const LS_KEY = "wearveyro-cart";

function normalizeItems(items: { size?: string }[]): CartItem[] {
  return items.map((item) => ({ ...item, size: item.size ?? "" })) as CartItem[];
}

export default function AuthSync({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const convex = useConvex();
  const saveCart = useMutation(api.cart.saveCart);

  const userId = user?.id ?? null;
  const saveCartRef = useRef(saveCart);
  saveCartRef.current = saveCart;

  const { reset, setItems, setLoaded } = useCartStore.getState();

  // On userId change: reset store, then load from the correct source
  useEffect(() => {
    reset();

    if (userId) {
      let localItems: CartItem[] = [];
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        try {
          const parsed: CartItem[] = JSON.parse(stored);
          if (Array.isArray(parsed)) localItems = parsed;
        } catch {}
      }

      convex.query(api.cart.getCart, { userId }).then((remote) => {
        const normalized = normalizeItems(remote);
        if (localItems.length === 0) {
          setItems(normalized);
          setLoaded();
          return;
        }

        const merged = [...normalized];
        for (const local of localItems) {
          if (!merged.find((r) => r.productId === local.productId && r.size === local.size)) {
            merged.push(local);
          }
        }
        setItems(merged);
        setLoaded();
        localStorage.removeItem(LS_KEY);
        saveCartRef.current({ userId, items: merged });
      });
    } else {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        try {
          const items: CartItem[] = JSON.parse(stored);
          if (Array.isArray(items)) {
            setItems(normalizeItems(items));
            setLoaded();
            return;
          }
        } catch {}
      }
      setLoaded();
    }
  }, [userId]);

  // Subscribe to store changes for persistence
  useEffect(() => {
    const unsub = useCartStore.subscribe((state) => {
      if (!state.loaded) return;

      if (userId) {
        saveCartRef.current({ userId, items: state.items });
      } else {
        localStorage.setItem(LS_KEY, JSON.stringify(state.items));
      }
    });
    return unsub;
  }, [userId]);

  return <>{children}</>;
}
