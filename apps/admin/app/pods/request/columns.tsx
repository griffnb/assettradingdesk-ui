import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
export const columns: IColumn<RequestModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<RequestModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<RequestModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/requests/edit",
  } as RowActionColumn<RequestModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
