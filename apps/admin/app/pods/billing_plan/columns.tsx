import { status } from "@/models/models/billing_plan/_constants/status";
import { BillingPlanModel } from "@/models/models/billing_plan/model/BillingPlanModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
export const columns: IColumn<BillingPlanModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<BillingPlanModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<BillingPlanModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/billing_plans/edit",
  } as RowActionColumn<BillingPlanModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
  {
    title: "Internal Name",
    field: "internal_name",
    queryField: "internal_name",
  },
  {
    title: "Price",
    field: "priceFmt",
    queryField: "price",
  },
  {
    title: "Level",
    field: "level",
    queryField: "level",
  },
  {
    title: "Billing Cycle",
    field: "billingCycleLabel",
    queryField: "billing_cycle",
  },
  {
    title: "Default",
    field: "isDefaultFmt",
    queryField: "is_default",
  },
  {
    title: "Stripe Price ID",
    field: "stripePriceId",
    queryField: "stripe_price_id",
  },
];
