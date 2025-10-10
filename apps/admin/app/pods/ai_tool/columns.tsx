import { status } from "@/models/models/ai_tool/_constants/status";
import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import {
  LinkCell,
  LinkCellColumn,
} from "@/ui/common/components/table/cell/LinkCell";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
export const columns: IColumn<AiToolModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<AiToolModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<AiToolModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/ai_tools/edit",
  } as RowActionColumn<AiToolModel>,

  {
    title: "Name",
    field: "name",
    displayField: "name",
    queryField: "name",
    linkTo: "/ai_tools/details/[id]",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<AiToolModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<AiToolModel>}
        />
      );
    },
  } as LinkCellColumn<AiToolModel>,
  {
    title: "Description",
    field: "description",
    queryField: "description",
    render: (options: ColumnComponentOptions<AiToolModel>) => {
      const desc = options.record.description;
      return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
    },
  },
  {
    title: "Website",
    field: "website_url",
    queryField: "website_url",
    render: (options: ColumnComponentOptions<AiToolModel>) => {
      const url = options.record.website_url;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit
        </a>
      ) : null;
    },
  },
  {
    title: "Featured",
    field: "is_featured",
    queryField: "is_featured",
    render: (options: ColumnComponentOptions<AiToolModel>) => {
      return options.record.is_featured ? "Yes" : "No";
    },
  },
];
