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

        fetch("/api/admin-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(() => {
            router.push("/admin");
          })
          .catch(() => {
            alert("Wrong password");
          });

        return 0;
      }

      return newCount;
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-fuchsia-500/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.12)]">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            onClick={handleSecretClick}
            className="glow text-xl font-black tracking-tight text-white md:text-2xl"
          >
            Arcadia Store 🕹️
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/"
              className="text-slate-300 transition hover:text-cyan-300"
            >
              الرئيسية
            </Link>

            <Link
              href="/cart"
              className="text-slate-300 transition hover:text-cyan-300"
            >
              السلة
            </Link>

            <Link
              href="/checkout"
              className="text-slate-300 transition hover:text-cyan-300"
            >
              إتمام الطلب
            </Link>

            <button
              type="button"
              onClick={handleSecretClick}
              className="rounded-full border border-fuchsia-400/30 bg-white/5 px-3 py-2 text-lg text-slate-200 transition hover:scale-105 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/10"
              aria-label="Hidden admin"
            >
              🎮
            </button>
          </nav>
        </div>

        <Link
          href="/cart"
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.15)] transition hover:scale-105 hover:bg-cyan-400/20"
        >
          السلة
          <span className="mr-2 rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-black text-slate-950">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}