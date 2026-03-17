import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { OrganizationInfo } from "../components/details/OrganizationInfo";

export const OrganizationDetails = observer(function OrganizationDetails() {
  const [record, setRecord] = useState<OrganizationModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.organization.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Organizations", href: "/organizations" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <OrganizationInfo organization={record} />
    </>
  );
});
