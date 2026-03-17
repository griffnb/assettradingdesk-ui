import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { AssetFileForm } from "@/admin/pods/asset_file/components/AssetFileForm";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface AssetFileEditProps {}

export const AssetFileEdit = observer(function AssetFileEdit() {
  const [record, setRecord] = useState<AssetFileModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.asset_file.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Asset Files", href: "/asset_files" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <AssetFileForm record={record} />;
    </>
  );
});
