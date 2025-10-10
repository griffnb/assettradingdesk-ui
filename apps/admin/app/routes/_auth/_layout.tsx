import { AdminLayout } from "@/ui/admin/layout/AdminLayout";
import { Outlet } from "react-router";

export default function RootIndex() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
