import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/ui/carousel";
import { Spinner } from "@/ui/shadcn/ui/spinner";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes, useEffect, useState } from "react";
import { AssetCard } from "../assets/AssetCard";

const styleVariants = cva("flex flex-col gap-4 self-stretch", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SuggestedAssetsCarouselProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  request: RequestModel;
}

export const SuggestedAssetsCarousel = observer(
  function SuggestedAssetsCarousel(rawProps: SuggestedAssetsCarouselProps) {
    const { className, variant, request, ...props } = rawProps;
    const [assets, setAssets] = useState<AssetModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
      const loadSuggested = async () => {
        setIsLoading(true);

        const response = await Store.asset.queryRecords(
          `matches/${request.id}`,
          {
            limit: "10",
          },
          { skipCache: true },
        );

        if (response.success && response.data) {
          setAssets(response.data);
        }

        setIsLoading(false);
      };

      loadSuggested();
    }, [request.id]);

    if (isLoading) {
      return (
        <div
          className={cn(
            "flex h-48 w-full items-center justify-center rounded-lg border border-dashed border-muted",
            className,
          )}
          {...props}
        >
          <Spinner className="size-6 text-primary" />
        </div>
      );
    }

    if (assets.length === 0) {
      return (
        <div
          className={cn(
            "flex h-48 flex-col items-center justify-center rounded-lg border border-muted/40 bg-muted/10 text-sm text-muted-foreground",
            className,
          )}
          {...props}
        >
          No matching assets yet. Check back soon.
        </div>
      );
    }

    return (
      <section
        key={request.id}
        className="flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        aria-labelledby={`request-${request.id}`}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Request
            </p>
            <h3
              id={`request-${request.id}`}
              className="text-xl font-semibold text-foreground"
            >
              {request.label}
            </h3>
            {request.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {request.description}
              </p>
            )}
          </div>

          <Badge variant="outline" className="w-fit gap-2">
            somebadge here
          </Badge>
        </div>
        <div className={cn(styleVariants({ variant, className }))} {...props}>
          <Carousel className="w-full">
            <CarouselContent>
              {assets.map((asset) => (
                <CarouselItem
                  key={asset.id}
                  className="basis-full md:basis-1/3 lg:basis-1/4"
                >
                  <AssetCard asset={asset} variant="full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            {assets.length > 3 && (
              <>
                <CarouselPrevious className="-left-9 bg-primary text-white hover:bg-primary/80" />
                <CarouselNext className="-right-9 bg-primary text-white hover:bg-primary/80" />
              </>
            )}
          </Carousel>
        </div>
      </section>
    );
  },
);
