import CheckoutClient from "@/components/store/CheckoutClient";
import { prisma } from "@/lib/db";

export default async function CheckoutPage() {
  const settings = await prisma.siteSetting.findFirst();
  return (
    <main className="container-app py-14">
      <div className="mb-8">
        <h1 className="section-title">إتمام الطلب</h1>
        <p className="section-subtitle">الطلب يتسجل عندك في لوحة التحكم ثم يفتح واتساب برسالة جاهزة للمتابعة.</p>
      </div>
      <CheckoutClient whatsappNumber={settings?.whatsappNumber || ""} />
    </main>
  );
}
