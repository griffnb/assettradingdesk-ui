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
import { ArrowUpRight, Tag } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { Link } from "react-router";

export interface ListingData {
  id: string;
  listing: string;
  listingUrl?: string;
  destinationCountry: string;
  price: string;
  pipelines: number;
}

export interface CustomerDashboardListingsTableProps
  extends HTMLAttributes<HTMLDivElement> {
  listings: ListingData[];
  onViewAll?: () => void;
  onManage?: (id: string) => void;
}

export const CustomerDashboardListingsTable = observer(
  function CustomerDashboardListingsTable(
    fullProps: CustomerDashboardListingsTableProps,
  ) {
    const { className, listings, onViewAll, onManage, ...props } = fullProps;
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
            <Tag className="size-8" />
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Listings
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onViewAll}
          >
            <span>View All</span>
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <div className="flex min-w-[356px] flex-col pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[85px]">Listing</TableHead>
                <TableHead className="min-w-[85px]">
                  Destination Country
                </TableHead>
                <TableHead className="min-w-[85px]">Price</TableHead>
                <TableHead className="min-w-[85px]">Pipelines</TableHead>
                <TableHead className="min-w-[85px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.slice(0, 5).map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    {listing.listingUrl ? (
                      <Link
                        to={listing.listingUrl}
                        className="truncate font-semibold text-primary"
                      >
                        {listing.listing}
                      </Link>
                    ) : (
                      <span className="truncate font-semibold text-primary">
                        {listing.listing}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {listing.destinationCountry}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm font-semibold text-foreground">
                      {listing.price}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm font-semibold text-foreground">
                      {listing.pipelines}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => onManage?.(listing.id)}
                    >
                      Manage
                    </Button>
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
