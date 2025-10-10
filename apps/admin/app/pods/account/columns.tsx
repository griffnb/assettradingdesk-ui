import { status } from "@/models/models/account/_constants/status";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
export const columns: IColumn<AccountModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<AccountModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<AccountModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/accounts/edit",
  } as RowActionColumn<AccountModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
