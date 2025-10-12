import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { CompanyForm } from "@/admin/pods/company/components/CompanyForm";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface CompanyEditProps {}

export const CompanyEdit = observer(function CompanyEdit() {
  const [record, setRecord] = useState<CompanyModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.company.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Company" objectURN={record.urn} />
      <CompanyForm record={record} />;
    </>
  );
});
