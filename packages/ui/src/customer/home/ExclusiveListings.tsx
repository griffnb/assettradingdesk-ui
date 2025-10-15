import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/shadcn/ui/button";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react";
import { HTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AssetCard } from "../assets/AssetCard";

const styleVariants = cva(
  "bg-white relative shrink-0 w-full border-t border-neutral-200",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Exclusive Listings Component
 *
 * Displays exclusive products section with smaller listing cards
 */

export interface ExclusiveListingsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {}

export const ExclusiveListings = observer(function ExclusiveListings(
  fullProps: ExclusiveListingsProps,
) {
  const { className, variant, ...props } = fullProps;
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const nav = useNavigate();
  useEffect(() => {
    // Fetch or generate asset data
    const fetchAssets = async () => {
      const resp = await Store.asset.query({
        disabled: "0",
        "_c:has_pictures": "1",
        limit: "4",
        order: "verified_at_ts desc, picture_count desc",
      });
      if (resp.success && resp.data) {
        setAssets(resp.data);
        return;
      }
    };
    fetchAssets();
  }, []);

  return (
    <div className={cn(styleVariants({ variant, className }))} {...props}>
      <div className="size-full">
        <div className="relative box-border flex w-full flex-col content-stretch items-start gap-5 px-10 pb-16 pt-12">
          {/* Section Header */}
          <div className="relative flex w-full shrink-0 content-stretch items-center gap-1">
            <div className="relative flex min-h-px min-w-px flex-1 shrink-0 flex-col content-stretch items-start justify-center gap-1 whitespace-pre-wrap font-semibold">
              <p className="relative shrink-0 text-sm leading-5 text-indigo-600">
                Exclusive Listings
              </p>
              <p className="relative shrink-0 text-2xl leading-8 text-neutral-700">
                Only on our platform.
              </p>
            </div>
            <Button
              variant="outline"
              className="h-9 rounded-lg border-neutral-200 bg-white px-4 py-2 shadow-sm"
              onClick={() => nav("/assets")}
            >
              <span className="text-sm font-medium text-neutral-700">
                View All
              </span>
            </Button>
          </div>

          {/* Exclusive Product Cards Grid */}
          <div className="relative flex w-full shrink-0 flex-wrap content-center items-center gap-6">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
