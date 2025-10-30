import { CustomerAuthLeftNav } from "@/ui/customer/auth/nav/CustomerAuthLeftNav";
import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import { SidebarInset, SidebarProvider } from "@/ui/shadcn/ui/sidebar";
import { Outlet } from "react-router";

export default function RootIndex() {
  return (
    <InAppLayout noFooter={true}>
      <SidebarProvider>
        <CustomerAuthLeftNav />
        <SidebarInset className="!m-0">
          <main className="flex h-full flex-col overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </InAppLayout>
  );
}
