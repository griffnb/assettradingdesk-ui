import { constants } from "@/models/constants";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface PipelineFormProps {
  record: PipelineModel;
  onSuccess?: (record: PipelineModel) => void;
  onCancel?: () => void;
}

export const PipelineForm = observer(function PipelineForm(
  props: PipelineFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<PipelineModel>(props.record);
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
            nav("/pipelines"); // default fallback
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
        nav("/pipelines"); // default fallback
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
          label="Pipeline Name"
          placeholder="Pipeline Name"
        />

        <FormFieldModelSearchSelect<PipelineModel, OrganizationModel>
          record={props.record}
          field="organization_id"
          label="Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldSelect
          record={props.record}
          field="stage"
          label="Stage"
          options={constants.pipeline.stage}
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<PipelineModel, AccountModel>
          record={props.record}
          field="buyer_owner_account_id"
          label="Buyer Owner Account"
          placeholder="Select Buyer Owner Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<PipelineModel, ClientModel>
          record={props.record}
          field="buyer_client_id"
          label="Buyer Client"
          placeholder="Select Buyer Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<PipelineModel, AccountModel>
          record={props.record}
          field="seller_owner_account_id"
          label="Seller Owner Account"
          placeholder="Select Seller Owner Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<PipelineModel, ClientModel>
          record={props.record}
          field="seller_client_id"
          label="Seller Client"
          placeholder="Select Seller Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
