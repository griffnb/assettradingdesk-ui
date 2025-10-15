import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface ProductSpecsProps {
  asset: AssetModel;
  className?: string;
}

export const ProductSpecs = observer(function ProductSpecs({
  asset,
  className,
}: ProductSpecsProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {asset.description}
    </div>
  );
});
