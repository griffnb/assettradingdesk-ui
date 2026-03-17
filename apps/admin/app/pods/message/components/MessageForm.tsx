import { isObjectValid } from "@/common_lib/utils/validations";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldCheckbox } from "@/ui/common/components/form/fields/FormFieldCheckbox";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface MessageFormProps {
  record: MessageModel;
  onSuccess?: (record: MessageModel) => void;
  onCancel?: () => void;
}

export const MessageForm = observer(function MessageForm(
  props: MessageFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<MessageModel>(props.record);
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
            nav("/messages"); // default fallback
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
        nav("/messages"); // default fallback
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
        <FormFieldModelSearchSelect<MessageModel, AccountModel>
          record={props.record}
          field="from_account_id"
          label="From Account"
          placeholder="Select From Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<MessageModel, AccountModel>
          record={props.record}
          field="to_account_id"
          label="To Account"
          placeholder="Select To Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldTextArea
          record={props.record}
          field="body"
          label="Message Body"
          placeholder="Enter message content..."
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<MessageModel, OrganizationModel>
          record={props.record}
          field="seller_organization_id"
          label="Seller Organization"
          placeholder="Select Seller Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<MessageModel, OrganizationModel>
          record={props.record}
          field="buyer_organization_id"
          label="Buyer Organization"
          placeholder="Select Buyer Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<MessageModel, AssetModel>
          record={props.record}
          field="asset_id"
          label="Related Asset"
          placeholder="Select Asset"
          modelName="asset"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<MessageModel, OpportunityModel>
          record={props.record}
          field="opportunity_id"
          label="Related Opportunity"
          placeholder="Select Opportunity"
          modelName="opportunity"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<MessageModel, PipelineModel>
          record={props.record}
          field="pipeline_id"
          label="Related Pipeline"
          placeholder="Select Pipeline"
          modelName="pipeline"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldCheckbox
          record={props.record}
          field="is_read"
          label="Mark as Read"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
