import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/manufacturer/_constants/status";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
export const columns: IColumn<ManufacturerModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<ManufacturerModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<ManufacturerModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/manufacturers/edit",
  } as RowActionColumn<ManufacturerModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
