import { cookies } from "next/headers";

export async function isAdminAuthenticated() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";
  return isAdmin;
}