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
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";

export interface CustomerDashboardSuggestedToolsProps
  extends HTMLAttributes<HTMLDivElement> {}

export const CustomerDashboardSuggestedTools = observer(
  function CustomerDashboardSuggestedTools() {
    const [assets, setAssests] = useState<AssetModel[]>([]);

    useEffect(() => {
      Store.asset.query({ limit: "20" }).then((resp) => {
        if (resp.success && resp.data) {
          setAssests(resp.data);
        }
      });
    }, []);

    return (
      <div className="flex flex-col gap-4 self-stretch">
        <div className="flex items-start justify-between p-0">
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-8" />
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
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center px-10">
          <Carousel className="flex w-full">
            <CarouselContent>
              {assets.map((asset, index) => (
                <CarouselItem
                  className="@[30rem]:basis-1/2 @[44rem]:basis-1/3 @[59rem]:basis-1/4 @[71rem]:basis-1/5 basis-full"
                  key={index}
                >
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
