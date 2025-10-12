import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/industry/_constants/status";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
export const columns: IColumn<IndustryModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<IndustryModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<IndustryModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/industries/edit",
  } as RowActionColumn<IndustryModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
