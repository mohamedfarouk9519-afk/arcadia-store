import AdminShell from "@/components/admin/AdminShell";
import OrdersManager from "@/components/admin/OrdersManager";
import { prisma } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });

  return (
    <AdminShell title="إدارة الطلبات">
      <OrdersManager initialOrders={JSON.parse(JSON.stringify(orders))} />
    </AdminShell>
  );
}
