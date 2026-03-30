"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin-logout", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-4 py-2 text-white font-bold"
    >
      تسجيل الخروج
    </button>
  );
}