import { isObjectValid } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface AccountFormProps {
  record: AccountModel;
  onSuccess?: (record: AccountModel) => void;
  onCancel?: () => void;
}

export const AccountForm = observer(function AccountForm(
  props: AccountFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AccountModel>(props.record);
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
            nav("/accounts"); // default fallback
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
        nav("/accounts"); // default fallback
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
        <FormFieldText
          record={props.record}
          field="first_name"
          type="text"
          label="First Name"
          placeholder="First Name"
        />

        <FormFieldText
          record={props.record}
          field="last_name"
          type="text"
          label="Last Name"
          placeholder="Last Name"
        />

        <FormFieldText
          record={props.record}
          field="email"
          type="email"
          label="Email"
          placeholder="email@example.com"
        />

        <FormFieldText
          record={props.record}
          field="phone"
          type="tel"
          label="Phone"
          placeholder="Phone Number"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldSelect
          record={props.record}
          field="role"
          label="Role"
          options={constants.account.role}
        />

        <FormFieldSelect
          record={props.record}
          field="test_user_type"
          label="Test User Type"
          options={constants.account.test_user_type}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<AccountModel, OrganizationModel>
          record={props.record}
          field="organization_id"
          label="Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldModelSearchSelect<AccountModel, FacilityModel>
          record={props.record}
          field="facility_id"
          label="Facility"
          placeholder="Select Facility"
          modelName="facility"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<AccountModel, CompanyModel>
          record={props.record}
          field="company_id"
          label="Company"
          placeholder="Select Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="external_id"
          type="text"
          label="External ID"
          placeholder="External ID"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
