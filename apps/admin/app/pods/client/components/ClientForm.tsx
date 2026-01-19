import { ClientModel } from "@/models/models/client/model/ClientModel";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldCheckbox } from "@/ui/common/components/form/fields/FormFieldCheckbox";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface ClientFormProps {
  record: ClientModel;
  onSuccess?: (record: ClientModel) => void;
  onCancel?: () => void;
}

export const ClientForm = observer(function ClientForm(props: ClientFormProps) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<ClientModel>(props.record);
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
            nav("/clients"); // default fallback
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
        nav("/clients"); // default fallback
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
          placeholder="Full Name"
        />

        <FormFieldText
          record={props.record}
          field="title"
          type="text"
          label="Title"
          placeholder="Job Title"
        />

        <FormFieldCheckbox
          record={props.record}
          field="is_decision_maker"
          label="Decision Maker"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
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

        <FormFieldText
          record={props.record}
          field="mobile"
          type="tel"
          label="Mobile"
          placeholder="Mobile Number"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<ClientModel, CompanyModel>
          record={props.record}
          field="company_id"
          label="Company"
          placeholder="Select Company"
          modelName="company"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<ClientModel, FacilityModel>
          record={props.record}
          field="facility_id"
          label="Facility"
          placeholder="Select Facility"
          modelName="facility"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<ClientModel, ClientModel>
          record={props.record}
          field="supervisor_client_id"
          label="Supervisor"
          placeholder="Select Supervisor"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<ClientModel, AccountModel>
          record={props.record}
          field="source_account_id"
          label="Source Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record.contact_info}
          field="linkedin"
          type="text"
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/username"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
