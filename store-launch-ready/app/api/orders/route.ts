import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkoutSchema } from "@/lib/validations";
import { isAdminAuthenticated } from "@/lib/api-auth";

function generateOrderNumber() {
  return `ORD-${Date.now().toString().slice(-8)}`;
}

function buildWhatsappUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const parsed = checkoutSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const totalPrice = parsed.data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName: parsed.data.customerName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      address: parsed.data.address || null,
      notes: parsed.data.notes || null,
      paymentMethod: parsed.data.paymentMethod,
      totalPrice,
      items: {
        create: parsed.data.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          sizeGb: item.sizeGb,
        })),
      },
    },
    include: { items: true },
  });

  const settings = await prisma.siteSetting.findFirst();
  let whatsappUrl = "";
  if (settings?.whatsappNumber) {
    const itemsText = order.items.map((item) => `- ${item.productName} × ${item.quantity}`).join("\n");
    const message = `طلب جديد رقم ${order.orderNumber}\nالاسم: ${order.customerName}\nالهاتف: ${order.phone}\nطريقة الدفع: ${order.paymentMethod}\nالإجمالي: ${order.totalPrice} جنيه\n${itemsText}`;
    whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, message);
  }

  return NextResponse.json({ ...order, whatsappUrl }, { status: 201 });
}