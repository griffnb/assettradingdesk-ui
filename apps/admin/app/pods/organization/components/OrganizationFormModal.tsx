import { LayerService } from "@/common_lib/services/LayerService";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { OrganizationForm } from "./OrganizationForm";

export const OrganizationFormModalId = "OrganizationFormModal";

interface OrganizationFormModalProps {
  record?: OrganizationModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: OrganizationModel) => void;
}

export const OrganizationFormModal = observer(function OrganizationFormModal(props: OrganizationFormModalProps) {
  const [record, setRecord] = useState<OrganizationModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.organization.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(OrganizationFormModalId);
    if (props.onSave) {
      props.onSave(record as OrganizationModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(OrganizationFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ OrganizationFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Organization`}
      showCancel={false}
      showSave={false}
    >
      <OrganizationForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
