import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/api-auth";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "حصل خطأ أثناء جلب المنتجات" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    if (!firstCategory && !body.categoryId) {
      return NextResponse.json(
        { error: "لا يوجد قسم متاح" },
        { status: 400 }
      );
    }

    const lastProduct = await prisma.product.findFirst({
      orderBy: { sortOrder: "desc" },
    });

    const cleanVariants = Array.isArray(body.variants)
      ? body.variants
          .filter((v: any) => v && v.sizeGb !== undefined && v.sizeGb !== "")
          .map((v: any) => ({
            sizeGb: Number(v.sizeGb),
          }))
          .filter((v: any) => !Number.isNaN(v.sizeGb))
      : [];

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: `${slugify(body.name)}-${Date.now()}`,
        shortDescription: body.shortDescription || body.name,
        description: body.description || body.name,
        imageUrl: body.imageUrl || "",
        galleryJson: "[]",
        sizeGb: cleanVariants.length > 0 ? cleanVariants[0].sizeGb : null,
        price: 0,
        oldPrice: null,
        isFeatured: false,
        isActive: true,
        stockStatus: "available",
        sortOrder: (lastProduct?.sortOrder ?? 0) + 1,
        categoryId: body.categoryId || firstCategory!.id,
        variants: {
          create: cleanVariants,
        },
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("POST PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "حصل خطأ أثناء إضافة المنتج" },
      { status: 500 }
    );
  }
}