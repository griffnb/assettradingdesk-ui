import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { StandardContentWrap } from "@/ui/admin/layout/StandardContentWrap";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AssetFileTable } from "../details/AssetFileTable";
import { AssetGallery } from "../details/AssetGallery";
import { AssetInfo } from "../details/AssetInfo";
import { AssetMatches } from "../details/AssetMatches";
import { AssetOpportunities } from "../details/AssetOpportunities";
import { AssetUpload } from "../details/AssetUpload";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Assets", href: "/assets" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <StandardContentWrap>
        <AssetInfo asset={record} />
        <AssetOpportunities asset={record} />
        <AssetMatches asset={record} />
        <AssetGallery asset={record} />
        <AssetFileTable asset={record} />
        <AssetUpload asset={record} />
      </StandardContentWrap>
    </>
  );
});
