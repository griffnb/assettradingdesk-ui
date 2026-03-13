import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { CompanyForm  } from "@/admin/pods/company/components/CompanyForm";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";

//interface CompanyNewProps {}

export const CompanyNew = observer(function CompanyNew() {
  const [record, setRecord] = useState<CompanyModel | null>(null);

  useEffect(() => {
    const rec = Store.company.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Companies", href: "/companies" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <CompanyForm record={record} />;
    </>
  );
});
