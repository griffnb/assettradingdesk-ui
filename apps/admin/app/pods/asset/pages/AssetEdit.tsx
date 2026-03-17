import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { AssetForm } from "@/admin/pods/asset/components/AssetForm";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Assets", href: "/assets" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <AssetForm record={record} />;
    </>
  );
});
