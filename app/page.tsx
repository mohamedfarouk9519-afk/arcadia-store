
export const dynamic = "force-dynamic";
import HardSelector from "@/components/store/HardSelector";
import { useCart } from "@/components/providers/CartProvider";
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },                                                                           
    include: {
      products: {
        where: { isActive: true },
        orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
        take: 4,
      },
    },
  });

  return (
    <main className="min-h-screen bg-black text-white">
<HardSelector />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold">Store Launch Ready</h1>
        <p className="mb-10 text-white/70">
          أهلاً بيك، دي الصفحة الرئيسية للموقع.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="mb-2 text-2xl font-semibold">{category.name}</h2>
              <p className="mb-4 text-white/60">
                {category.description || "No description"}
              </p>

              <div className="mb-4 space-y-2">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-white/60">
                      
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/category/${category.slug}`}
                className="inline-block rounded-xl bg-white px-4 py-2 text-black"
              >
                فتح القسم
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}