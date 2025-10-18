import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";

export interface CustomerDashboardHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  userName?: string;
}

export const CustomerDashboardHeader = observer(
  function CustomerDashboardHeader(fullProps: CustomerDashboardHeaderProps) {
    const { className, userName = "User", ...props } = fullProps;
    return (
      <div
        className={cn("flex w-full items-center justify-between", className)}
        {...props}
      >
        <h1 className="text-3xl font-bold leading-9 tracking-tight text-foreground">
          Welcome, {userName}
        </h1>
      </div>
    );
  },
);
