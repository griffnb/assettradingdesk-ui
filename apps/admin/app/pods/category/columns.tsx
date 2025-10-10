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
    title: "Slug",
    field: "slug",
    queryField: "slug",
  },
  {
    title: "Description",
    field: "description",
    queryField: "description",
    render: (options: ColumnComponentOptions<CategoryModel>) => {
      const description = options.record.description;
      if (!description)
        return <span className="text-gray-400">No description</span>;
      return (
        <span title={description}>
          {description.length > 50
            ? `${description.substring(0, 50)}...`
            : description}
        </span>
      );
    },
  },
  {
    title: "Parent Category",
    field: "parent_category_id",
    queryField: "parent_category_id",
    render: (options: ColumnComponentOptions<CategoryModel>) => {
      if (options.record.isRootCategory) {
        return <span className="text-gray-400">Root Category</span>;
      }
      return <span>Has Parent</span>;
    },
  },
  {
    title: "Created At",
    field: "created_at",
    queryField: "created_at",
    render: (options: ColumnComponentOptions<CategoryModel>) => {
      return options.record.created_at?.format("MMM DD, YYYY") || "";
    },
  },
];
