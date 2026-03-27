import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || "" }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: "حصل خطأ" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "حصل خطأ" }, { status: 500 });
  }
}