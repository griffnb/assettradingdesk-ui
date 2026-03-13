import { isObjectValid } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldDate } from "@/ui/common/components/form/fields/FormFieldDate";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldMultiSelect } from "@/ui/common/components/form/fields/FormFieldMultiSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface RequestFormProps {
  record: RequestModel;
  onSuccess?: (record: RequestModel) => void;
  onCancel?: () => void;
}

export const RequestForm = observer(function RequestForm(
  props: RequestFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<RequestModel>(props.record);
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
            nav("/requests"); // default fallback
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
        nav("/requests"); // default fallback
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
        <FormFieldModelSearchSelect<RequestModel, ModelModel>
          record={props.record}
          field="model_id"
          label="Model"
          placeholder="Select Model"
          modelName="model"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<RequestModel, ManufacturerModel>
          record={props.record}
          field="manufacturer_id"
          label="Manufacturer"
          placeholder="Select Manufacturer"
          modelName="manufacturer"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<RequestModel, CategoryModel>
          record={props.record}
          field="category_id"
          label="Category"
          placeholder="Select Category"
          modelName="category"
          modelSearchParam="q"
          modelDisplayField="label"
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

        <FormFieldTextArea
          record={props.record}
          field="configuration_notes"
          label="Configuration Notes"
          placeholder="Configuration details..."
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="min_price"
          type="number"
          label="Min Price"
          placeholder="0.00"
        />

        <FormFieldText
          record={props.record}
          field="max_price"
          type="number"
          label="Max Price"
          placeholder="0.00"
        />

        <FormFieldText
          record={props.record}
          field="time_frame"
          type="number"
          label="Time Frame (days)"
          placeholder="0"
        />

        <FormFieldDate
          record={props.record}
          field="expire_at_ts"
          label="Expire At"
          placeholder="Select Date"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record.meta_data}
          field="min_year"
          type="number"
          label="Min Year"
          placeholder="0"
        />

        <FormFieldText
          record={props.record.meta_data}
          field="max_year"
          type="number"
          label="Max Year"
          placeholder="0"
        />

        <FormFieldMultiSelect
          record={props.record.meta_data}
          field="install_statuses"
          label="Install Statuses"
          options={constants.asset.install_status}
        />

        <FormFieldMultiSelect
          record={props.record.meta_data}
          field="operational_statuses"
          label="Operational Statuses"
          options={constants.asset.operational_status}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<RequestModel, OrganizationModel>
          record={props.record}
          field="organization_id"
          label="Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldModelSearchSelect<RequestModel, CompanyModel>
          record={props.record}
          field="company_id"
          label="Company"
          placeholder="Select Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<RequestModel, ClientModel>
          record={props.record}
          field="client_id"
          label="Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<RequestModel, AccountModel>
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
        <FormFieldModelSearchSelect<RequestModel, RequestModel>
          record={props.record}
          field="source_request_id"
          label="Source Request"
          placeholder="Select Source Request"
          modelName="request"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
