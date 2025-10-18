import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { CustomerDashboardStatCard } from "./CustomerDashboardStatCard";

export interface DashboardStat {
  title: string;
  value: string | number;
  trend?: string;
  comparison?: string;
  comparisonValue?: string | number;
}

export interface CustomerDashboardStatsGridProps
  extends HTMLAttributes<HTMLDivElement> {
  stats: DashboardStat[];
}

export const CustomerDashboardStatsGrid = observer(
  function CustomerDashboardStatsGrid(
    fullProps: CustomerDashboardStatsGridProps,
  ) {
    const { className, stats, ...props } = fullProps;
    return (
      <div className={cn("flex w-full gap-4", className)} {...props}>
        {stats.map((stat, index) => (
          <CustomerDashboardStatCard
            key={index}
            className="flex-1"
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            comparison={stat.comparison}
            comparisonValue={stat.comparisonValue}
          />
        ))}
      </div>
    );
  },
);
