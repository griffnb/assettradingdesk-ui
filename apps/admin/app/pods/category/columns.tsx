import { status } from "@/models/models/category/_constants/status";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
export const columns: IColumn<CategoryModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<CategoryModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<CategoryModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/categories/edit",
  } as RowActionColumn<CategoryModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
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
    title: "Industry",
    field: "industry_name",
    queryField: "industry_name",
  },
  {
    title: "Parent Category",
    field: "parent_name",
    queryField: "parent_name",
  },
  {
    title: "Assets",
    field: "asset_count",
    queryField: "asset_count",
  },

  {
    title: "Hierarchy",
    field: "category_hierarchy",
    queryField: "category_hierarchy",
  },
];
