import { constants as assetConstants } from "@/models/models/asset/constants";
import { constants as companyConstants } from "@/models/models/company/constants";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldMultiSelect } from "@/ui/common/components/form/fields/FormFieldMultiSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface CompanyFormProps {
  record: CompanyModel;
  onSuccess?: (record: CompanyModel) => void;
  onCancel?: () => void;
}

export const CompanyForm = observer(function CompanyForm(
  props: CompanyFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<CompanyModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success) {
        if (props.onSuccess) {
          props.onSuccess(props.record);
        } else {
          if (window.history.length > 1) {
            nav(-1);
          } else {
            nav("/companies"); // default fallback
          }
        }
      }
    });
  };

  const cancelAction = () => {
    props.record.rollback();
    if (props.onCancel) {
      props.onCancel();
    } else {
      if (window.history.length > 1) {
        nav(-1);
      } else {
        nav("/companies"); // default fallback
      }
    }
  };

  return (
    <FormWrap
      saveAction={saveAction}
      saveLabel="Save"
      showCancel={true}
      cancelLabel="Cancel"
      cancelAction={cancelAction}
    >
      <DetailFieldContainer>
        <FormFieldModelSearchSelect<CompanyModel, OrganizationModel>
          record={props.record}
          field="organization_id"
          label="Organization"
          placeholder="Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />
        <FormFieldText
          record={props.record}
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <FormFieldText
          record={props.record}
          field="country"
          type="text"
          label="Country"
          placeholder="Country"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
        />
        <FormFieldText
          record={props.record}
          field="email"
          type="text"
          label="Email"
          placeholder="Email"
        />
        <FormFieldText
          record={props.record}
          field="website"
          type="text"
          label="Website"
          placeholder="Website"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record.address}
          field="raw_address"
          label="Street Address"
          placeholder="Street Address"
        />
        <FormFieldText
          record={props.record.address}
          field="city"
          type="text"
          label="City"
          placeholder="City"
        />
        <FormFieldText
          record={props.record.address}
          field="state"
          type="text"
          label="State"
          placeholder="State"
        />
        <FormFieldText
          record={props.record.address}
          field="zip"
          type="text"
          label="Zip"
          placeholder="Zip"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldMultiSelect
          record={props.record.meta_data}
          field="company_types"
          label="Company Types"
          placeholder="Company Types"
          options={companyConstants.company_type}
        />
        <FormFieldMultiSelect
          record={props.record.meta_data}
          field="wafer_sizes"
          label="Wafer Sizes"
          placeholder="Wafer Sizes"
          options={assetConstants.wafer_size}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="description"
          label="Description"
          placeholder="Description"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
