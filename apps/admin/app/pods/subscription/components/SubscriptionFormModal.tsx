import { LayerService } from "@/common_lib/services/LayerService";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { SubscriptionForm } from "./SubscriptionForm";

export const SubscriptionFormModalId = "SubscriptionFormModal";

interface SubscriptionFormModalProps {
  record?: SubscriptionModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: SubscriptionModel) => void;
}

export const SubscriptionFormModal = observer(function SubscriptionFormModal(props: SubscriptionFormModalProps) {
  const [record, setRecord] = useState<SubscriptionModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.subscription.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(SubscriptionFormModalId);
    if (props.onSave) {
      props.onSave(record as SubscriptionModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(SubscriptionFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ SubscriptionFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Subscription`}
      showCancel={false}
      showSave={false}
    >
      <SubscriptionForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
