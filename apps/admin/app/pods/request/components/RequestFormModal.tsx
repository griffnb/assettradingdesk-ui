import { LayerService } from "@/common_lib/services/LayerService";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { RequestForm } from "./RequestForm";

export const RequestFormModalId = "RequestFormModal";

interface RequestFormModalProps {
  record?: RequestModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: RequestModel) => void;
}

export const RequestFormModal = observer(function RequestFormModal(props: RequestFormModalProps) {
  const [record, setRecord] = useState<RequestModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.request.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(RequestFormModalId);
    if (props.onSave) {
      props.onSave(record as RequestModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(RequestFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ RequestFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Request`}
      showCancel={false}
      showSave={false}
    >
      <RequestForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
