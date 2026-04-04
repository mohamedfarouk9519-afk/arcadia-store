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

const getHardPrice = (sizeGb: number) => {
  switch (sizeGb) {
    case 100:
      return 50;
    case 500:
      return 150;
    case 1000:
      return 250;
    case 2000:
      return 400;
    case 3000:
      return 550;
    case 4000:
      return 700;
    case 5000:
      return 850;
    case 6000:
      return 1000;
    case 7000:
      return 1200;
    case 8000:
      return 1400;
    case 9000:
      return 1600;
    case 10000:
      return 1800;
    default:
      return null;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [capacityGb, setCapacityGbState] = useState<number>(0);

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
      if (!Number.isNaN(parsed) && parsed >= 0) {
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
  const hardPrice = getHardPrice(capacityGb);

  // لو اختار سعة ثابتة من القائمة
  if (hardPrice !== null) return hardPrice;

  // لو اختار "غير محدود"
  // 100 جيجا = 60 جنيه => 1 جيجا = 0.6 جنيه
  return Math.ceil(usedGb * 0.5);
}, [usedGb, capacityGb]);

  const remainingGb = Math.max(capacityGb - usedGb, 0);

  const progressPercent = useMemo(() => {
    if (!capacityGb) return 0;
    return Math.min((usedGb / capacityGb) * 100, 100);
  }, [usedGb, capacityGb]);

  const setCapacityGb = (value: number) => {
    setCapacityGbState(value);
  };

  const addItem = (item: CartItem) => {
    const normalizedItem = {
      ...item,
      sizeGb: item.sizeGb > 0 ? item.sizeGb : 0,
      quantity: item.quantity > 0 ? item.quantity : 1,
      productImage: item.productImage || "/placeholder.jpg",
    };

    const exists = items.find((x) => x.productId === normalizedItem.productId);

    if (exists) {
      setItems((prev) =>
        prev.map((x) =>
          x.productId === normalizedItem.productId
            ? { ...x, quantity: x.quantity + normalizedItem.quantity }
            : x
        )
      );
      return true;
    }

    const requiredGb = normalizedItem.sizeGb * normalizedItem.quantity;

    if (capacityGb > 0 && usedGb + requiredGb > capacityGb) {
      return false;
    }

    setItems((prev) => [...prev, normalizedItem]);
    return true;
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
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