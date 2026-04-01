
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "true";
} 

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
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

    const { id } = await context.params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || "" }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),

        ...(body.price !== undefined && {
          price: Number(body.price),
        }),

        ...(body.sizeGb !== undefined && {
          sizeGb:
            body.sizeGb === null || body.sizeGb === ""
              ? null
              : Number(body.sizeGb),
        }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PUT PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

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