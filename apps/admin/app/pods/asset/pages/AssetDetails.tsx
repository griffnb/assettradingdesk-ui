import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AssetInfo } from "../details/AssetInfo";

//interface AssetDetailProps {}

export const AssetDetails = observer(function AssetDetails() {
  const [record, setRecord] = useState<AssetModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.asset.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Asset" />
      <AssetMatches asset={asset} />
      <AssetInfo asset={asset} />
      <AssetGallery asset={asset} />
      <AssetFileTable asset={asset} />
      <AssetUpload asset={asset} />
    </>
  );
});
