import { LayerService } from "@/common_lib/services/LayerService";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AssetFileForm } from "./AssetFileForm";

export const AssetFileFormModalId = "AssetFileFormModal";

interface AssetFileFormModalProps {
  record?: AssetFileModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: AssetFileModel) => void;
}

export const AssetFileFormModal = observer(function AssetFileFormModal(props: AssetFileFormModalProps) {
  const [record, setRecord] = useState<AssetFileModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.asset_file.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(AssetFileFormModalId);
    if (props.onSave) {
      props.onSave(record as AssetFileModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(AssetFileFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ AssetFileFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} AssetFile`}
      showCancel={false}
      showSave={false}
    >
      <AssetFileForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
