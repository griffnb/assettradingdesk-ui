import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/asset/_constants/status";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
export const columns: IColumn<AssetModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<AssetModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<AssetModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/assets/edit",
  } as RowActionColumn<AssetModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
