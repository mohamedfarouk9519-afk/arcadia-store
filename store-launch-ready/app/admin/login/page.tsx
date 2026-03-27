"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("بيانات الدخول غير صحيحة");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <main className="admin-shell flex items-center justify-center px-4 py-16">
      <form onSubmit={onSubmit} className="admin-card w-full max-w-md space-y-4">
        <div>
          <div className="text-sm font-bold text-slate-500">Admin Access</div>
          <h1 className="mt-2 text-3xl font-black">تسجيل دخول الأدمن</h1>
        </div>
        <div>
          <label className="label">البريد الإلكتروني</label>
          <input className="admin-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">كلمة المرور</label>
          <input type="password" className="admin-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}
        <button className="admin-btn-primary w-full">{loading ? "جاري الدخول..." : "دخول"}</button>
      </form>
    </main>
  );
}
