import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { AssetForm } from "@/admin/pods/asset/components/AssetForm";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface AssetEditProps {}

export const AssetEdit = observer(function AssetEdit() {
  const [record, setRecord] = useState<AssetModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.asset.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Asset" objectURN={record.urn} />
      <AssetForm record={record} />;
    </>
  );
});
