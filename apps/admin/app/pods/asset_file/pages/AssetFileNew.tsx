import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { AssetFileForm  } from "@/admin/pods/asset_file/components/AssetFileForm";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";

//interface AssetFileNewProps {}

export const AssetFileNew = observer(function AssetFileNew() {
  const [record, setRecord] = useState<AssetFileModel | null>(null);

  useEffect(() => {
    const rec = Store.asset_file.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New AssetFile" />
      <AssetFileForm record={record} />;
    </>
  );
});
