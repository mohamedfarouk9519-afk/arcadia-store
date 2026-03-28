"use client";

import { useMemo, useState } from "react";
import DeleteProductButton from "@/components/DeleteProductButton";
import ToggleProductStatusButton from "@/components/ToggleProductStatusButton";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  isActive: boolean;
  category?: {
    name: string;
  } | null;
};

export default function AdminProductsTable({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = useMemo(() => {
  const q = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? product.isActive
        : !product.isActive;

    return matchesSearch && matchesStatus;
  });
}, [products, search, statusFilter]);

  return (
    <>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
  <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="..."
/>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-full rounded-xl border p-3 text-black"
  >
    <option value="all">كل المنتجات</option>
    <option value="active">النشطة فقط</option>
    <option value="hidden">المخفية فقط</option>
  </select>
</div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full text-right">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">الاسم</th>
              <th className="p-4">السعر</th>
              <th className="p-4">القسم</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">تعديل</th>
              <th className="p-4">حذف</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4 text-black">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="p-4 text-black">
  <div className="space-y-1">
    <div>{product.name}</div>

    
      </div>
    )}
  </div>
</td>
                <td className="p-4 text-black">{product.price} EGP</td>
                <td className="p-4 text-black">
                  {product.category?.name || "-"}
                </td>

                <td className="p-4">
                  <ToggleProductStatusButton
                    id={product.id}
                    isActive={product.isActive}
                  />
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 underline"
                  >
                    تعديل
                  </a>
                </td>

                <td className="p-4">
                  <DeleteProductButton id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}