import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { CompanyForm  } from "@/admin/pods/company/components/CompanyForm";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";

//interface CompanyNewProps {}

export const CompanyNew = observer(function CompanyNew() {
  const [record, setRecord] = useState<CompanyModel | null>(null);

  useEffect(() => {
    const rec = Store.company.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Company" />
      <CompanyForm record={record} />;
    </>
  );
});
