import DetailFieldMultiSelect from "@/common_lib/components/form/details/DetailFieldMultiSelect";
import DetailFieldSelect from "@/common_lib/components/form/details/DetailFieldSelect";
import DetailFieldText from "@/common_lib/components/form/details/DetailFieldText";
import DetailFieldTextArea from "@/common_lib/components/form/details/DetailFieldTextArea";
import { constants } from "@/utils/constants";
import { observer } from "mobx-react";
import FacilityModel from "../../model/FacilityModel";

interface FacilityDetailsProps {
  facility: FacilityModel;
}
const FacilityDetails = observer((props: FacilityDetailsProps) => {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Company Info</h2>
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
          record={props.facility}
          field="wafer_sizes"
          displayField="wafer_sizesFmt"
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
          record={props.facility.address as any}
          field="state"
          options={constants.states}
        />
        <DetailFieldText
          label="City"
          parentRecord={props.facility}
          record={props.facility.address as any}
          field="city"
          type="text"
        />
        <DetailFieldText
          label="Zip"
          parentRecord={props.facility}
          record={props.facility.address as any}
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

export default FacilityDetails;
