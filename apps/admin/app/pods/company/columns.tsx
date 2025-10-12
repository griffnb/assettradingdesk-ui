import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/company/_constants/status";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
export const columns: IColumn<CompanyModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<CompanyModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<CompanyModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/companies/edit",
  } as RowActionColumn<CompanyModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
