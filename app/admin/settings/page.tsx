import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import AdminShell from "@/components/admin/AdminShell";
import SettingsManager from "@/components/admin/SettingsManager";
import { prisma } from "@/lib/db";

export default async function AdminSettingsPage() {
const cookieStore = await cookies();
const isAdmin = cookieStore.get("admin_auth")?.value === "true";

if (!isAdmin) {
  redirect("/");
}
  const settings = await prisma.siteSetting.findFirst();
  const fallback = settings || { siteName: "Store Launch Ready", heroTitle: "", heroSubtitle: "", whatsappNumber: "", supportEmail: "", logoUrl: "", primaryColor: "#22d3ee", secondaryColor: "#0f172a" };

  return (
    <AdminShell title="إعدادات الموقع">
      <SettingsManager initialSettings={JSON.parse(JSON.stringify(fallback))} />
    </AdminShell>
  );
}
