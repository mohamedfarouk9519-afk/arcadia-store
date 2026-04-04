"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const { items, total, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="card text-center">
        <h2 className="mb-3 text-2xl font-black">السلة فارغة</h2>
        <p className="mb-5 text-slate-300">
          ابدأ بإضافة منتجات من الصفحة الرئيسية أو الأقسام.
        </p>
        <Link href="/" className="btn-primary">
          اذهب للتسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={`${item.productId}-${item.sizeGb}`}
          className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => removeItem(item.productId)}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white"
              >
                ×
              </button>

              <img
                src={item.productImage}
                alt={item.productName}
                className="h-20 w-20 rounded-lg object-cover"
              />
            </div>

            <div>
              <div className="font-bold text-white">{item.productName}</div>

              <div className="text-sm text-slate-300">
                {item.sizeGb >= 1000
                  ? `${item.sizeGb / 1000} TB`
                  : `${item.sizeGb} GB`}
              </div>

              <div className="text-sm font-bold text-white">
                {formatPrice(item.unitPrice * item.quantity)}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-slate-400">الإجمالي النهائي</div>
          <div className="text-2xl font-black text-white">
            {formatPrice(total)}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={clearCart} className="btn-secondary">
            تفريغ السلة
          </button>
          <Link href="/checkout" className="btn-primary">
            متابعة الطلب
          </Link>
        </div>
      </div>
    </div>
  );
}