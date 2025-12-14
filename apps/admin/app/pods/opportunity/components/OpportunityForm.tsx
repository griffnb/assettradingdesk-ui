import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormWrap } from "@/ui/common/components/form/wrap/FormWrap";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

interface OpportunityFormProps {
  record: OpportunityModel;
  onSuccess?: (record: OpportunityModel) => void;
  onCancel?: () => void;
}

export const OpportunityForm = observer(function OpportunityForm(
  props: OpportunityFormProps,
) {
  const nav = useNavigate();

  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<OpportunityModel>(props.record);
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
            nav("/opportunities"); // default fallback
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
        nav("/opportunities"); // default fallback
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
        <FormFieldModelSearchSelect<OpportunityModel, AssetModel>
          record={props.record}
          field="asset_id"
          label="Asset"
          placeholder="Select Asset"
          modelName="asset"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<OpportunityModel, RequestModel>
          record={props.record}
          field="request_id"
          label="Request"
          placeholder="Select Request"
          modelName="request"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<OpportunityModel, PipelineModel>
          record={props.record}
          field="pipeline_id"
          label="Pipeline"
          placeholder="Select Pipeline"
          modelName="pipeline"
          modelSearchParam="q"
          modelDisplayField="label"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="opportunity_type"
          type="number"
          label="Opportunity Type"
          placeholder="0"
        />

        <FormFieldText
          record={props.record}
          field="quantity"
          type="number"
          label="Quantity"
          placeholder="1"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldText
          record={props.record}
          field="current_asset_price"
          type="number"
          label="Current Asset Price"
          placeholder="0.00"
        />

        <FormFieldText
          record={props.record}
          field="current_request_price"
          type="number"
          label="Current Request Price"
          placeholder="0.00"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<OpportunityModel, OrganizationModel>
          record={props.record}
          field="buyer_organization_id"
          label="Buyer Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldModelSearchSelect<OpportunityModel, AccountModel>
          record={props.record}
          field="buyer_account_id"
          label="Buyer Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<OpportunityModel, ClientModel>
          record={props.record}
          field="buyer_client_id"
          label="Buyer Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldText
          record={props.record}
          field="buyer_deal_status"
          type="number"
          label="Buyer Deal Status"
          placeholder="0"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <FormFieldModelSearchSelect<OpportunityModel, OrganizationModel>
          record={props.record}
          field="seller_organization_id"
          label="Seller Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
        />

        <FormFieldModelSearchSelect<OpportunityModel, AccountModel>
          record={props.record}
          field="seller_account_id"
          label="Seller Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldModelSearchSelect<OpportunityModel, ClientModel>
          record={props.record}
          field="seller_client_id"
          label="Seller Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
        />

        <FormFieldText
          record={props.record}
          field="seller_deal_status"
          type="number"
          label="Seller Deal Status"
          placeholder="0"
        />
      </DetailFieldContainer>
    </FormWrap>
  );
});
