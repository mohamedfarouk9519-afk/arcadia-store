"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

console.log("ID:", id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!id) return;

  fetch(`/api/products/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    })
    .then((data) => {
      setName(data.name || "");
      setPrice(String(data.sizeGb ?? ""));
      setImageUrl(data.imageUrl || "");
      setCategoryId(data.categoryId || "");
      setIsActive(Boolean(data.isActive));
    })
    .catch((error) => {
      console.error(error);
      alert("فشل تحميل بيانات المنتج");
    });

  fetch("/api/categories")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    })
    .then((data) => {
      setCategories(Array.isArray(data) ? data : []);
    })
    .catch((error) => {
      console.error(error);
      alert("فشل تحميل الأقسام");
    });
}, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  name,
  sizeGb: Number(price),
  imageUrl,
  categoryId,
  isActive,
}),
});

      if (res.ok) {
        alert("تم التعديل ✅");
        router.push("/admin/products");
        return;
      }

      const errorText = await res.text();
      console.error(errorText);
      alert("فشل تعديل المنتج ❌");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8" dir="rtl">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">تعديل المنتج</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم المنتج"
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="جيجات اللعبة (GB)"
            className="w-full rounded-xl border p-3 text-black"
          />

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="رابط الصورة"
            className="w-full rounded-xl border p-3 text-black"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-xl border p-3 text-black"
          >
            <option value="">اختر القسم</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
            className="w-full rounded-xl border p-3 text-black"
          >
            <option value="true">نشط</option>
            <option value="false">مخفي</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 p-3 text-white disabled:opacity-60"
          >
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </form>
      </div>
    </main>
  );
}