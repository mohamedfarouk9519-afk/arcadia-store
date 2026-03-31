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
  variants?: Variant[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const firstSize =
    product.variants && product.variants.length > 0
      ? product.variants[0].sizeGb
      : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-[300px] w-full">
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

        {firstSize && (
          <div className="absolute left-3 top-3 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-black shadow">
            {firstSize} GB
          </div>
        )}

        <div className="absolute bottom-16 left-0 right-0 px-2 text-center">
          <h3 className="line-clamp-2 text-lg font-bold text-white">
            {product.name}
          </h3>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2">
          <button
            onClick={() => {
              const success = addItem({
                productId: product.id,
                slug: product.slug,
                productName: product.name,
                productImage: product.imageUrl || "",
                quantity: 1,
                sizeGb: firstSize || 0,
                unitPrice: product.price,
              });

              if (!success) {
                alert("المساحة غير كافية");
              }
            }}
            className="flex-1 rounded-xl bg-cyan-500 py-2 font-semibold text-black hover:bg-cyan-600"
          >
            أضف للسلة
          </button>

          <Link
            href={/products/${product.slug}}
            className="flex-1 rounded-xl border border-white/30 py-2 text-center text-white hover:bg-white/10"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}