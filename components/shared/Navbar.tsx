"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="container-app flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">
            Store Launch Ready
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/">الرئيسية</Link>
            <Link href="/cart">السلة</Link>
            <Link href="/checkout">إتمام الطلب</Link>
            <Link href="/admin/login">الأدمن</Link>
          </nav>
        </div>
        <Link href="/cart" className="btn-secondary !rounded-full !px-4 !py-2">
          السلة
          <span className="mr-2 rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-black text-slate-950">{count}</span>
        </Link>
      </div>
    </header>
  );
}
