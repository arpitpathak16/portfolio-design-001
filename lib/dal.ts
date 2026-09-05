import "server-only";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "./session";

export async function requireAdminPage() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) redirect("/admin/login");
}
