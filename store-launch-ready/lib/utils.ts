export function formatPrice(value: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "تم التأكيد",
    processing: "جاري التنفيذ",
    completed: "مكتمل",
    cancelled: "ملغي",
  };
  return map[status] || status;
}
