"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  productId: string;
  slug: string;
  productName: string;
  productImage: string;
  quantity: number;
  sizeGb: number;
  unitPrice: number;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => boolean;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;

  capacityGb: number;
  setCapacityGb: (value: number) => void;

  usedGb: number;
  remainingGb: number;
  progressPercent: number;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "hard-cart-items";
const CAPACITY_STORAGE_KEY = "hard-cart-capacity";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [capacityGb, setCapacityGbState] = useState<number>(100);

  useEffect(() => {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY);
    const savedCapacity = localStorage.getItem(CAPACITY_STORAGE_KEY);

    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch {}
    }

    if (savedCapacity) {
      const parsed = Number(savedCapacity);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setCapacityGbState(parsed);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(CAPACITY_STORAGE_KEY, String(capacityGb));
  }, [capacityGb]);

  const usedGb = useMemo(() => {
    return items.reduce((sum, item) => sum + item.sizeGb * item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const remainingGb = Math.max(capacityGb - usedGb, 0);

  const progressPercent = useMemo(() => {
    if (!capacityGb) return 0;
    return Math.min((usedGb / capacityGb) * 100, 100);
  }, [usedGb, capacityGb]);

  const setCapacityGb = (value: number) => {
    setItems([]);
    setCapacityGbState(value);
  };

  const addItem = (item: CartItem) => {
    const requiredGb = item.sizeGb * item.quantity;

    if (usedGb + requiredGb > capacityGb) {
      return false;
    }

    setItems((prev) => {
      const existing = prev.find(
        (x) => x.productId === item.productId && x.sizeGb === item.sizeGb
      );

      if (existing) {
        return prev.map((x) =>
          x.productId === item.productId && x.sizeGb === item.sizeGb
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      }

      return [...prev, item];
    });

    return true;
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        capacityGb,
        setCapacityGb,
        usedGb,
        remainingGb,
        progressPercent,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}