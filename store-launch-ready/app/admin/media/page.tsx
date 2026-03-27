import AdminShell from "@/components/admin/AdminShell";
import MediaManager from "@/components/admin/MediaManager";

export default function AdminMediaPage() {
  return (
    <AdminShell title="الصور والملفات">
      <MediaManager />
    </AdminShell>
  );
}
