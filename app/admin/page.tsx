import { requireAdminPage } from "@/lib/dal";
import { getExtra } from "@/lib/store";
import AdminDashboard from "./AdminDashboard";
import type { Project, MotionItem } from "@/lib/data";

export default async function AdminPage() {
  await requireAdminPage();

  const [projects, motionItems, shortsItems] = await Promise.all([
    getExtra<Project>("projects"),
    getExtra<MotionItem>("motionItems"),
    getExtra<MotionItem>("shortsItems"),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialMotionItems={motionItems}
      initialShortsItems={shortsItems}
    />
  );
}
