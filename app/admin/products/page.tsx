export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AdminProductsTable from "@/components/AdminProductsTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
  category: true,
  variants: true,
},
  });

  return (
    <main className="min-h-screen bg-slate-100 p-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            إدارة المنتجات
          </h1>

          <a
            href="/admin/products/new"
            className="rounded-xl bg-green-600 px-4 py-2 text-white"
          >
            + إضافة منتج
          </a>
        </div>

        <AdminProductsTable products={products} />
      </div>
    </main>
  );
}