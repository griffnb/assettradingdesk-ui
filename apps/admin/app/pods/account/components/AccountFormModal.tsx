import { LayerService } from "@/common_lib/services/LayerService";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AccountForm } from "./AccountForm";

export const AccountFormModalId = "AccountFormModal";

interface AccountFormModalProps {
  record?: AccountModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: AccountModel) => void;
}

export const AccountFormModal = observer(function AccountFormModal(props: AccountFormModalProps) {
  const [record, setRecord] = useState<AccountModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.account.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(AccountFormModalId);
    if (props.onSave) {
      props.onSave(record as AccountModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(AccountFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ AccountFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Account`}
      showCancel={false}
      showSave={false}
    >
      <AccountForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
