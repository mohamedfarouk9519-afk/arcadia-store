import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function PUT(req: Request, context: any) {
  const id = context.params.id;

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const order = await prisma.order.update({
    where: { id },
    data: {
      status: body.status,
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json(order);
}