import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Card, CardContent, CardFooter } from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react";

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface AssetCardProps {
  asset: AssetModel;
  className?: string;
}
export const AssetCard = observer(function AssetCard(
  fullProps: AssetCardProps,
) {
  const { className, asset, ...props } = fullProps;

  const primaryImage = asset.asset_files
    ? asset.asset_files[0]?.meta_data.medium_image
    : "";
  return (
    <Card className={cn("h-[360px] w-80 overflow-hidden", className)}>
      <CardContent className="h-full">
        <div className="h-52 w-full">
          <img
            alt={asset.label}
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="size-full rounded"
            src={primaryImage}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="justify-start self-stretch text-lg font-semibold leading-7 text-foreground">
              {asset.label}
            </div>
            <div className="justify-start self-stretch text-sm font-normal leading-tight text-muted-foreground">
              {asset.category_name}
            </div>
          </div>
          {asset.price > 0 && (
            <div className="justify-start self-stretch text-lg font-semibold leading-7 text-foreground">
              ${(asset.price / 100).toFixed(2)}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
});
