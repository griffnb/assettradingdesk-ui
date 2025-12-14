import { MessageModel } from "@/models/models/message/model/MessageModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldTextArea } from "@/ui/common/components/form/details/DetailFieldTextArea";
import { DetailFieldCheckbox } from "@/ui/common/components/form/details/DetailFieldCheckbox";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { observer } from "mobx-react-lite";

interface MessageInfoProps {
  message: MessageModel;
}

export const MessageInfo = observer(function MessageInfo(
  props: MessageInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Message Details</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<MessageModel, AccountModel>
          record={props.message}
          field="from_account_id"
          displayField="from_account_name"
          label="From Account"
          placeholder="Select From Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.from_account_id
              ? `/accounts/details/${props.message.from_account_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<MessageModel, AccountModel>
          record={props.message}
          field="to_account_id"
          displayField="to_account_name"
          label="To Account"
          placeholder="Select To Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.to_account_id
              ? `/accounts/details/${props.message.to_account_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldTextArea
          record={props.message}
          field="body"
          label="Message Body"
          placeholder="Enter message content..."
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldCheckbox
          record={props.message}
          field="is_read"
          label="Mark as Read"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Organizations</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<MessageModel, OrganizationModel>
          record={props.message}
          field="seller_organization_id"
          label="Seller Organization"
          placeholder="Select Seller Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.seller_organization_id
              ? `/organizations/details/${props.message.seller_organization_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<MessageModel, OrganizationModel>
          record={props.message}
          field="buyer_organization_id"
          label="Buyer Organization"
          placeholder="Select Buyer Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.buyer_organization_id
              ? `/organizations/details/${props.message.buyer_organization_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Related Entities</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<MessageModel, AssetModel>
          record={props.message}
          field="asset_id"
          label="Related Asset"
          placeholder="Select Asset"
          modelName="asset"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.asset_id
              ? `/assets/details/${props.message.asset_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<MessageModel, OpportunityModel>
          record={props.message}
          field="opportunity_id"
          label="Related Opportunity"
          placeholder="Select Opportunity"
          modelName="opportunity"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.opportunity_id
              ? `/opportunities/details/${props.message.opportunity_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<MessageModel, PipelineModel>
          record={props.message}
          field="pipeline_id"
          label="Related Pipeline"
          placeholder="Select Pipeline"
          modelName="pipeline"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.message.pipeline_id
              ? `/pipelines/details/${props.message.pipeline_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Thread Information</h2>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={props.message}
          field="unread_count"
          label="Unread Count"
        />

        <DetailFieldReadOnly
          record={props.message}
          field="total_count"
          label="Total Count"
        />
      </DetailFieldContainer>

      {props.message.asset_id && (
        <>
          <h2 className="mb-6 mt-8 text-lg font-semibold">Asset Information</h2>

          <DetailFieldContainer>
            <DetailFieldReadOnly
              record={props.message}
              field="manufacturer_name"
              label="Manufacturer"
            />

            <DetailFieldReadOnly
              record={props.message}
              field="model_name"
              label="Model"
            />
          </DetailFieldContainer>

          <DetailFieldContainer>
            <DetailFieldReadOnly
              record={props.message}
              field="category_name"
              label="Category"
            />
          </DetailFieldContainer>
        </>
      )}
    </div>
  );
});
