import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { AssetDetails } from "@/ui/customer/assets/details";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default observer(() => {
  const params = useParams();

  const paramParts = params["*"]?.split("/") || [];

  const id = paramParts[paramParts.length - 1];

  const [asset, setAsset] = useState<AssetModel | null>(null);

  useEffect(() => {
    if (!id) return;
    Store.asset.get(id).then((resp) => {
      if (resp.success && resp.data) {
        setAsset(resp.data);
      }
    });
  }, [id]);

  if (!asset) {
    return <LoadingSkeleton />;
  }

  return <AssetDetails asset={asset} />;
});
