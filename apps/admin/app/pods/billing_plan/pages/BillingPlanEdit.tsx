import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { BillingPlanForm } from "@/admin/pods/billing_plan/components/BillingPlanForm";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit BillingPlan" objectURN={record.urn} />
      <BillingPlanForm record={record} />
    </>
  );
});
