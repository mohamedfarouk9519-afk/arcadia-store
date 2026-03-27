"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";

const emptyForm = { id: "", name: "", slug: "", description: "", imageUrl: "", isActive: true, sortOrder: 0 };

export default function CategoriesManager({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState<any>(emptyForm);
  const [loading, setLoading] = useState(false);

  async function saveCategory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = form.id ? "PUT" : "POST";
    const endpoint = form.id ? `/api/categories/${form.id}` : "/api/categories";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return alert("تعذر حفظ القسم");

    if (form.id) {
      setCategories((current: any[]) => current.map((item) => (item.id === data.id ? data : item)));
    } else {
      setCategories((current: any[]) => [data, ...current]);
    }
    setForm(emptyForm);
  }

  async function deleteCategory(id: string) {
    if (!confirm("حذف القسم؟")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("تعذر حذف القسم");
    setCategories((current: any[]) => current.filter((item) => item.id !== id));
    if (form.id === id) setForm(emptyForm);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={saveCategory} className="admin-card space-y-4">
        <h2 className="text-xl font-black">{form.id ? "تعديل قسم" : "إضافة قسم"}</h2>
        <div>
          <label className="label">اسم القسم</label>
          <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })} required />
        </div>
        <div>
          <label className="label">Slug</label>
          <input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </div>
        <div>
          <label className="label">الوصف</label>
          <textarea className="admin-textarea min-h-28" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="label">رابط الصورة</label>
          <input className="admin-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        </div>
        <div>
          <label className="label">الترتيب</label>
          <input type="number" className="admin-input" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          مفعل
        </label>
        <div className="flex gap-3">
          <button className="admin-btn-primary">{loading ? "جاري الحفظ..." : "حفظ"}</button>
          <button type="button" className="admin-btn-secondary" onClick={() => setForm(emptyForm)}>جديد</button>
        </div>
      </form>

      <div className="admin-card table-wrap">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>Slug</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <div className="font-bold">{category.name}</div>
                  <div className="text-xs text-slate-500">{category.description}</div>
                </td>
                <td>{category.slug}</td>
                <td>{category.isActive ? "نشط" : "مخفي"}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="admin-btn-secondary" onClick={() => setForm(category)}>تعديل</button>
                    <button className="admin-btn-danger" onClick={() => deleteCategory(category.id)}>حذف</button>
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
