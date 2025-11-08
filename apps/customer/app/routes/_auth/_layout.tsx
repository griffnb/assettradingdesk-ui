import { useAccount } from "@/common_lib/authentication/useAccount";
import { CustomerAuthLeftNav } from "@/ui/customer/auth/nav/CustomerAuthLeftNav";
import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import { SidebarInset, SidebarProvider } from "@/ui/shadcn/ui/sidebar";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { Outlet, useNavigate } from "react-router";

export default function RootIndex() {
  const { account, accountLoading } = useAccount();
  const nav = useNavigate();
  if (accountLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (!account) {
    nav("/login");
    return null;
  }

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
