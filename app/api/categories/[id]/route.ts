import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { categorySchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function PUT(req: Request, context: any) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = context.params.id;
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = context.params.id;

    const products = await prisma.product.findMany({
      where: { categoryId: id },
      select: { id: true },
    });

    const productIds = products.map((p) => p.id);

    if (productIds.length > 0) {
      await prisma.orderItem.deleteMany({
        where: {
          productId: {
            in: productIds,
          },
        },
      });

      await prisma.productVariant.deleteMany({
        where: {
          productId: {
            in: productIds,
          },
        },
      });

      await prisma.product.deleteMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}