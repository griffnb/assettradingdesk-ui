import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { BillingPlanForm  } from "@/admin/pods/billing_plan/components/BillingPlanForm";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";

//interface BillingPlanNewProps {}

export const BillingPlanNew = observer(function BillingPlanNew() {
  const [record, setRecord] = useState<BillingPlanModel | null>(null);

  useEffect(() => {
    const rec = Store.billing_plan.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Billing Plans", href: "/billing_plans" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <BillingPlanForm record={record} />
    </>
  );
});
