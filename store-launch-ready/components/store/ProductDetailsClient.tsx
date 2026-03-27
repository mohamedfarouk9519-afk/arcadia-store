"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailsClient({ product }: { product: any }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <img src={product.imageUrl || "https://placehold.co/1100x760?text=Product"} alt={product.name} className="w-full rounded-[32px] border border-white/10 object-cover" />
      <div className="card">
        <div className="mb-2 text-sm text-cyan-300">{product.category.name}</div>
        <h1 className="mb-4 text-4xl font-black">{product.name}</h1>
        <p className="mb-6 text-slate-300">{product.description || product.shortDescription}</p>
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl font-black text-cyan-300">{formatPrice(product.price)}</span>
          {product.oldPrice ? <span className="text-lg text-slate-500 line-through">{formatPrice(product.oldPrice)}</span> : null}
        </div>
        <div className="mb-6 flex items-center gap-3">
          <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="input w-24" />
          <button
            className="btn-primary"
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                productName: product.name,
                productImage: product.imageUrl,
                unitPrice: product.price,
                quantity: qty,
                sizeGb: product.sizeGb,
              })
            }
          >
            أضف للسلة
          </button>
          <Link href="/checkout" className="btn-secondary">اذهب للطلب</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card !p-4">
            <div className="text-xs text-slate-400">الحجم</div>
            <div className="mt-2 text-lg font-bold">{product.sizeGb ? `${product.sizeGb} GB` : "غير محدد"}</div>
          </div>
          <div className="card !p-4">
            <div className="text-xs text-slate-400">الحالة</div>
            <div className="mt-2 text-lg font-bold">{product.stockStatus}</div>
          </div>
          <div className="card !p-4">
            <div className="text-xs text-slate-400">النوع</div>
            <div className="mt-2 text-lg font-bold">{product.isFeatured ? "مميز" : "عادي"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
