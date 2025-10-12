import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/category/_constants/status";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
export const columns: IColumn<CategoryModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<CategoryModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<CategoryModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/categories/edit",
  } as RowActionColumn<CategoryModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
