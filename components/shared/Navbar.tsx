"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  const handleSecretClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;

      if (newCount === 5) {
        const password = prompt("Enter admin password");

        if (password === "123456") {
          router.push("/admin");
        } else {
          alert("Wrong password");
        }

        return 0;
      }

      return newCount;
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="container-app flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            onClick={handleSecretClick}
            className="text-xl font-black tracking-tight text-white md:text-2xl"
          >
            Store Launch Ready
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/">الرئيسية</Link>
            <Link href="/cart">السلة</Link>
            <Link href="/checkout">إتمام الطلب</Link>

            <button
              type="button"
              onClick={handleSecretClick}
              className="text-xl"
              aria-label="Hidden admin"
            >
              🎮
            </button>
          </nav>
        </div>

        <Link href="/cart" className="btn-secondary !rounded-full !px-4 !py-2">
          السلة
          <span className="mr-2 rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-black text-slate-950">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}