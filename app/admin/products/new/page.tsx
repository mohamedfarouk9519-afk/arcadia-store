"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [variants, setVariants] = useState([
  { sizeGb: "" }
]);

  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(String(data[0].id));
        }
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const cleanVariants = variants
      .filter((v) => v.sizeGb)
      

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        imageUrl,
        categoryId,
        variants: cleanVariants,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "حصل خطأ أثناء الإضافة");
      setLoading(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  } catch (error) {
    setError("حصل خطأ أثناء الإضافة");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-slate-100 p-8" dir="rtl">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow text-black">
        <h1 className="mb-4 text-2xl font-bold text-black">إضافة منتج</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
  placeholder="سعر المنتج"
  className="w-full rounded-xl border p-3 text-black placeholder:text-slate-400"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>
<input
  placeholder="رابط الصورة"
  className="w-full rounded-xl border p-3 text-black placeholder:text-slate-400"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
/>

          <select
            className="w-full rounded-xl border p-3 text-black"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
<div className="mt-6 space-y-3">
  <h3 className="text-lg font-bold text-black">الجيجات</h3>

  {variants.map((variant, index) => (
  <div key={index} className="grid gap-2 md:grid-cols-3">

    <input
      placeholder="الحجم GB"
      value={variant.sizeGb}
      onChange={(e) => {
        const newVariants = [...variants];
        newVariants[index].sizeGb = e.target.value;
        setVariants(newVariants);
      }}
      className="w-full rounded-xl border p-3 text-black"
    />

  </div>
))}

  <button
    type="button"
    onClick={() =>
      setVariants([...variants, { sizeGb: "" }])
    }
    className="rounded-xl bg-blue-600 px-4 py-2 text-white"
  >
    + إضافة جيجا
  </button>
</div>
          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 p-3 text-white"
            disabled={loading}
          >
            {loading ? "جاري الإضافة..." : "إضافة"}
          </button>
        </form>
      </div>
    </main>
  );
}