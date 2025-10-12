import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/client/_constants/status";
import { ClientModel } from "@/models/models/client/model/ClientModel";
export const columns: IColumn<ClientModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<ClientModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<ClientModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/clients/edit",
  } as RowActionColumn<ClientModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
