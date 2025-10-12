import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { OrganizationForm } from "@/admin/pods/organization/components/OrganizationForm";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Organization" objectURN={record.urn} />
      <OrganizationForm record={record} />;
    </>
  );
});
