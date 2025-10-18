import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { TrendingUp } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

export interface CustomerDashboardStatCardProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  trend?: string;
  comparison?: string;
  comparisonValue?: string | number;
}

export const CustomerDashboardStatCard = observer(
  function CustomerDashboardStatCard(
    fullProps: CustomerDashboardStatCardProps,
  ) {
    const {
      className,
      title,
      value,
      trend,
      comparison,
      comparisonValue,
      ...props
    } = fullProps;

    return (
      <Card className={cn("border", className)} {...props}>
        <CardContent className="flex flex-col gap-2 p-6">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {trend && (
              <Badge
                variant="outline"
                className="gap-1 border-green-200 bg-green-50"
              >
                <TrendingUp className="size-3 text-green-700" />
                <span className="text-xs font-semibold text-green-700">
                  {trend}
                </span>
              </Badge>
            )}
          </div>
          <div className="flex w-full flex-col items-start">
            <p className="h-8 text-2xl font-bold leading-8 text-foreground">
              {value}
            </p>
            {comparison && comparisonValue !== undefined && (
              <p className="text-xs text-muted-foreground">
                {comparison}{" "}
                <span className="font-semibold text-neutral-500">
                  {comparisonValue}
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);
