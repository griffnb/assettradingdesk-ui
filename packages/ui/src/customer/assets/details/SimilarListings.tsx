import { ServerService } from "@/common_lib/services/ServerService";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AssetCard } from "@/ui/customer/assets/AssetCard";
import { Button } from "@/ui/shadcn/ui/button";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface SimilarListingsProps {
  asset: AssetModel;
  className?: string;
}

export const SimilarListings = observer(function SimilarListings({
  asset,

  className,
}: SimilarListingsProps) {
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    if (!asset.model_id) {
      return;
    }
    Store.asset.query({ model_id: asset.model_id, limit: "4" }).then((resp) => {
      if (resp.success && resp.data) {
        setAssets(resp.data);
      }
    });
    ServerService.callGet("asset", "count", { model_id: asset.model_id }).then(
      (resp) => {
        if (resp.success && resp.data) {
          setResultCount(resp.data);
        }
      },
    );
  }, [asset]);

  return (
    <div className={cn("flex w-full flex-col items-start gap-5", className)}>
      {/* Header with results count and sort dropdown */}
      <div className="flex w-full items-center justify-between">
        <p className="whitespace-pre-wrap text-lg font-semibold leading-7 text-gray-700">
          <span>Showing 4 of {resultCount} similar </span>
          <span className="font-normal">results for {asset.model_name}</span>
        </p>
        <Button
          variant="outline"
          className="h-9 rounded-lg border-neutral-200 bg-white px-4 py-2 shadow-sm"
          onClick={() => nav("/assets?model_id=" + asset.model_id)}
        >
          <span className="text-sm font-medium text-neutral-700">View All</span>
        </Button>
      </div>

      {/* Asset cards grid */}
      <div className="flex w-full flex-wrap items-center justify-start gap-5">
        {assets.map((asset, index) => (
          <AssetCard
            key={asset.id || index}
            asset={asset}
            className="min-w-[260px] max-w-80 flex-1"
          />
        ))}
      </div>
    </div>
  );
});
