import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import {
  CompanyAddress,
  CompanyMetaData,
} from "@/models/models/company/model/CompanyBaseModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { DetailFieldMultiSelect } from "@/ui/common/components/form/details/DetailFieldMultiSelect";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { observer } from "mobx-react-lite";

interface CompanyInfoProps {
  company: CompanyModel;
}
export const CompanyInfo = observer(function CompanyInfo(
  props: CompanyInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Company Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldText
          record={props.company}
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <DetailFieldMultiSelect
          label="Types"
          record={props.company.meta_data as SafeBaseModel<CompanyMetaData>}
          parentRecord={props.company}
          field="company_types"
          displayField="company_types"
          options={constants.company.company_type}
        />
        <DetailFieldMultiSelect
          label="Wafer Sizes"
          record={props.company.meta_data as SafeBaseModel<CompanyMetaData>}
          parentRecord={props.company}
          field="wafer_sizes"
          displayField="wafer_sizes"
          options={constants.asset.wafer_size}
        />
        <DetailFieldSelect
          label="Country"
          record={props.company}
          field="country"
          options={constants.countries}
        />
        <DetailFieldSelect
          label="State"
          parentRecord={props.company}
          record={props.company.address as SafeBaseModel<CompanyAddress>}
          field="state"
          options={constants.states}
        />
        <DetailFieldText
          label="City"
          parentRecord={props.company}
          record={props.company.address as SafeBaseModel<CompanyAddress>}
          field="city"
          type="text"
        />
        <DetailFieldText
          label="Zip"
          parentRecord={props.company}
          record={props.company.address as SafeBaseModel<CompanyAddress>}
          field="zip"
          type="text"
        />

        <DetailFieldText
          record={props.company}
          field="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
        />
        <DetailFieldText
          record={props.company}
          field="email"
          type="email"
          label="Email"
          placeholder="Email"
          link={`mailto:${props.company.email}`}
        />
        <DetailFieldText
          record={props.company}
          field="website"
          type="url"
          label="Website"
          placeholder="Website"
          link={props.company.website}
        />

        <DetailFieldTextArea
          record={props.company}
          field="description"
          label="Description"
          placeholder="Description"
        />
      </div>
    </div>
  );
});
