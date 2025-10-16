import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { OrganizationForm  } from "@/admin/pods/organization/components/OrganizationForm";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";

//interface OrganizationNewProps {}

export const OrganizationNew = observer(function OrganizationNew() {
  const [record, setRecord] = useState<OrganizationModel | null>(null);

  useEffect(() => {
    const rec = Store.organization.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Organization" />
      <OrganizationForm record={record} />;
    </>
  );
});
