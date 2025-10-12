import { LayerService } from "@/common_lib/services/LayerService";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ClientForm } from "./ClientForm";

export const ClientFormModalId = "ClientFormModal";

interface ClientFormModalProps {
  record?: ClientModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: ClientModel) => void;
}

export const ClientFormModal = observer(function ClientFormModal(props: ClientFormModalProps) {
  const [record, setRecord] = useState<ClientModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.client.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(ClientFormModalId);
    if (props.onSave) {
      props.onSave(record as ClientModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(ClientFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ ClientFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Client`}
      showCancel={false}
      showSave={false}
    >
      <ClientForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
