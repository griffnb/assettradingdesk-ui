import { status } from "@/models/models/asset_file/_constants/status";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
export const columns: IColumn<AssetFileModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<AssetFileModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<AssetFileModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/asset_files/edit",
  } as RowActionColumn<AssetFileModel>,
];
