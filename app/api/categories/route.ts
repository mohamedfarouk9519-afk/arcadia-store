import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });

  return Response.json(categories);
}