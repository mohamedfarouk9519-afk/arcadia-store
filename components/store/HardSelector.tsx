"use client";

import { useCart } from "@/components/providers/CartProvider";

export default function HardSelector() {
  const { capacityGb, setCapacityGb, usedGb, remainingGb, progressPercent } = useCart();

  const hardOptions = [
  { label: "غير محدود", value: 0 }, // ✅ الصح
  { label: "100 GB", value: 100 },
  { label: "500 GB", value: 500 },
  { label: "1 TB", value: 1000 },
  { label: "2 TB", value: 2000 },
  { label: "3 TB", value: 3000 },
  { label: "4 TB", value: 4000 },
  { label: "5 TB", value: 5000 },
  { label: "6 TB", value: 6000 },
  { label: "7 TB", value: 7000 },
  { label: "8 TB", value: 8000 },
  { label: "9 TB", value: 9000 },
  { label: "10 TB", value: 10000 },
];

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-white">املأ هاردك</div>
          <div className="text-xs text-slate-400">
            المستخدم: {usedGb} GB / المتبقي: {remainingGb} GB
          </div>
        </div>

        <select
          value={capacityGb}
          onChange={(e) => setCapacityGb(Number(e.target.value))}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-white"
        >
          {hardOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}