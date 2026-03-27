"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CheckoutClient({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });

  const disabled = useMemo(() => items.length === 0 || loading, [items.length, loading]);

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذر إنشاء الطلب");
      clearCart();
      setMessage("تم إنشاء الطلب بنجاح. سيتم تحويلك إلى واتساب.");
      if (data.whatsappUrl || whatsappNumber) {
        setTimeout(() => {
          window.location.href = data.whatsappUrl || `https://wa.me/${whatsappNumber}`;
        }, 800);
      }
    } catch (error: any) {
      setMessage(error.message || "حصل خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <form onSubmit={submitOrder} className="card space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label !text-slate-200">الاسم</label>
            <input className="input" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required />
          </div>
          <div>
            <label className="label !text-slate-200">الهاتف</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label !text-slate-200">البريد الإلكتروني</label>
            <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label !text-slate-200">طريقة الدفع</label>
            <select className="select" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              <option value="cash">كاش</option>
              <option value="vodafone_cash">Vodafone Cash</option>
              <option value="transfer">تحويل بنكي</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label !text-slate-200">العنوان</label>
          <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div>
          <label className="label !text-slate-200">ملاحظات</label>
          <textarea className="textarea min-h-28" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
        {message ? <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white">{message}</div> : null}
        <button disabled={disabled} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب وفتح واتساب"}
        </button>
      </form>
      <div className="card h-fit space-y-4">
        <h2 className="text-2xl font-black">ملخص الطلب</h2>
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="font-bold">{item.productName}</div>
              <div className="text-sm text-slate-400">{item.quantity} × {formatPrice(item.unitPrice)}</div>
            </div>
            <div className="font-bold text-cyan-300">{formatPrice(item.quantity * item.unitPrice)}</div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 text-lg font-black">
          <span>الإجمالي</span>
          <span className="text-cyan-300">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
