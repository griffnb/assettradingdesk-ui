import { LayerService } from "@/common_lib/services/LayerService";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ModelForm } from "./ModelForm";

export const ModelFormModalId = "ModelFormModal";

interface ModelFormModalProps {
  record?: ModelModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: ModelModel) => void;
}

export const ModelFormModal = observer(function ModelFormModal(props: ModelFormModalProps) {
  const [record, setRecord] = useState<ModelModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.model.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(ModelFormModalId);
    if (props.onSave) {
      props.onSave(record as ModelModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(ModelFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ ModelFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Model`}
      showCancel={false}
      showSave={false}
    >
      <ModelForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
