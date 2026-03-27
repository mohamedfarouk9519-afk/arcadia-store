"use client";

import { useState } from "react";

export default function SettingsManager({ initialSettings }: { initialSettings: any }) {
  const [form, setForm] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage("تعذر حفظ الإعدادات");
    setForm(data);
    setMessage("تم حفظ الإعدادات بنجاح");
  }

  return (
    <form onSubmit={save} className="admin-card space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">اسم الموقع</label>
          <input className="admin-input" value={form.siteName || ""} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
        </div>
        <div>
          <label className="label">واتساب (بصيغة دولية)</label>
          <input className="admin-input" value={form.whatsappNumber || ""} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="label">عنوان الهيرو</label>
        <input className="admin-input" value={form.heroTitle || ""} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
      </div>
      <div>
        <label className="label">وصف الهيرو</label>
        <textarea className="admin-textarea min-h-24" value={form.heroSubtitle || ""} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label">إيميل الدعم</label>
          <input className="admin-input" value={form.supportEmail || ""} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
        </div>
        <div>
          <label className="label">رابط اللوجو</label>
          <input className="admin-input" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
        </div>
      </div>
      {message ? <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm">{message}</div> : null}
      <button className="admin-btn-primary">{loading ? "جاري الحفظ..." : "حفظ الإعدادات"}</button>
    </form>
  );
}
