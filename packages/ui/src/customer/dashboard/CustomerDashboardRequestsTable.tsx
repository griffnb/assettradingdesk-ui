import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { cn } from "@/utils/cn";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";

export interface CustomerDashboardRequestsTableProps
  extends HTMLAttributes<HTMLDivElement> {}

export const CustomerDashboardRequestsTable = observer(
  function CustomerDashboardRequestsTable(
    fullProps: CustomerDashboardRequestsTableProps,
  ) {
    const { className, ...props } = fullProps;

    const [requests, setRequests] = useState<RequestModel[]>([]);

    useEffect(() => {
      Store.request.query({ limit: "20" }).then((resp) => {
        if (resp.success && resp.data) {
          setRequests(resp.data);
        }
      });
    }, []);

    return (
      <div
        className={cn(
          "flex flex-1 flex-col gap-6 overflow-hidden rounded-lg shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between pb-0">
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-8" />
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Requests
            </h2>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <span>View All</span>
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <div className="flex min-w-[356px] flex-col pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[85px]">Model</TableHead>
                <TableHead className="min-w-[85px]">Facility</TableHead>
                <TableHead className="min-w-[85px]">Price Range</TableHead>
                <TableHead className="min-w-[85px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {request.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {request.min_price} - {request.max_price}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {request.expire_at_ts?.format("MM/DD/YYYY") || "N/A"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
);
