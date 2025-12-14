import { status } from "@/models/models/pipeline/_constants/status";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
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

export const columns: IColumn<PipelineModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<PipelineModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<PipelineModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/pipelines/edit",
  } as RowActionColumn<PipelineModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    linkTo: "/pipelines/details/[id]",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<PipelineModel>) => {
      return (
        <LinkCell
          record={options.record}
          column={options.column as LinkCellColumn<PipelineModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as LinkCellColumn<PipelineModel>,

  {
    title: "Stage",
    field: "stage",
    displayField: "stageFmt",
    queryField: "stage",
  },

  {
    title: "Organization",
    field: "organization_id",
    queryField: "organization_id",
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
    title: "Created",
    field: "created_at",
    queryField: "created_at",
    displayField: "createdAtFmt",
  },
];
