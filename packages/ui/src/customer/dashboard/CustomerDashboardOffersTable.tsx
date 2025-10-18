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
import { HTMLAttributes } from "react";
import { Link } from "react-router";

export interface OfferData {
  id: string;
  listing: string;
  listingUrl?: string;
  buyer: string;
  buyerEmail: string;
  destinationCountry: string;
  date: string;
  offerAmount: string;
}

export interface CustomerDashboardOffersTableProps
  extends HTMLAttributes<HTMLDivElement> {
  offers: OfferData[];
  onViewAll?: () => void;
}

export const CustomerDashboardOffersTable = observer(
  function CustomerDashboardOffersTable(
    fullProps: CustomerDashboardOffersTableProps,
  ) {
    const { className, offers, onViewAll, ...props } = fullProps;
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
              Offers
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
                <TableHead className="min-w-[85px]">Buyer</TableHead>
                <TableHead className="min-w-[85px]">
                  Destination Country
                </TableHead>
                <TableHead className="min-w-[85px]">Date</TableHead>
                <TableHead className="min-w-[85px]">Offer Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.slice(0, 5).map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    {offer.listingUrl ? (
                      <Link
                        to={offer.listingUrl}
                        className="truncate font-semibold text-primary"
                      >
                        {offer.listing}
                      </Link>
                    ) : (
                      <span className="truncate font-semibold text-primary">
                        {offer.listing}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col whitespace-nowrap text-sm">
                      <span className="overflow-hidden text-ellipsis font-medium text-foreground">
                        {offer.buyer}
                      </span>
                      <span className="overflow-hidden text-ellipsis text-muted-foreground">
                        {offer.buyerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {offer.destinationCountry}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm text-foreground">
                      {offer.date}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="truncate text-sm font-semibold text-foreground">
                      {offer.offerAmount}
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
