import { LayerService } from "@/common_lib/services/LayerService";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";

export const MessageFormModalId = "MessageFormModal";

interface MessageFormModalProps {
  record?: MessageModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: MessageModel) => void;
}

export const MessageFormModal = observer(function MessageFormModal(props: MessageFormModalProps) {
  const [record, setRecord] = useState<MessageModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.message.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(MessageFormModalId);
    if (props.onSave) {
      props.onSave(record as MessageModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(MessageFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ MessageFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Message`}
      showCancel={false}
      showSave={false}
    >
      <MessageForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
