"use client";

import { useMemo, useState } from "react";
import { slugify } from "@/lib/utils";

const emptyForm = {
  id: "",
  categoryId: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  imageUrl: "",
  price: 0,
  oldPrice: null,
  sizeGb: null,
  isFeatured: false,
  isActive: true,
  stockStatus: "available",
  sortOrder: 0,
};

export default function ProductsManager({ initialProducts, categories }: { initialProducts: any[]; categories: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<any>({ ...emptyForm, categoryId: categories[0]?.id || "" });
  const [loading, setLoading] = useState(false);
  const categoryMap = useMemo(() => Object.fromEntries(categories.map((item) => [item.id, item.name])), [categories]);

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = form.id ? "PUT" : "POST";
    const endpoint = form.id ? `/api/products/${form.id}` : "/api/products";
    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      sizeGb: form.sizeGb ? Number(form.sizeGb) : null,
      sortOrder: Number(form.sortOrder || 0),
    };
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return alert("تعذر حفظ المنتج");

    if (form.id) {
      setProducts((current: any[]) => current.map((item) => (item.id === data.id ? data : item)));
    } else {
      setProducts((current: any[]) => [data, ...current]);
    }
    setForm({ ...emptyForm, categoryId: categories[0]?.id || "" });
  }

  async function deleteProduct(id: string) {
    if (!confirm("حذف المنتج؟")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("تعذر حذف المنتج");
    setProducts((current: any[]) => current.filter((item) => item.id !== id));
    if (form.id === id) setForm({ ...emptyForm, categoryId: categories[0]?.id || "" });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
      <form onSubmit={saveProduct} className="admin-card space-y-4">
        <h2 className="text-xl font-black">{form.id ? "تعديل منتج" : "إضافة منتج"}</h2>
        <div>
          <label className="label">اسم المنتج</label>
          <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })} required />
        </div>
        <div>
          <label className="label">Slug</label>
          <input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </div>
        <div>
          <label className="label">القسم</label>
          <select className="admin-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">وصف قصير</label>
          <textarea className="admin-textarea min-h-20" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
        </div>
        <div>
          <label className="label">الوصف الكامل</label>
          <textarea className="admin-textarea min-h-28" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="label">رابط الصورة</label>
          <input className="admin-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">السعر</label>
            <input type="number" className="admin-input" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
          </div>
          <div>
            <label className="label">السعر قبل الخصم</label>
            <input type="number" className="admin-input" value={form.oldPrice || ""} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">الحجم GB</label>
            <input type="number" className="admin-input" value={form.sizeGb || ""} onChange={(e) => setForm({ ...form, sizeGb: e.target.value })} />
          </div>
          <div>
            <label className="label">الترتيب</label>
            <input type="number" className="admin-input" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
            منتج مميز
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            مفعل
          </label>
        </div>
        <div className="flex gap-3">
          <button className="admin-btn-primary">{loading ? "جاري الحفظ..." : "حفظ"}</button>
          <button type="button" className="admin-btn-secondary" onClick={() => setForm({ ...emptyForm, categoryId: categories[0]?.id || "" })}>جديد</button>
        </div>
      </form>

      <div className="admin-card table-wrap">
        <table>
          <thead>
            <tr>
              <th>المنتج</th>
              <th>القسم</th>
              <th>السعر</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="font-bold">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.shortDescription}</div>
                </td>
                <td>{categoryMap[product.categoryId] || product.category?.name || "-"}</td>
                <td>{product.price}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="admin-btn-secondary" onClick={() => setForm({ ...product, categoryId: product.categoryId })}>تعديل</button>
                    <button className="admin-btn-danger" onClick={() => deleteProduct(product.id)}>حذف</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
