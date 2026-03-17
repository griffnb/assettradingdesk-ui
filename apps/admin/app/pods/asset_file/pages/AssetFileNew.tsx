import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { AssetFileForm  } from "@/admin/pods/asset_file/components/AssetFileForm";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";

//interface AssetFileNewProps {}

export const AssetFileNew = observer(function AssetFileNew() {
  const [record, setRecord] = useState<AssetFileModel | null>(null);

  useEffect(() => {
    const rec = Store.asset_file.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Asset Files", href: "/asset_files" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <AssetFileForm record={record} />;
    </>
  );
});
