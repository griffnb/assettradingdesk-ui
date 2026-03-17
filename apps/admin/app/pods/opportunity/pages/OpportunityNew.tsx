import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { OpportunityForm  } from "@/admin/pods/opportunity/components/OpportunityForm";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";

//interface OpportunityNewProps {}

export const OpportunityNew = observer(function OpportunityNew() {
  const [record, setRecord] = useState<OpportunityModel | null>(null);

  useEffect(() => {
    const rec = Store.opportunity.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <OpportunityForm record={record} />;
    </>
  );
});
