import AdminShell from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const [products, categories, orders, settings, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.siteSetting.findFirst(),
    prisma.order.aggregate({ _sum: { totalPrice: true } }),
  ]);

  const cards = [
    { label: "المنتجات", value: products.toString() },
    { label: "الأقسام", value: categories.toString() },
    { label: "الطلبات", value: orders.toString() },
    { label: "إجمالي الطلبات", value: formatPrice(revenue._sum.totalPrice || 0) },
  ];

  return (
    <AdminShell title="لوحة التحكم">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="admin-card">
            <div className="text-sm font-bold text-slate-500">{card.label}</div>
            <div className="mt-3 text-3xl font-black">{card.value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="text-xl font-black">ملخص سريع</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. اضبط اسم الموقع وعنوان الـ Hero من صفحة الإعدادات.</li>
            <li>2. أضف الأقسام أولًا ثم اربط بها المنتجات.</li>
            <li>3. ضع رقم واتساب بصيغة دولية مثل 2010xxxxxxx.</li>
            <li>4. فعّل Supabase إذا كنت تريد رفع الصور من لوحة التحكم.</li>
          </ul>
        </div>
        <div className="admin-card">
          <h2 className="text-xl font-black">إعدادات حالية</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div><b>اسم الموقع:</b> {settings?.siteName || "-"}</div>
            <div><b>واتساب:</b> {settings?.whatsappNumber || "-"}</div>
            <div><b>الإيميل:</b> {settings?.supportEmail || "-"}</div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
