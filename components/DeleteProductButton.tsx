"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = window.confirm("متأكد عايز تحذف؟");
    if (!ok) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("فشل حذف المنتج");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-3 py-1 text-white"
    >
      حذف
    </button>
  );
}