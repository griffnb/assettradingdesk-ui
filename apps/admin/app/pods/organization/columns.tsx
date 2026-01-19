import { status } from "@/models/models/organization/_constants/status";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import {
  RowActions,
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<OrganizationModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<OrganizationModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<OrganizationModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/organizations/edit",
  } as RowActionColumn<OrganizationModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    type: "text",
    render: (options: ColumnComponentOptions<OrganizationModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<OrganizationModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<OrganizationModel>,

  {
    title: "Organization Type",
    field: "organization_typeStr",
    displayField: "organization_typeStr",
    queryField: "organization_type",
  },

  {
    title: "Subdomain",
    field: "subdomain",
    queryField: "subdomain",
  },

  {
    title: "Billing Plan",
    field: "billing_plan_name",
    queryField: "billing_plan_id",
  },

  {
    title: "Billing Email",
    field: "properties",
    displayField: "properties",
    queryField: "properties.billing_email",
    noSort: true,
    render: (options: ColumnComponentOptions<OrganizationModel>) => {
      return <>{options.record.properties?.billing_email || ""}</>;
    },
  },

  {
    title: "Stripe ID",
    field: "stripe_id",
    queryField: "stripe_id",
  },

  {
    title: "External ID",
    field: "external_id",
    queryField: "external_id",
  },

  {
    title: "End User Company",
    field: "end_user_company_name",
    queryField: "end_user_company_id",
  },
];
