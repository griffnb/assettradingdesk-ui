import { constants } from "@/models/constants";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldDate } from "@/ui/common/components/form/details/DetailFieldDate";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldSelect } from "@/ui/common/components/form/details/DetailFieldSelect";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { observer } from "mobx-react-lite";

interface AccountInfoProps {
  account: AccountModel;
}

export const AccountInfo = observer(function AccountInfo(
  props: AccountInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Account Information</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.account}
          field="first_name"
          type="text"
          label="First Name"
          placeholder="First Name"
        />
        <DetailFieldText
          record={props.account}
          field="last_name"
          type="text"
          label="Last Name"
          placeholder="Last Name"
        />
      </DetailFieldContainer>
      <DetailFieldContainer>
        <DetailFieldText
          record={props.account}
          field="email"
          type="email"
          label="Email"
          placeholder="Email"
        />

        <DetailFieldText
          record={props.account}
          field="phone"
          type="text"
          label="Phone"
          placeholder="Phone"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<AccountModel, OrganizationModel>
          record={props.account}
          field="organization_id"
          displayField="organization_name"
          label="Organization"
          placeholder="Organization"
          modelName="organization"
          modelSearchParam="name"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          link={
            props.account.organization_id
              ? `/organizations/details/${props.account.organization_id}`
              : undefined
          }
        />

        <DetailFieldSelect
          record={props.account}
          field="role"
          label="Role"
          options={constants.account.role}
          placeholder="Select Role"
          displayField="roleFmt"
        />

        <DetailFieldSelect
          record={props.account}
          field="test_user_type"
          label="Test User Type"
          options={constants.account.test_user_type}
          placeholder="Not A Test User"
          displayField="test_user_typeFmt"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldDate
          record={props.account}
          field="email_verified_at_ts"
          label="Email Verified At"
          displayField="emailVerifiedAtFmt"
        />

        <DetailFieldDate
          record={props.account}
          field="last_login_ts"
          label="Last Login"
          displayField="lastLoginFmt"
        />

        <DetailFieldDate
          record={props.account}
          field="password_updated_at_ts"
          label="Password Updated At"
        />
      </DetailFieldContainer>
    </div>
  );
});
