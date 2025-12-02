import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Button } from "@/ui/shadcn/ui/button";
import { cn } from "@/utils/cn";
import { Heart, Share2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";

export interface ProductInfoProps {
  asset: AssetModel;
  isAuthenticated: boolean;
  onShare?: () => void;
  onFavorite?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

export const ProductInfo = observer(function ProductInfo({
  asset,
  isAuthenticated,
  onShare,
  onFavorite,
  onPrimaryAction,
  onSecondaryAction,
  className,
}: ProductInfoProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {/* Header with title, category, badges, and action buttons */}
      <div className="flex w-full items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <p className="w-full min-w-full whitespace-pre-wrap text-sm font-semibold leading-5 text-gray-500">
            {asset.category_name}
          </p>
          <p className="w-full min-w-full whitespace-pre-wrap text-[30px] font-bold leading-9 text-gray-700">
            {asset.model_name}
          </p>
          <div className="flex items-start gap-2">
            {/*
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "secondary"}
              >
                {badge}
              </Badge>
            ))}*/}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="size-8"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavorite}
            className="size-8"
          >
            <Heart className="size-4" />
          </Button>
        </div>
      </div>

      {/* Price, description, and specs */}
      <div className="flex flex-col items-start gap-4">
        <p className="w-full whitespace-pre-wrap text-2xl font-bold leading-9 text-gray-700">
          {asset.price && asset.price > 0
            ? formatPrice(asset.price)
            : "Contact for Price"}
        </p>

        <p className="w-full whitespace-pre-wrap text-lg font-medium leading-7 text-gray-500">
          {asset.model_description}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <div className="grid w-full grid-cols-[200px,_1fr] gap-2">
          <span>Year:</span>
          <span className="font-semibold">{asset.year || "N/A"}</span>
          <hr className="col-span-2" />
          <span>Operational Status:</span>{" "}
          <span className="font-semibold">{asset.operationalStatus.label}</span>
          <hr className="col-span-2" />
          <span>Install Status:</span>
          <span className="font-semibold">{asset.installStatus.label}</span>
          <hr className="col-span-2" />
          <span>Location:</span> <span className="font-semibold">{"N/A"}</span>
        </div>
      </div>

      {/* Action buttons */}
      <ProductActions
        asset={asset}
        isAuthenticated={isAuthenticated}
        onPrimaryAction={onPrimaryAction}
        onSecondaryAction={onSecondaryAction}
      />
      <ProductSpecs asset={asset} />
    </div>
  );
});
