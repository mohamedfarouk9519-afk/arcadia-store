import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, context: any) {
  try {
    const id = context.params.id;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  try {
    const id = context.params.id;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || "" }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const id = context.params.id;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "حصل خطأ" }, { status: 500 });
  }
}