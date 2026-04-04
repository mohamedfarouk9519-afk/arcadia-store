"use client";

import { useState } from "react";
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
  const { addItem, items, removeItem, capacityGb } = useCart();
  const [selected, setSelected] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const firstSize =
    product.variants && product.variants.length > 0
      ? product.variants[0].sizeGb
      : product.sizeGb ?? 1;


  const isInCart = items.some((item) => item.productId === product.id);
  

  const handleAddToCart = () => {
  const success = addItem({
    productId: product.id,
    slug: product.slug,
    productName: product.name,
    productImage: product.imageUrl || "/placeholder.jpg",
    quantity: 1,
    sizeGb: firstSize ?? product.sizeGb ?? 0,
    unitPrice: product.price ?? 0,
  });

  if (success) {
    setSelected(true);
    setAnimateCard(true);

    setTimeout(() => setSelected(false), 2000);
    setTimeout(() => setAnimateCard(false), 350);
  }
};

  return (
    <div className="card-anime overflow-hidden rounded-3xl p-2 bg-slate-900/90 md:backdrop-blur-md border border-white/10 shadow-xl md:hover:scale-[1.02] md:transition-transform md:duration-150">
      <div className="relative overflow-hidden rounded-2xl">
<div className="relative overflow-hidden rounded-2xl">

  {firstSize > 0 && (
    <div className="absolute left-3 top-3 z-10 rounded-full border border-cyan-400 bg-black/60 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur shadow-lg">
      {firstSize >= 1000
        ? `${firstSize / 1000} TB`
        : `${firstSize} GB`}
    </div>
  )}

  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
    <img
      src={product.imageUrl || "/placeholder.jpg"}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>

</div>
        {isInCart && (
          <button
            onClick={() => removeItem(product.id)}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white shadow hover:bg-red-700"
          >
            ×
          </button>
        )}

        {firstSize > 0 && (
  <div className="absolute left-3 top-3 z-10 rounded-full border border-cyan-400 bg-black/60 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur shadow-lg">
    {firstSize >= 1000
      ? `${firstSize / 1000} TB`
      : `${firstSize} GB`}
  </div>
)}

        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={product.imageUrl || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="space-y-3 px-2 pb-2 pt-4 text-center">
        <h3 className="text-xl font-black text-white line-clamp-1">
          {product.name}
        </h3>

        {selected && (
          <p className="fade-up text-sm font-bold text-green-400">
            تم الاختيار ✅
          </p>
        )}

        {!isInCart ? (
          <button
            onClick={handleAddToCart}
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 py-3 text-base font-black text-white md:transition-transform md:hover:scale-[1.02] md:hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
          >
            أضف للسلة
          </button>
        ) : (
          <button
            onClick={() => removeItem(product.id)}
            className="w-full rounded-2xl border border-red-500/40 bg-red-500/10 py-3 text-base font-black text-red-300 md:transition-colors md:hover:bg-red-500/20"
          >
            إزالة من السلة ❌
          </button>
        )}
      </div>
    </div>
  );
}