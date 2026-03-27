"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/10 backdrop-blur">
      <img
        src={product.imageUrl || "https://placehold.co/800x560?text=Product"}
        alt={product.name}
        className="h-56 w-full object-cover"
      />
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">{product.name}</h3>
          {product.sizeGb ? <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{product.sizeGb} GB</span> : null}
        </div>
        <p className="mb-4 text-sm leading-6 text-slate-300">{product.shortDescription || product.description}</p>
        <div className="mb-5 flex items-end gap-3">
          <span className="text-xl font-black text-cyan-300">{formatPrice(product.price)}</span>
          {product.oldPrice ? <span className="text-sm text-slate-500 line-through">{formatPrice(product.oldPrice)}</span> : null}
        </div>
        <div className="flex gap-3">
          <Link href={`/product/${product.slug}`} className="btn-secondary flex-1">
            التفاصيل
          </Link>
          <button
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                productName: product.name,
                productImage: product.imageUrl,
                unitPrice: product.price,
                quantity: 1,
                sizeGb: product.sizeGb,
              })
            }
            className="btn-primary flex-1"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}
