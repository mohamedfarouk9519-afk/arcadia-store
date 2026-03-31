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
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-700">
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {firstSize ? (
          <div className="absolute left-3 top-3 rounded-full bg-cyan-400 px-3 py-1 text-sm font-bold text-slate-900 shadow">
            {firstSize} GB
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-4 text-center">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>

        <p className="line-clamp-2 text-sm text-slate-300">
          {product.shortDescription || product.name}
        </p>

        <div className="grid grid-cols-2 gap-3">
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
            className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900"
          >
            أضف للسلة
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="rounded-2xl border border-white/15 bg-slate-700 px-4 py-3 text-center font-semibold text-white"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}