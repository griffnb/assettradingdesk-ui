import { LayerService } from "@/common_lib/services/LayerService";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BillingPlanForm } from "./BillingPlanForm";

export const BillingPlanFormModalId = "BillingPlanFormModal";

interface BillingPlanFormModalProps {
  record?: BillingPlanModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: BillingPlanModel) => void;
}

export const BillingPlanFormModal = observer(function BillingPlanFormModal(props: BillingPlanFormModalProps) {
  const [record, setRecord] = useState<BillingPlanModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.billing_plan.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(BillingPlanFormModalId);
    if (props.onSave) {
      props.onSave(record as BillingPlanModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(BillingPlanFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ BillingPlanFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} BillingPlan`}
      showCancel={false}
      showSave={false}
    >
      <BillingPlanForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
