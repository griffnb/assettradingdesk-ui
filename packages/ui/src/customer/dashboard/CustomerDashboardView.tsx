import { AccountModel } from "@/models/models/account/model/AccountModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { CustomerDashboardHeader } from "./CustomerDashboardHeader";
import { CustomerDashboardListingsTable } from "./CustomerDashboardListingsTable";
import { CustomerDashboardRequestsTable } from "./CustomerDashboardRequestsTable";
import { DashboardStat } from "./CustomerDashboardStatsGrid";
import { CustomerDashboardSuggestedTools } from "./CustomerDashboardSuggestedTools";

export interface CustomerDashboardViewProps
  extends HTMLAttributes<HTMLDivElement> {
  account: AccountModel;
  stats: DashboardStat[];
}

export const CustomerDashboardView = observer(function CustomerDashboardView(
  fullProps: CustomerDashboardViewProps,
) {
  const {
    className,
    account,
    //stats,
    ...props
  } = fullProps;

  return (
    <div
      className={cn("@container flex w-full flex-col gap-6 p-8", className)}
      {...props}
    >
      <CustomerDashboardHeader userName={account.name || ""} />
      {/*<CustomerDashboardStatsGrid stats={stats} />*/}
      <div className="flex w-full flex-col gap-7">
        <CustomerDashboardSuggestedTools />
        <div className="@md:flex-row flex w-full flex-col gap-10">
          <CustomerDashboardRequestsTable />
          <CustomerDashboardListingsTable />
        </div>
      </div>
    </div>
  );
});
