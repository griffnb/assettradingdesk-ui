import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AssetCreationForm } from "@/ui/customer/assets/management/AssetCreationForm";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const NewAsset = observer(function NewAsset() {
  const [asset] = useState<AssetModel>(()=>Store.asset.create({quantity:1}));
  return (
    <AssetCreationForm record={asset} />
  );
});
