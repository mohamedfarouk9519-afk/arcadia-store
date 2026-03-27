"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  productName: string;
  productImage?: string;
  unitPrice: number;
  quantity: number;
  sizeGb?: number | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "store-launch-ready-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return {
      items,
      count,
      total,
      addItem: (item) => {
        setItems((current) => {
          const existing = current.find((entry) => entry.productId === item.productId);
          if (existing) {
            return current.map((entry) =>
              entry.productId === item.productId ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
            );
          }
          return [...current, item];
        });
      },
      removeItem: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
      updateQuantity: (productId, quantity) =>
        setItems((current) =>
          current
            .map((item) => (item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0),
        ),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
