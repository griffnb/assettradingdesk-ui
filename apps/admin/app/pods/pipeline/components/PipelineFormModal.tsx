import { LayerService } from "@/common_lib/services/LayerService";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PipelineForm } from "./PipelineForm";

export const PipelineFormModalId = "PipelineFormModal";

interface PipelineFormModalProps {
  record?: PipelineModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: PipelineModel) => void;
}

export const PipelineFormModal = observer(function PipelineFormModal(props: PipelineFormModalProps) {
  const [record, setRecord] = useState<PipelineModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.pipeline.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(PipelineFormModalId);
    if (props.onSave) {
      props.onSave(record as PipelineModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(PipelineFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ PipelineFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Pipeline`}
      showCancel={false}
      showSave={false}
    >
      <PipelineForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
