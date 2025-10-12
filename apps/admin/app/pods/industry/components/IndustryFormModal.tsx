import { LayerService } from "@/common_lib/services/LayerService";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { IndustryForm } from "./IndustryForm";

export const IndustryFormModalId = "IndustryFormModal";

interface IndustryFormModalProps {
  record?: IndustryModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: IndustryModel) => void;
}

export const IndustryFormModal = observer(function IndustryFormModal(props: IndustryFormModalProps) {
  const [record, setRecord] = useState<IndustryModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.industry.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(IndustryFormModalId);
    if (props.onSave) {
      props.onSave(record as IndustryModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(IndustryFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ IndustryFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Industry`}
      showCancel={false}
      showSave={false}
    >
      <IndustryForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
