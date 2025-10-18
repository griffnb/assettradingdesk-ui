import { CustomerAuthLeftNav } from "@/ui/customer/auth/nav/CustomerAuthLeftNav";
import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/shadcn/ui/sidebar3";
import { Outlet } from "react-router";

export default function RootIndex() {
  return (
    <InAppLayout>
      <SidebarProvider>
        <CustomerAuthLeftNav />
        <SidebarInset className="overflow-hidden">
          <SidebarTrigger />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </InAppLayout>
  );
}
