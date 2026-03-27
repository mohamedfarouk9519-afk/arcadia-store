"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

export default function CheckoutClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      
      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">ملخص الطلب</h2>
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="font-bold">{item.productName}</div>
              <div className="text-sm text-slate-400">
  الكمية: {item.quantity}
</div>
            <div className="font-bold text-cyan-300">

          </div>
        ))}
        <div className="flex items-center justify-between pt-3 text-lg font-black">
          
        </div>

<a
  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  items
    .map((item) => `${item.productName} - الكمية: ${item.quantity}`)
    .join("\n") + "\n\nطلب جديد"
)}`}

  target="_blank"
  className="block mt-4 bg-green-600 text-white text-center py-3 rounded-lg font-bold"
>
  إرسال الطلب عبر واتساب
</a>
      </div>
    </div>
  );
}
