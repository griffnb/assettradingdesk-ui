import { useAccount } from "@/common_lib/authentication/useAccount";
import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import { CustomerAuthLeftNav } from "@/ui/customer/nav/CustomerAuthLeftNav";
import { SidebarInset, SidebarProvider } from "@/ui/shadcn/ui/sidebar";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { Outlet } from "react-router";

export default function RootIndex() {
  const { accountLoading } = useAccount({
    redirectLocation: "/login",
  });

  if (accountLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <InAppLayout noFooter={true} variant="framed">
      <SidebarProvider>
        <CustomerAuthLeftNav />
        <SidebarInset className="!m-0">
          <main className="relative flex max-h-[calc(100dvh-var(--customer-nav-bar))] flex-1 flex-col overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </InAppLayout>
  );
}
