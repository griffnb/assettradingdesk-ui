import { LayerService } from "@/common_lib/services/LayerService";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { Store } from "@/models/store/Store";
import { FormModal } from "@/ui/common/components/modal/FormModal";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FacilityForm } from "./FacilityForm";

export const FacilityFormModalId = "FacilityFormModal";

interface FacilityFormModalProps {
  record?: FacilityModel;
  newProperties?: { [key: string]: any };
  onSave?: (record: FacilityModel) => void;
}

export const FacilityFormModal = observer(function FacilityFormModal(props: FacilityFormModalProps) {
  const [record, setRecord] = useState<FacilityModel | undefined>(props.record);
  useEffect(() => {
    if (!props.record) {
      const record = Store.facility.create(props.newProperties);
      setRecord(record);
    }
  }, [props.record]);

  const onSuccess = () => {
    LayerService.remove(FacilityFormModalId);
    if (props.onSave) {
      props.onSave(record as FacilityModel);
    }
  };

  const onCancel = () => {
    LayerService.remove(FacilityFormModalId);
  };

  if (!record) return null;

  return (
    <FormModal
      id={ FacilityFormModalId }
      title={`${record.id && record.id != "" ? "Edit" : "New"} Facility`}
      showCancel={false}
      showSave={false}
    >
      <FacilityForm record={record} onSuccess={onSuccess} onCancel={onCancel} />
    </FormModal>
  );
});
