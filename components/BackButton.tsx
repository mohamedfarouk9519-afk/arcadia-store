"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        background: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      رجوع
    </button>
  );
}