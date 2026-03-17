import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { AssetCreationForm } from "@/ui/customer/assets/management/AssetCreationForm";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const EditAsset = observer(function EditAsset() {
  const { id } = useParams();
  const [asset, setAsset] = useState<AssetModel | null>(null);

  useEffect(() => {
    if (id) {
      Store.asset.get(id).then((resp) => {
        if (resp.success && resp.data) {
          setAsset(resp.data);
        }
      });
    }
  }, [id]);

  if (!asset) {
    return <LoadingSkeleton />;
  }

  return <AssetCreationForm record={asset} />;
});
