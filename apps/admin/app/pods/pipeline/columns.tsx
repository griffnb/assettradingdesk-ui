import { RowActions, 
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import { ColumnComponentOptions, IColumn } from "@/ui/common/components/types/columns";
import { status } from "@/models/models/pipeline/_constants/status";
import { PipelineModel } from "@/models/models/pipeline/model/PipelineModel";
export const columns: IColumn<PipelineModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed:true,
     render: (options: ColumnComponentOptions<PipelineModel>) => {
      return <RowActions {...options} column={options.column as RowActionColumn<PipelineModel>} />;
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/pipelines/edit",
  } as RowActionColumn<PipelineModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
];
