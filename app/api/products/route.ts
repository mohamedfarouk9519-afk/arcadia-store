import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
  return NextResponse.json(
    { error: "اسم المنتج مطلوب" },
    { status: 400 }
  );
}

    const firstCategory = await prisma.category.findFirst({
      orderBy: { createdAt: "asc" },
    });

    if (!firstCategory) {
      return Response.json(
        { error: "لا يوجد قسم متاح" },
        { status: 400 }
      );
    }

    const lastProduct = await prisma.product.findFirst({
      orderBy: { sortOrder: "desc" },
    });

    const product = await prisma.product.create({
  data: {
    name: body.name,
    slug: `${slugify(body.name)}-${Date.now()}`,
    price: 0,
    shortDescription: body.name,
    description: body.name,
    imageUrl: body.imageUrl || "",
    galleryJson: "[]",
    sizeGb: 0,
    oldPrice: null,
    isFeatured: false,
    isActive: true,
    stockStatus: "available",
    sortOrder: (lastProduct?.sortOrder ?? 0) + 1,
    categoryId: body.categoryId || firstCategory.id,

    variants: {
      create: (body.variants || [])
        .filter((v: any) => v.sizeGb)
.map((v: any) => ({
  name: v.name || `نسخة ${v.sizeGb}GB`,
  price: Number(v.price || body.price),
  sizeGb: Number(v.sizeGb),
})),
    },
  },
  include: {
    category: true,
    variants: true,
  },
});

    revalidatePath("/");
    revalidatePath("/product");
    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/admin/products");

    return Response.json(product);
  } catch (error: any) {
  console.error("PRODUCT_CREATE_ERROR:", error);

  return Response.json(
    {
      error:
        error?.message ||
        error?.toString() ||
        "فشل إنشاء المنتج",
    },
    { status: 500 }
  );
}
}