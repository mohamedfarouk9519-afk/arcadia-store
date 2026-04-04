"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

export default function CheckoutClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [message, setMessage] = useState("");
const { items, total, clearCart } = useCart();
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const whatsappText = `
طلب جديد من Arcadia Store 🕹️

${items
  .map(
    (item, index) =>
      `${index + 1}- ${item.productName} - ${item.sizeGb} GB`
  )
  .join("\n")}

--------------------
الإجمالي: ${total} ج.م
`;

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappText
)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">ملخص الطلب</h2>

        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
          >
            <div>
              <div className="font-bold">{item.productName}</div>
              <div className="text-sm text-slate-400">
                الكمية: {item.quantity}
<div className="pt-4 text-xl font-black text-white">
  الإجمالي: {total} ج.م

              </div>
            </div>

            <div className="font-bold text-cyan-300"></div>
          </div>
        ))}
      </div>

      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">إرسال الطلب</h2>
        <a
  href={whatsappUrl}
  target="_blank"
  className="btn-primary block text-center"
>
  إرسال الطلب عبر واتساب
</a>
      </div>
    </div>
  );
}