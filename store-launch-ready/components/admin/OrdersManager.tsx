"use client";

import { useState } from "react";
import { formatPrice, getStatusLabel, cn } from "@/lib/utils";

const statuses = ["pending", "confirmed", "processing", "completed", "cancelled"];

export default function OrdersManager({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) return alert("تعذر تحديث الحالة");
    setOrders((current: any[]) => current.map((item) => (item.id === id ? data : item)));
  }

  return (
    <div className="admin-card table-wrap">
      <table>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>العميل</th>
            <th>الإجمالي</th>
            <th>الحالة</th>
            <th>العناصر</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <div className="font-bold">{order.orderNumber}</div>
                <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleString("ar-EG")}</div>
              </td>
              <td>
                <div className="font-bold">{order.customerName}</div>
                <div className="text-xs text-slate-500">{order.phone}</div>
              </td>
              <td>{formatPrice(order.totalPrice)}</td>
              <td>
                <div className="flex flex-col gap-2">
                  <span className={cn("status-badge", `status-${order.status}`)}>{getStatusLabel(order.status)}</span>
                  <select className="admin-select max-w-[180px]" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                    {statuses.map((status) => <option key={status} value={status}>{getStatusLabel(status)}</option>)}
                  </select>
                </div>
              </td>
              <td>
                <ul className="space-y-1 text-xs text-slate-600">
                  {order.items.map((item: any) => <li key={item.id}>{item.productName} × {item.quantity}</li>)}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
