import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import { Outlet } from "react-router";

export default function RootIndex() {
  return (
    <InAppLayout>
      <Outlet />
    </InAppLayout>
  );
}
