import ProductCard from "@/components/store/ProductCard";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      },
    },
  });

  if (!category) {
    return <main className="container-app py-20">القسم غير موجود</main>;
  }

  return (
    <main className="container-app py-14">
      <div className="mb-8 card">
        <h1 className="text-4xl font-black">{category.name}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{category.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
