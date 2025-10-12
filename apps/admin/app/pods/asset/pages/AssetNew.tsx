import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { AssetForm  } from "@/admin/pods/asset/components/AssetForm";
import { AssetModel } from "@/models/models/asset/model/AssetModel";

//interface AssetNewProps {}

export const AssetNew = observer(function AssetNew() {
  const [record, setRecord] = useState<AssetModel | null>(null);

  useEffect(() => {
    const rec = Store.asset.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Asset" />
      <AssetForm record={record} />;
    </>
  );
});
