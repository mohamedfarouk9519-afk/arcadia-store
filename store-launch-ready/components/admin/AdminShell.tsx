import Link from "next/link";
import { ReactNode } from "react";

const links = [
  { href: "/admin", label: "الرئيسية" },
  { href: "/admin/categories", label: "الأقسام" },
  { href: "/admin/products", label: "المنتجات" },
  { href: "/admin/orders", label: "الطلبات" },
  { href: "/admin/settings", label: "الإعدادات" },
  { href: "/admin/media", label: "الصور" },
];

export default function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 lg:grid-cols-[260px_1fr]">
        <aside className="admin-card h-fit">
          <Link href="/admin" className="mb-6 block text-xl font-black">Store Launch Ready</Link>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="admin-btn-secondary flex w-full justify-start">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl bg-slate-900 p-4 text-sm text-white">
            ابدأ من الإعدادات أولًا ثم أضف الأقسام والمنتجات وبعدها راجع الطلبات.
          </div>
        </aside>
        <main className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-500">Admin Panel</div>
              <h1 className="text-3xl font-black">{title}</h1>
            </div>
            <Link href="/" className="admin-btn-secondary">عرض المتجر</Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
