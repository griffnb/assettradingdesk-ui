import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldDate } from "@/ui/common/components/form/fields/FormFieldDate";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface AssetFormProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
}

export const AssetForm = observer(function AssetForm(props: AssetFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AssetModel>(props.record);
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
            nav("/assets"); // default fallback
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
        nav("/assets"); // default fallback
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
        <FormFieldModelSearchSelect<AssetModel, ModelModel>
          record={props.record}
          field="model_id"
          label="Model"
          placeholder="Select Model"
          modelName="model"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldText
          record={props.record}
          field="serial_number"
          type="text"
          label="Serial Number"
          placeholder="Serial Number"
        />

        <FormFieldText
          record={props.record}
          field="year"
          type="number"
          label="Year"
          placeholder="Year"
        />

        <FormFieldText
          record={props.record}
          field="quantity"
          type="number"
          label="Quantity"
          placeholder="Quantity"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="description"
          type="text"
          label="Description"
          placeholder="Description"
        />

        <FormFieldText
          record={props.record}
          field="location"
          type="text"
          label="Location"
          placeholder="Location"
        />

        <FormFieldText
          record={props.record}
          field="price"
          type="number"
          label="Price"
          placeholder="0.00"
        />

        <FormFieldDate
          record={props.record}
          field="verified_at_ts"
          label="Verified At"
          placeholder="Select Date"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldSelect
          record={props.record}
          field="install_status"
          label="Install Status"
          options={constants.asset.install_status}
        />

        <FormFieldSelect
          record={props.record}
          field="operational_status"
          label="Operational Status"
          options={constants.asset.operational_status}
        />

        <FormFieldSelect
          record={props.record}
          field="visibility"
          label="Visibility"
          options={constants.asset.visibility}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<AssetModel, OrganizationModel>
          record={props.record}
          field="organization_id"
          label="Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldModelSearchSelect<AssetModel, FacilityModel>
          record={props.record}
          field="facility_id"
          label="Facility"
          placeholder="Select Facility"
          modelName="facility"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<AssetModel, AccountModel>
          record={props.record}
          field="account_id"
          label="Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<AssetModel, CompanyModel>
          record={props.record}
          field="company_id"
          label="Company"
          placeholder="Select Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<AssetModel, ClientModel>
          record={props.record}
          field="client_id"
          label="Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="notes"
          label="Notes"
          placeholder="Additional notes..."
        />

        <FormFieldTextArea
          record={props.record}
          field="configuration_notes"
          label="Configuration Notes"
          placeholder="Configuration details..."
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldSelect
          record={props.record.meta_data}
          field="wafer_size"
          label="Wafer Size"
          options={constants.asset.wafer_size}
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
