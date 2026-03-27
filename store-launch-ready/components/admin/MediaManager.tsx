"use client";

import { useState } from "react";

export default function MediaManager() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage(data.error || "تعذر رفع الصورة");
    setUrl(data.url);
    setMessage("تم الرفع بنجاح. انسخ الرابط واستخدمه داخل المنتجات أو الأقسام.");
  }

  return (
    <form onSubmit={upload} className="admin-card space-y-4">
      <div>
        <h2 className="text-xl font-black">رفع صورة</h2>
        <p className="mt-2 text-sm text-slate-500">هذه الصفحة ترفع الصور إلى Supabase Storage bucket: uploads.</p>
      </div>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="admin-btn-primary">{loading ? "جاري الرفع..." : "رفع"}</button>
      {message ? <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm">{message}</div> : null}
      {url ? (
        <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <img src={url} alt="uploaded" className="h-64 w-full rounded-2xl object-cover" />
          <input className="admin-input" readOnly value={url} />
        </div>
      ) : null}
    </form>
  );
}
