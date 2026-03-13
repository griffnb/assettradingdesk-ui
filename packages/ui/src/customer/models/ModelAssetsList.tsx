import { ServerService } from "@/common_lib/services/ServerService";
import { cn } from "@/common_lib/utils/cn";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { AssetCard } from "@/ui/customer/assets/AssetCard";
import { Button } from "@/ui/shadcn/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export interface ModelAssetsListProps {
  model: ModelModel;
  className?: string;
  onAssetCountChange?: (count: number) => void;
}

export const ModelAssetsList = observer(function ModelAssetsList({
  model,
  className,
  onAssetCountChange,
}: ModelAssetsListProps) {
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    if (!model.id) {
      return;
    }

    setLoading(true);

    const offset = (page - 1) * pageSize;

    Promise.all([
      Store.asset.query({
        model_id: model.id,
        limit: pageSize.toString(),
        offset: offset.toString(),
        order: "created_at desc",
      }),
      ServerService.callGet("asset", "count", {
        model_id: model.id,
      }),
    ])
      .then(([assetsResp, countResp]) => {
        if (assetsResp.success && assetsResp.data) {
          setAssets(assetsResp.data);
        }
        if (countResp.success && countResp.data) {
          setResultCount(countResp.data);
          if (onAssetCountChange) {
            onAssetCountChange(countResp.data);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [model.id, page, onAssetCountChange]);

  const totalPages = Math.ceil(resultCount / pageSize);

  if (loading) {
    return (
      <div className={cn("flex w-full flex-col items-start gap-5", className)}>
        <p className="text-lg font-semibold text-gray-700">Loading assets...</p>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className={cn("flex w-full flex-col items-start gap-5", className)}>
        <p className="text-lg font-semibold text-gray-700">
          No assets available for this model
        </p>
        <p className="text-sm text-gray-600">
          Check back later or browse other models.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col items-start gap-5", className)}>
      <div className="flex w-full items-center justify-between">
        <p className="whitespace-pre-wrap text-lg font-semibold leading-7 text-gray-700">
          <span>
            Showing {assets.length} of {resultCount}{" "}
          </span>
          <span className="font-normal">
            available {resultCount === 1 ? "asset" : "assets"}
          </span>
        </p>
      </div>

      <div className="flex w-full flex-wrap items-start justify-start gap-5">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            className="min-w-[260px] max-w-80 flex-1"
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
});
