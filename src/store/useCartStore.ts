import { create } from "zustand";
import type { Id } from "../../convex/_generated/dataModel";

export interface CartItem {
  productId: Id<"products">;
  name: string;
  price: string;
  priceValue: number;
  imageUrl: string;
  quantity: number;
  size: string;
}

type AddItemInput = Omit<CartItem, "quantity">;

interface CartStore {
  userId: string | null;
  items: CartItem[];
  loaded: boolean;

  setUserId: (id: string | null) => void;
  setItems: (items: CartItem[]) => void;
  setLoaded: () => void;
  reset: () => void;

  addItem: (item: AddItemInput) => void;
  removeItem: (productId: Id<"products">, size: string) => void;
  updateQuantity: (productId: Id<"products">, size: string, quantity: number) => void;
  clearCart: () => void;
}

function matchKey(a: Id<"products">, b: string) {
  return (i: CartItem) => i.productId === a && i.size === b;
}

export const useCartStore = create<CartStore>((set) => ({
  userId: null,
  items: [],
  loaded: false,

  setUserId: (id) => set({ userId: id }),
  setItems: (items) => set({ items }),
  setLoaded: () => set({ loaded: true }),
  reset: () => set({ items: [], loaded: false }),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(matchKey(item.productId, item.size));
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.productId === productId && i.size === size)),
    })),

  updateQuantity: (productId, size, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => !(i.productId === productId && i.size === size))
          : state.items.map((i) =>
              i.productId === productId && i.size === size
                ? { ...i, quantity }
                : i
            ),
    })),

  clearCart: () => set({ items: [] }),
}));
