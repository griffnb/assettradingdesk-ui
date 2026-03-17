import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { OrganizationForm } from "@/admin/pods/organization/components/OrganizationForm";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface OrganizationEditProps {}

export const OrganizationEdit = observer(function OrganizationEdit() {
  const [record, setRecord] = useState<OrganizationModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.organization.get(id as string).then(
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
      { label: "Organizations", href: "/organizations" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <OrganizationForm record={record} />;
    </>
  );
});
