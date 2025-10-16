import { LayerService } from "@/common_lib/services/LayerService";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AssetForm } from "./AssetForm";

export const AssetFormModalId = "AssetFormModal";

interface AssetFormModalProps {
  record?: AssetModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: AssetModel) => void;
}

export const AssetFormModal = observer(function AssetFormModal(props: AssetFormModalProps) {
  const [record, setRecord] = useState<AssetModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.asset.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(AssetFormModalId);
    if (props.onSave) {
      props.onSave(record as AssetModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(AssetFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ AssetFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Asset`}
      showCancel={false}
      showSave={false}
    >
      <AssetForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
