import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import CategoriesManager from "@/components/admin/CategoriesManager";
import { prisma } from "@/lib/db";

export default async function AdminCategoriesPage() {
  const cookieStore = await cookies();
const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/");
  }

  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminShell title="إدارة الأقسام">
      <CategoriesManager
        initialCategories={JSON.parse(JSON.stringify(categories))}
      />
    </AdminShell>
  );
}
