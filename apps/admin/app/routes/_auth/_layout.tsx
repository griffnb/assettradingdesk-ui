import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { AdminLayout } from "@/ui/admin/layout/AdminLayout";
import { Outlet } from "react-router";

export default function RootIndex() {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
