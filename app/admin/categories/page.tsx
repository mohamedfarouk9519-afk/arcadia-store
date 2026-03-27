import AdminShell from "@/components/admin/AdminShell";
import CategoriesManager from "@/components/admin/CategoriesManager";
import { prisma } from "@/lib/db";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <AdminShell title="إدارة الأقسام">
      <CategoriesManager initialCategories={JSON.parse(JSON.stringify(categories))} />
    </AdminShell>
  );
}
