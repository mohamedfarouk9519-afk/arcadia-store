import AdminShell from "@/components/admin/AdminShell";
import ProductsManager from "@/components/admin/ProductsManager";
import { prisma } from "@/lib/db";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: [{ createdAt: "desc" }] }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: "asc" }] }),
  ]);

  return (
    <AdminShell title="إدارة المنتجات">
      <ProductsManager initialProducts={JSON.parse(JSON.stringify(products))} categories={JSON.parse(JSON.stringify(categories))} />
    </AdminShell>
  );
}
