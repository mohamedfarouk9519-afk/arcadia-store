import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function GET() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = productSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const product = await prisma.product.create({ data: parsed.data, include: { category: true } });
  return NextResponse.json(product, { status: 201 });
}