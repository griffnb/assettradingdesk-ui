import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import { DetailFieldContainer } from "@/ui/common/components/form/details/DetailFieldContainer";
import { DetailFieldModelSearchSelect } from "@/ui/common/components/form/details/DetailFieldModelSearchSelect";
import { DetailFieldReadOnly } from "@/ui/common/components/form/details/DetailFieldReadOnly";
import { DetailFieldText } from "@/ui/common/components/form/details/DetailFieldText";
import { observer } from "mobx-react-lite";

interface OpportunityInfoProps {
  opportunity: OpportunityModel;
}

export const OpportunityInfo = observer(function OpportunityInfo(
  props: OpportunityInfoProps,
) {
  return (
    <div className="p-10">
      <h2 className="mb-6 text-lg font-semibold">Asset & Request</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<OpportunityModel, AssetModel>
          record={props.opportunity}
          field="asset_id"
          displayField="asset_model_name"
          label="Asset"
          placeholder="Select Asset"
          modelName="asset"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.asset_id
              ? `/assets/details/${props.opportunity.asset_id}`
              : undefined
          }
        />

        <DetailFieldReadOnly
          record={props.opportunity}
          field="asset_manufacturer_name"
          label="Asset Manufacturer"
        />

        <DetailFieldModelSearchSelect<OpportunityModel, RequestModel>
          record={props.opportunity}
          field="request_id"
          label="Request"
          placeholder="Select Request"
          modelName="request"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.request_id
              ? `/requests/details/${props.opportunity.request_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<OpportunityModel, PipelineModel>
          record={props.opportunity}
          field="pipeline_id"
          label="Pipeline"
          placeholder="Select Pipeline"
          modelName="pipeline"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.pipeline_id
              ? `/pipelines/details/${props.opportunity.pipeline_id}`
              : undefined
          }
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Pricing & Quantity</h2>

      <DetailFieldContainer>
        <DetailFieldText
          record={props.opportunity}
          field="current_asset_price"
          type="number"
          label="Current Asset Price"
          placeholder="0.00"
        />

        <DetailFieldText
          record={props.opportunity}
          field="current_request_price"
          type="number"
          label="Current Request Price"
          placeholder="0.00"
        />

        <DetailFieldText
          record={props.opportunity}
          field="quantity"
          type="number"
          label="Quantity"
          placeholder="1"
        />

        <DetailFieldText
          record={props.opportunity}
          field="opportunity_type"
          type="number"
          label="Opportunity Type"
          placeholder="0"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Buyer Information</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<OpportunityModel, OrganizationModel>
          record={props.opportunity}
          field="buyer_organization_id"
          label="Buyer Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          link={
            props.opportunity.buyer_organization_id
              ? `/organizations/details/${props.opportunity.buyer_organization_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<OpportunityModel, AccountModel>
          record={props.opportunity}
          field="buyer_account_id"
          label="Buyer Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.buyer_account_id
              ? `/accounts/details/${props.opportunity.buyer_account_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<OpportunityModel, ClientModel>
          record={props.opportunity}
          field="buyer_client_id"
          displayField="buyer_client_name"
          label="Buyer Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.buyer_client_id
              ? `/clients/details/${props.opportunity.buyer_client_id}`
              : undefined
          }
        />

        <DetailFieldText
          record={props.opportunity}
          field="buyer_deal_status"
          type="number"
          label="Buyer Deal Status"
          placeholder="0"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={props.opportunity}
          field="buyer_company_name"
          label="Buyer Company"
        />

        <DetailFieldReadOnly
          record={props.opportunity}
          field="buyer_facility_name"
          label="Buyer Facility"
        />
      </DetailFieldContainer>

      <h2 className="mb-6 mt-8 text-lg font-semibold">Seller Information</h2>

      <DetailFieldContainer>
        <DetailFieldModelSearchSelect<OpportunityModel, OrganizationModel>
          record={props.opportunity}
          field="seller_organization_id"
          label="Seller Organization"
          placeholder="Select Organization"
          modelName="organization"
          modelSearchParam="q"
          modelDisplayField="label"
          modelSearchFilters={{ disabled: "0" }}
          link={
            props.opportunity.seller_organization_id
              ? `/organizations/details/${props.opportunity.seller_organization_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<OpportunityModel, AccountModel>
          record={props.opportunity}
          field="seller_account_id"
          label="Seller Account"
          placeholder="Select Account"
          modelName="account"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.seller_account_id
              ? `/accounts/details/${props.opportunity.seller_account_id}`
              : undefined
          }
        />

        <DetailFieldModelSearchSelect<OpportunityModel, ClientModel>
          record={props.opportunity}
          field="seller_client_id"
          displayField="seller_client_name"
          label="Seller Client"
          placeholder="Select Client"
          modelName="client"
          modelSearchParam="q"
          modelDisplayField="label"
          link={
            props.opportunity.seller_client_id
              ? `/clients/details/${props.opportunity.seller_client_id}`
              : undefined
          }
        />

        <DetailFieldText
          record={props.opportunity}
          field="seller_deal_status"
          type="number"
          label="Seller Deal Status"
          placeholder="0"
        />
      </DetailFieldContainer>

      <DetailFieldContainer>
        <DetailFieldReadOnly
          record={props.opportunity}
          field="seller_company_name"
          label="Seller Company"
        />

        <DetailFieldReadOnly
          record={props.opportunity}
          field="seller_facility_name"
          label="Seller Facility"
        />
      </DetailFieldContainer>
    </div>
  );
});
