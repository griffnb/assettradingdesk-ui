import { LayerService } from "@/common_lib/services/LayerService";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { OpportunityForm } from "./OpportunityForm";

export const OpportunityFormModalId = "OpportunityFormModal";

interface OpportunityFormModalProps {
  record?: OpportunityModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: OpportunityModel) => void;
}

export const OpportunityFormModal = observer(function OpportunityFormModal(props: OpportunityFormModalProps) {
  const [record, setRecord] = useState<OpportunityModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.opportunity.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(OpportunityFormModalId);
    if (props.onSave) {
      props.onSave(record as OpportunityModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(OpportunityFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ OpportunityFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Opportunity`}
      showCancel={false}
      showSave={false}
    >
      <OpportunityForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
