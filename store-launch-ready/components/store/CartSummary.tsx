"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="card text-center">
        <h2 className="mb-3 text-2xl font-black">السلة فارغة</h2>
        <p className="mb-5 text-slate-300">ابدأ بإضافة منتجات من الصفحة الرئيسية أو الأقسام.</p>
        <Link href="/" className="btn-primary">اذهب للتسوق</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.productId} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={item.productImage || "https://placehold.co/160x120?text=Item"} alt={item.productName} className="h-24 w-32 rounded-2xl object-cover" />
            <div>
              <div className="text-lg font-bold">{item.productName}</div>
              <div className="text-sm text-slate-400">{formatPrice(item.unitPrice)} × {item.quantity}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              className="input w-24"
            />
            <button onClick={() => removeItem(item.productId)} className="btn-secondary">حذف</button>
          </div>
        </div>
      ))}
      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-slate-400">الإجمالي النهائي</div>
          <div className="text-3xl font-black text-cyan-300">{formatPrice(total)}</div>
        </div>
        <div className="flex gap-3">
          <button onClick={clearCart} className="btn-secondary">تفريغ السلة</button>
          <Link href="/checkout" className="btn-primary">متابعة الطلب</Link>
        </div>
      </div>
    </div>
  );
}
