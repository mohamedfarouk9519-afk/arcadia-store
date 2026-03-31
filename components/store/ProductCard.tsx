"use client";

import Link from "next/link";
import { useCart } from "../providers/CartProvider";

type Variant = {
  id?: string;
  sizeGb: number;
};

type Product = {
  id: string;
  name: string;
  imageUrl?: string | null;
  shortDescription?: string | null;
  slug: string;
  price: number;
  sizeGb?: number | null;
  variants?: Variant[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const firstSize =
    product.variants && product.variants.length > 0
      ? product.variants[0].sizeGb
      : product.sizeGb ?? null;

  return (
    <div className="max-w-[220px] mx-auto overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-700">
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {firstSize ? (
          <div className="absolute left-2 top-2 rounded-full bg-cyan-400 px-2 py-1 text-xs font-bold text-slate-900 shadow">
            {firstSize} GB
          </div>
        ) : null}
      </div>

      <div className="space-y-2 p-3 text-center">
        <h3 className="text-sm font-bold text-white line-clamp-2">
          {product.name}
        </h3>


        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => {
              const success = addItem({
                productId: product.id,
                slug: product.slug,
                productName: product.name,
                productImage: product.imageUrl || "",
                quantity: 1,
                sizeGb: firstSize ?? 0,
                unitPrice: product.price ?? 0,
              });

              if (!success) {
                alert("المساحة المتبقية لا تكفي لهذا المنتج");
              }
            }}
            className="rounded-xl bg-cyan-400 px-2 py-2 text-xs font-semibold text-slate-900"
          >
            أضف للسلة
          </button>

          
        </div>
      </div>
    </div>
  );
}