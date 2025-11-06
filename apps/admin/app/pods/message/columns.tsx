import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/message/_constants/status";
import { MessageModel } from "@/models/models/message/model/MessageModel";
export const columns: IColumn<MessageModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<MessageModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<MessageModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/messages/edit",
  } as RowActionColumn<MessageModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
