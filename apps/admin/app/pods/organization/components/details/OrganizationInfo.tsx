import { SafeBaseModel } from "@/models/BaseModel";
import { constants } from "@/models/constants";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { OrganizationProperties } from "@/models/models/organization/model/OrganizationBaseModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldArray } from "@/ui/common/components/form/details/DetailFieldArray";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { observer } from "mobx-react-lite";

interface OrganizationInfoProps {
  organization: OrganizationModel;
}

export const OrganizationInfo = observer(function OrganizationInfo(
  props: OrganizationInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold">Organization Info</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        <DetailFieldText
          record={props.organization}
          field="name"
          type="text"
          label="Name"
          placeholder="Name"
        />
        <DetailFieldSelect
          label="Organization Type"
          record={props.organization}
          field="organization_type"
          displayField="organization_typeStr"
          options={constants.organization.organization_type}
        />
        <DetailFieldText
          record={props.organization}
          field="subdomain"
          type="text"
          label="Subdomain"
          placeholder="Subdomain"
        />
        <DetailFieldModelSearchSelect<OrganizationModel, BillingPlanModel>
          record={props.organization}
          displayField="billing_plan_name"
          field="billing_plan_id"
          label="Billing Plan"
          placeholder="Billing Plan"
          modelName="billing_plan"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          reloadOnSave={true}
        />
        <DetailFieldText
          record={
            props.organization.properties as SafeBaseModel<OrganizationProperties>
          }
          parentRecord={props.organization}
          field="billing_email"
          type="email"
          label="Billing Email"
          placeholder="Billing Email"
        />
        <DetailFieldText
          record={props.organization}
          field="stripe_id"
          type="text"
          label="Stripe ID"
          placeholder="Stripe ID"
        />
        <DetailFieldText
          record={props.organization}
          field="external_id"
          type="text"
          label="External ID"
          placeholder="External ID"
        />
        <DetailFieldModelSearchSelect<OrganizationModel, CompanyModel>
          record={props.organization}
          displayField="end_user_company_name"
          field="end_user_company_id"
          label="End User Company"
          placeholder="End User Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          reloadOnSave={true}
        />
        <DetailFieldArray
          record={props.organization}
          field="email_domains"
          label="Email Domains"
          placeholder="Add Email Domain"
        />
      </div>
    </div>
  );
});
