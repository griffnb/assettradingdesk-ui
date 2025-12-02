import { status } from "@/models/models/subscription/_constants/status";
import { SubscriptionModel } from "@/models/models/subscription/model/SubscriptionModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
export const columns: IColumn<SubscriptionModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
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
];
