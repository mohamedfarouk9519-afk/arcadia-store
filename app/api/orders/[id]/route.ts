import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  const order = await prisma.order.update({
    where: { id },
    data: { status: body.status },
    include: { items: true },
  });
  return NextResponse.json(order);
}