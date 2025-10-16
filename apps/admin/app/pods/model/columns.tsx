import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/model/_constants/status";
import { ModelModel } from "@/models/models/model/model/ModelModel";
export const columns: IColumn<ModelModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<ModelModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<ModelModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/models/edit",
  } as RowActionColumn<ModelModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
