export const dynamic = "force-dynamic";
import ProductDetailsClient from "@/components/store/ProductDetailsClient";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug: slug,
      isActive: true, // 👈 مهم
    },
    include: {
  category: true,
  variants: true,
},
  });

  if (!product) {
    return <main className="container-app py-20">المنتج غير موجود</main>;
  }

  return (
    <main className="container-app py-14">
      <ProductDetailsClient product={JSON.parse(JSON.stringify(product))} />
    </main>
  );
}
