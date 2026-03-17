import { status } from "@/models/models/model/_constants/status";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<ModelModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<ModelModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<ModelModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/models/edit",
  } as RowActionColumn<ModelModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
  },
  {
    title: "Manufacturer",
    field: "manufacturer_name",
    queryField: "manufacturer_name",
  },
  {
    title: "Category",
    field: "category_name",
    queryField: "category_name",
  },
  {
    title: "Description",
    field: "description",
    queryField: "description",
  },
  {
    title: "Slug",
    field: "slug",
    queryField: "slug",
  },
  {
    title: "Hot",
    field: "hot",
    queryField: "hot",
    format: "number",
  },
  {
    title: "Assets",
    field: "asset_count",
    queryField: "asset_count",
    format: "number",
  },
];
