import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { BillingPlanForm  } from "@/admin/pods/billing_plan/components/BillingPlanForm";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";

//interface BillingPlanNewProps {}

export const BillingPlanNew = observer(function BillingPlanNew() {
  const [record, setRecord] = useState<BillingPlanModel | null>(null);

  useEffect(() => {
    const rec = Store.billing_plan.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New BillingPlan" />
      <BillingPlanForm record={record} />
    </>
  );
});
