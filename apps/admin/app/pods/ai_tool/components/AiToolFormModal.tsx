import { LayerService } from "@/common_lib/services/LayerService";
import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AiToolForm } from "./AiToolForm";

export const AiToolFormModalId = "AiToolFormModal";

interface AiToolFormModalProps {
  record?: AiToolModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: AiToolModel) => void;
}

export const AiToolFormModal = observer(function AiToolFormModal(props: AiToolFormModalProps) {
  const [record, setRecord] = useState<AiToolModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.ai_tool.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(AiToolFormModalId);
    if (props.onSave) {
      props.onSave(record as AiToolModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(AiToolFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ AiToolFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} AiTool`}
      showCancel={false}
      showSave={false}
    >
      <AiToolForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
