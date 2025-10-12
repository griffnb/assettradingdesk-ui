import { LayerService } from "@/common_lib/services/LayerService";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ManufacturerForm } from "./ManufacturerForm";

export const ManufacturerFormModalId = "ManufacturerFormModal";

interface ManufacturerFormModalProps {
  record?: ManufacturerModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: ManufacturerModel) => void;
}

export const ManufacturerFormModal = observer(function ManufacturerFormModal(props: ManufacturerFormModalProps) {
  const [record, setRecord] = useState<ManufacturerModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.manufacturer.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(ManufacturerFormModalId);
    if (props.onSave) {
      props.onSave(record as ManufacturerModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(ManufacturerFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ ManufacturerFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Manufacturer`}
      showCancel={false}
      showSave={false}
    >
      <ManufacturerForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
