"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ToggleProductStatusButton({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: !isActive,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("فشل تغيير الحالة");
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`rounded-lg px-3 py-1 text-white ${
        isActive ? "bg-emerald-600" : "bg-slate-500"
      }`}
    >
      {loading ? "..." : isActive ? "نشط" : "مخفي"}
    </button>
  );
}