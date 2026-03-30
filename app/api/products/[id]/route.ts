import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function GET(req: Request, context: any) {
  try {
    const id = context.params.id;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = context.params.id;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.shortDescription !== undefined && {
          shortDescription: body.shortDescription || "",
        }),
        ...(body.description !== undefined && {
          description: body.description || "",
        }),
        ...(body.imageUrl !== undefined && {
          imageUrl: body.imageUrl || "",
        }),
        ...(body.price !== undefined && {
          price: Number(body.price),
        }),
        ...(body.oldPrice !== undefined && {
          oldPrice:
            body.oldPrice === null || body.oldPrice === ""
              ? null
              : Number(body.oldPrice),
        }),
        ...(body.sizeGb !== undefined && {
          sizeGb:
            body.sizeGb === null || body.sizeGb === ""
              ? null
              : Number(body.sizeGb),
        }),
        ...(body.categoryId !== undefined && {
          categoryId: body.categoryId,
        }),
        ...(body.isFeatured !== undefined && {
          isFeatured: body.isFeatured,
        }),
        ...(body.isActive !== undefined && {
          isActive: body.isActive,
        }),
        ...(body.stockStatus !== undefined && {
          stockStatus: body.stockStatus,
        }),
        ...(body.sortOrder !== undefined && {
          sortOrder: Number(body.sortOrder),
        }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PUT PRODUCT ERROR:", error);
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = context.params.id;

    await prisma.$transaction([
      prisma.orderItem.deleteMany({
        where: { productId: id },
      }),
      prisma.productVariant.deleteMany({
        where: { productId: id },
      }),
      prisma.product.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}