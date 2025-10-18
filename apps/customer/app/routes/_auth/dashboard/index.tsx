import { CustomerDashboardView } from "@/ui/customer/dashboard/CustomerDashboardView";

export default function RootIndex() {
  return (
    <CustomerDashboardView
      stats={[
        {
          title: "Total Assets",
          value: "120",
          trend: "up",
          comparison: "last month",
          comparisonValue: "100",
        },
        {
          title: "Total Value",
          value: "$1,200,000",
          trend: "up",
          comparison: "last month",
          comparisonValue: "$1,000,000",
        },
        {
          title: "New Listings",
          value: "15",
          trend: "down",
          comparison: "last month",
          comparisonValue: "20",
        },
      ]}
    />
  );
}
