import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/lib/api-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await prisma.siteSetting.findFirst();
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = siteSettingsSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = await prisma.siteSetting.findFirst();
  const settings = existing
  ? await prisma.siteSetting.update({
      where: { id: existing.id },
      data: {
        ...parsed.data,
        updatedAt: new Date(),
      },
    })
  : await prisma.siteSetting.create({
      data: {
        ...parsed.data,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json(settings);
}