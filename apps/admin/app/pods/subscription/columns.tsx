import { status } from "@/models/models/subscription/_constants/status";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";

export const columns: IColumn<SubscriptionModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<SubscriptionModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<SubscriptionModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/subscriptions/edit",
  } as RowActionColumn<SubscriptionModel>,

  {
    title: "Subscription ID",
    field: "subscription_id",
    queryField: "subscription_id",
  },

  {
    title: "Organization",
    field: "organization_name",
    queryField: "organization_id",
  },

  {
    title: "Billing Plan",
    field: "billing_plan_name",
    queryField: "billing_plan_id",
  },

  {
    title: "Billing Provider",
    field: "billingProviderLabel",
    queryField: "billing_provider",
  },

  {
    title: "Billing Cycle",
    field: "billingCycleLabel",
    queryField: "billing_cycle",
  },

  {
    title: "Amount",
    field: "amount",
    queryField: "amount",
    format: "dollars",
  },

  {
    title: "Level",
    field: "level",
    queryField: "level",
    format: "number",
  },

  {
    title: "Coupon Code",
    field: "coupon_code",
    queryField: "coupon_code",
    type: "text",
    render: (options: ColumnComponentOptions<SubscriptionModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<SubscriptionModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<SubscriptionModel>,

  {
    title: "Start Date",
    field: "start_ts",
    queryField: "start_ts",
  },

  {
    title: "Next Billing",
    field: "next_billing_ts",
    queryField: "next_billing_ts",
  },

  {
    title: "Created At",
    field: "created_at",
    queryField: "created_at",
  },

  {
    title: "Updated At",
    field: "updated_at",
    queryField: "updated_at",
  },
];
