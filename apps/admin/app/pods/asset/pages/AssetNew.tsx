import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { AssetForm  } from "@/admin/pods/asset/components/AssetForm";
import { AssetModel } from "@/models/models/asset/model/AssetModel";

//interface AssetNewProps {}

export const AssetNew = observer(function AssetNew() {
  const [record, setRecord] = useState<AssetModel | null>(null);

  useEffect(() => {
    const rec = Store.asset.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Assets", href: "/assets" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <AssetForm record={record} />;
    </>
  );
});
