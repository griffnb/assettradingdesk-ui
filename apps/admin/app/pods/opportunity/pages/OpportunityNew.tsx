import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { OpportunityForm  } from "@/admin/pods/opportunity/components/OpportunityForm";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";

//interface OpportunityNewProps {}

export const OpportunityNew = observer(function OpportunityNew() {
  const [record, setRecord] = useState<OpportunityModel | null>(null);

  useEffect(() => {
    const rec = Store.opportunity.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Opportunity" />
      <OpportunityForm record={record} />;
    </>
  );
});
