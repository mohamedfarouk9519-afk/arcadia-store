"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setPrice(String(data.price || ""));
        setImageUrl(data.imageUrl || "");
        setCategoryId(data.categoryId || "");
        setIsActive(Boolean(data.isActive));
      });

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        imageUrl,
        categoryId,
        isActive,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("فشل تعديل المنتج");
    }
  }

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
            placeholder="السعر"
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
            className="w-full rounded-xl bg-green-600 p-3 text-white"
          >
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </form>
      </div>
    </main>
  );
}