import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/opportunity/_constants/status";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
export const columns: IColumn<OpportunityModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<OpportunityModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<OpportunityModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/opportunities/edit",
  } as RowActionColumn<OpportunityModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
