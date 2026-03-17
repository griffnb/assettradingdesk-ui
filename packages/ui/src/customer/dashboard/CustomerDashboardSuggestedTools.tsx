import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AssetCard } from "@/ui/customer/assets/AssetCard";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/ui/carousel";
import { ArrowUpRightIcon, BadgeCheckIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";

export interface CustomerDashboardSuggestedToolsProps
  extends HTMLAttributes<HTMLDivElement> {}

export const CustomerDashboardSuggestedTools = observer(
  function CustomerDashboardSuggestedTools() {
    const [assets, setAssests] = useState<AssetModel[]>([]);

    useEffect(() => {
      async function fetchAssets() {
        const response = await Store.asset.queryRecords(
          `matches/all`,
          {
            limit: "10",
          },
          { skipCache: true },
        );
        if (response.success && response.data) {
          setAssests(response.data);
        }
      }
      fetchAssets();
    }, []);

    return (
      <div className="flex flex-col gap-4 self-stretch">
        <div className="flex items-start justify-between p-0">
          <div className="flex items-center gap-2">
            <BadgeCheckIcon className="size-8" />
            <h2 className="text-2xl font-semibold leading-8 text-foreground">
              Suggested Tools
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {}}
          >
            <span>View All</span>
            <ArrowUpRightIcon className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center px-10">
          <Carousel className="flex w-full" opts={{ align: "start" }}>
            <CarouselContent className="last:mr-3">
              {assets.map((asset, index) => (
                <CarouselItem className="min-w-fit max-w-fit" key={index}>
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    size="skinny"
                    variant={"full"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {assets.length > 3 && (
              <>
                <CarouselPrevious className="bg-primary text-white hover:bg-primary/80" />
                <CarouselNext className="bg-primary text-white hover:bg-primary/80" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    );
  },
);
