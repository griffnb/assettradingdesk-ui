import { status } from "@/models/models/opportunity/_constants/status";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import {
  LinkCell,
  LinkCellColumn,
} from "@/ui/common/components/table/cell/LinkCell";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<OpportunityModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<OpportunityModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<OpportunityModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/opportunities/edit",
  } as RowActionColumn<OpportunityModel>,

  {
    title: "Asset",
    field: "asset_model_name",
    displayField: "assetLabel",
    queryField: "asset_id",
    linkTo: "/assets/details/[asset_id]",
    paramMapping: { asset_id: "asset_id" },
    render: (options: ColumnComponentOptions<OpportunityModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<OpportunityModel>}
        />
      );
    },
  } as LinkCellColumn<OpportunityModel>,

  {
    title: "Request",
    field: "request_id",
    queryField: "request_id",
    displayField: "requestLabel",
    linkTo: "/requests/details/[request_id]",
    paramMapping: { request_id: "request_id" },
    render: (options: ColumnComponentOptions<OpportunityModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<OpportunityModel>}
        />
      );
    },
  } as LinkCellColumn<OpportunityModel>,

  {
    title: "Pipeline",
    field: "pipeline_id",
    queryField: "pipeline_id",
    linkTo: "/pipelines/details/[pipeline_id]",
    paramMapping: { pipeline_id: "pipeline_id" },
    render: (options: ColumnComponentOptions<OpportunityModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<OpportunityModel>}
        />
      );
    },
  } as LinkCellColumn<OpportunityModel>,

  {
    title: "Asset Price",
    field: "current_asset_price",
    queryField: "current_asset_price",
    format: "dollars",
  },

  {
    title: "Request Price",
    field: "current_request_price",
    queryField: "current_request_price",
    format: "dollars",
  },

  {
    title: "Quantity",
    field: "quantity",
    queryField: "quantity",
    format: "number",
  },

  {
    title: "Buyer Client",
    field: "buyer_client_name",
    queryField: "buyer_client_name",
  },

  {
    title: "Buyer Company",
    field: "buyer_company_name",
    queryField: "buyer_company_name",
  },

  {
    title: "Buyer Facility",
    field: "buyer_facility_name",
    queryField: "buyer_facility_name",
  },

  {
    title: "Seller Client",
    field: "seller_client_name",
    queryField: "seller_client_name",
  },

  {
    title: "Seller Company",
    field: "seller_company_name",
    queryField: "seller_company_name",
  },

  {
    title: "Seller Facility",
    field: "seller_facility_name",
    queryField: "seller_facility_name",
  },

  {
    title: "Buyer Deal Status",
    field: "buyer_deal_status",
    queryField: "buyer_deal_status",
    format: "number",
  },

  {
    title: "Seller Deal Status",
    field: "seller_deal_status",
    queryField: "seller_deal_status",
    format: "number",
  },

  {
    title: "Opportunity Type",
    field: "opportunity_type",
    queryField: "opportunity_type",
    format: "number",
  },
];
