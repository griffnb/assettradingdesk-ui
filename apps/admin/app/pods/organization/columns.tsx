import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/organization/_constants/status";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
export const columns: IColumn<OrganizationModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<OrganizationModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<OrganizationModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/organizations/edit",
  } as RowActionColumn<OrganizationModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
