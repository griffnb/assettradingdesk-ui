import { AssetModel } from "@/models/models/asset/model/AssetModel";
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
import { ArrowUpRight, Tag } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";
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
  extends HTMLAttributes<HTMLDivElement> {}

export const CustomerDashboardListingsTable = observer(
  function CustomerDashboardListingsTable(
    fullProps: CustomerDashboardListingsTableProps,
  ) {
    const { className, ...props } = fullProps;
    const [assets, setAssests] = useState<AssetModel[]>([]);

    useEffect(() => {
      Store.asset.query({ limit: "10" }).then((resp) => {
        if (resp.success && resp.data) {
          setAssests(resp.data);
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
            <Tag className="size-8" />
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Assets
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
                <TableHead className="min-w-[85px]">Listing</TableHead>
                <TableHead className="min-w-[85px]">Facility</TableHead>
                <TableHead className="min-w-[85px]">Price</TableHead>
                <TableHead className="min-w-[85px]">Pipelines</TableHead>
                <TableHead className="min-w-[85px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    {asset.publicLink ? (
                      <Link
                        to={asset.publicLink}
                        className="truncate font-semibold text-primary"
                      >
                        {asset.label}
                      </Link>
                    ) : (
                      <span className="truncate font-semibold text-primary">
                        {asset.label}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      USA
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm font-semibold text-foreground">
                      {asset.price}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm font-semibold text-foreground">
                      5
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
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
