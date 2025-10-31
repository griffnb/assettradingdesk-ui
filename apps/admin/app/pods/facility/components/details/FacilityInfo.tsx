import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import {
  FacilityAddress,
  FacilityMetaData,
} from "@/models/models/facility/model/FacilityBaseModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { DetailFieldMultiSelect } from "@/ui/common/components/form/details/DetailFieldMultiSelect";
import DetailFieldSelect from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface FacilityDetailsProps {
  facility: FacilityModel;
}
export const FacilityInfo = observer(function FacilityInfo(
  props: FacilityDetailsProps,
) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Facility Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldText
          record={props.facility}
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <DetailFieldMultiSelect
          label="Wafer Sizes"
          record={props.facility.meta_data as SafeBaseModel<FacilityMetaData>}
          parentRecord={props.facility}
          field="wafer_sizes"
          displayField="wafer_sizes"
          options={constants.asset.wafer_size}
        />

        <DetailFieldSelect
          label="Country"
          record={props.facility}
          field="country"
          options={constants.countries}
        />
        <DetailFieldSelect
          label="State"
          parentRecord={props.facility}
          record={props.facility.address as SafeBaseModel<FacilityAddress>}
          field="state"
          options={constants.states}
        />
        <DetailFieldText
          label="City"
          parentRecord={props.facility}
          record={props.facility.address as SafeBaseModel<FacilityAddress>}
          field="city"
          type="text"
        />
        <DetailFieldText
          label="Zip"
          parentRecord={props.facility}
          record={props.facility.address as SafeBaseModel<FacilityAddress>}
          field="zip"
          type="text"
        />

        <DetailFieldText
          record={props.facility}
          field="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
        />
        <DetailFieldTextArea
          record={props.facility}
          field="description"
          label="Description"
          placeholder="Description"
        />
      </div>
    </div>
  );
});
