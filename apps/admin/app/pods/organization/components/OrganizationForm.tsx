import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { OrganizationProperties } from "@/models/models/organization/model/OrganizationBaseModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldArray } from "@/ui/common/components/form/fields/FormFieldArray";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface OrganizationFormProps {
  record: OrganizationModel;
  onSuccess?: (record: OrganizationModel) => void;
  onCancel?: () => void;
}

export const OrganizationForm = observer(function OrganizationForm(
  props: OrganizationFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<OrganizationModel>(props.record);
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
            nav("/organizations"); // default fallback
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
        nav("/organizations"); // default fallback
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
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <FormFieldSelect
          record={props.record}
          field="organization_type"
          label="Organization Type"
          options={constants.organization.organization_type}
        />
        <FormFieldText
          record={props.record}
          field="subdomain"
          type="text"
          label="Subdomain"
          placeholder="Subdomain"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<OrganizationModel, BillingPlanModel>
          record={props.record}
          field="billing_plan_id"
          label="Billing Plan"
          placeholder="Billing Plan"
          modelName="billing_plan"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />
        <FormFieldText
          record={props.record.properties as SafeBaseModel<OrganizationProperties>}
          field="billing_email"
          type="email"
          label="Billing Email"
          placeholder="Billing Email"
        />
        <FormFieldText
          record={props.record}
          field="stripe_id"
          type="text"
          label="Stripe ID"
          placeholder="Stripe ID"
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
        <FormFieldModelSearchSelect<OrganizationModel, CompanyModel>
          record={props.record}
          field="end_user_company_id"
          label="End User Company"
          placeholder="End User Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldArray
          record={props.record}
          field="email_domains"
          label="Email Domains"
          placeholder="Add Email Domain"
          valueType="text"
          valuePlaceholder="Email Domain"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
