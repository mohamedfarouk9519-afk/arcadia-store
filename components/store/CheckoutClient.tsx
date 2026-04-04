"use client";

import { useCart } from "@/components/providers/CartProvider";

export default function CheckoutClient({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const { items, total } = useCart();

  const fixedWhatsappNumber = "201114330664";

  const message = `
طلب جديد من Arcadia Store 🕹️

${items
  .map(
    (item, index) =>
      `${index + 1}- ${item.productName} (${item.sizeGb} GB) - الكمية: ${item.quantity}`
  )
  .join("\n")}

------------------------
الإجمالي: ${total} ج.م
`;

  const whatsappUrl = `https://wa.me/${fixedWhatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">ملخص الطلب</h2>

        {items.map((item) => (
          <div
            key={`${item.productId}-${item.sizeGb}`}
            className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
          >
            <div>
              <div className="font-bold">{item.productName}</div>
              <div className="text-sm text-slate-400">
                الكمية: {item.quantity}
              </div>
              <div className="text-sm text-slate-400">
                الحجم: {item.sizeGb} GB
              </div>
            </div>

            <div className="font-bold text-cyan-300">{item.sizeGb} GB</div>
          </div>
        ))}

        <div className="pt-4 text-xl font-black text-white">
          الإجمالي: {total} ج.م
        </div>
      </div>

      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">إرسال الطلب</h2>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary block text-center"
        >
          إرسال الطلب عبر واتساب
        </a>
      </div>
    </div>
  );
}