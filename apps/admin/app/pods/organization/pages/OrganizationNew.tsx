import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { OrganizationForm  } from "@/admin/pods/organization/components/OrganizationForm";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";

//interface OrganizationNewProps {}

export const OrganizationNew = observer(function OrganizationNew() {
  const [record, setRecord] = useState<OrganizationModel | null>(null);

  useEffect(() => {
    const rec = Store.organization.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Organizations", href: "/organizations" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <OrganizationForm record={record} />;
    </>
  );
});
