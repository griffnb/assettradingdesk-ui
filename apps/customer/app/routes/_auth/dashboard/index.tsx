import { CustomerDashboardView } from "@/ui/customer/dashboard/CustomerDashboardView";

export default function RootIndex() {
  return (
    <CustomerDashboardView
      listings={[]}
      offers={[]}
      stats={[]}
      suggestedTools={[]}
    />
  );
}
