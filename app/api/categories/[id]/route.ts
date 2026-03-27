import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { categorySchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function PUT(req: Request, context: any) {
  const id = context.params.id;

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = categorySchema.safeParse(await req.json());

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
}

export async function DELETE(req: Request, context: any) {
  const id = context.params.id;

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}