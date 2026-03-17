import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/common_lib/utils/cn";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import {
  RequestFormModal,
  RequestFormModalId,
} from "@/ui/customer/requests/RequestFormModal";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/ui/shadcn/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { ArrowUpRightIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  RequestSuggestions,
  RequestSuggestionsId,
} from "../requests/RequestSuggestions";

export interface CustomerDashboardRequestsTableProps
  extends HTMLAttributes<HTMLDivElement> {}

export const CustomerDashboardRequestsTable = observer(
  function CustomerDashboardRequestsTable(
    fullProps: CustomerDashboardRequestsTableProps,
  ) {
    const { className, ...props } = fullProps;

    const [requests, setRequests] = useState<RequestModel[]>([]);

    useEffect(() => {
      loadRequests();
    }, []);

    const loadRequests = useCallback(async () => {
      Store.request.query({ limit: "20" }).then((resp) => {
        if (resp.success && resp.data) {
          setRequests(resp.data);
        }
      });
    }, []);

    const openNewRequest = useCallback(() => {
      LayerService.addOnly(RequestFormModalId, RequestFormModal, {
        onSave: () => {
          LayerService.remove(RequestFormModalId);
          loadRequests();
        },
      });
    }, []);

    const openMatches = useCallback((record: RequestModel) => {
      LayerService.addOnly({
        id: RequestSuggestionsId,
        component: RequestSuggestions,
        props: { record },
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
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Requests
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/manage/requests">
              <span>View All</span>
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="flex w-full flex-col pb-6">
          {requests.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <i className="fa fa-bell-concierge" />
                </EmptyMedia>
                <EmptyTitle>No Requests Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t created any requests yet. Get started by
                  creating your first asset request.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex gap-2">
                  <Button onClick={openNewRequest}>Create Request</Button>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[85px]">Model</TableHead>
                  <TableHead className="min-w-[85px]">Facility</TableHead>
                  <TableHead className="min-w-[85px]">Price Range</TableHead>
                  <TableHead className="min-w-[85px]">Matches</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request.id}
                    onClick={() => openMatches(request)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell>
                      <span className="truncate text-sm text-foreground">
                        {request.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="truncate text-sm text-foreground">
                        {request.facility_name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="truncate text-sm text-foreground">
                        ${request.min_price} - ${request.max_price}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="truncate text-sm text-foreground">
                        {request.match_count}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    );
  },
);
