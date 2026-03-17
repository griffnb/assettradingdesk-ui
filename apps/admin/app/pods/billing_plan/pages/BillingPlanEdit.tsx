import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { BillingPlanForm } from "@/admin/pods/billing_plan/components/BillingPlanForm";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface BillingPlanEditProps {}

export const BillingPlanEdit = observer(function BillingPlanEdit() {
  const [record, setRecord] = useState<BillingPlanModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.billing_plan.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Billing Plans", href: "/billing_plans" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <BillingPlanForm record={record} />
    </>
  );
});
