import { cookies } from "next/headers";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";
  return isAdmin;
}