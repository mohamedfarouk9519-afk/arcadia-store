import LogoutButton from "@/components/shared/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/");
  }

  // باقي الكود...
}
  return (
    <main className="min-h-screen bg-slate-100 p-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
  <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>

  <div className="flex items-center gap-3">
    <Link
      href="/admin/products"
      className="rounded-xl bg-slate-900 px-4 py-2 text-white"
    >
      إدارة المنتجات
    </Link>

    <LogoutButton />
  </div>
</div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/products"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900">المنتجات</h2>
            <p className="text-slate-600">إدارة المنتجات وإضافة منتجات جديدة.</p>
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">الأقسام</h2>
            <p className="text-slate-600">إدارة الأقسام وترتيبها.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">الطلبات</h2>
            <p className="text-slate-600">متابعة الطلبات وحالتها.</p>
          </div>
        </div>
      </div>
    </main>
  );
}