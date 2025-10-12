import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/facility/_constants/status";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
export const columns: IColumn<FacilityModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<FacilityModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<FacilityModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/facilities/edit",
  } as RowActionColumn<FacilityModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
