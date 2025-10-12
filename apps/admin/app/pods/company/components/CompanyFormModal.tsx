import { LayerService } from "@/common_lib/services/LayerService";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { CompanyForm } from "./CompanyForm";

export const CompanyFormModalId = "CompanyFormModal";

interface CompanyFormModalProps {
  record?: CompanyModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: CompanyModel) => void;
}

export const CompanyFormModal = observer(function CompanyFormModal(props: CompanyFormModalProps) {
  const [record, setRecord] = useState<CompanyModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.company.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(CompanyFormModalId);
    if (props.onSave) {
      props.onSave(record as CompanyModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(CompanyFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ CompanyFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Company`}
      showCancel={false}
      showSave={false}
    >
      <CompanyForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
