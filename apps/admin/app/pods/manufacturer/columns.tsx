import { status } from "@/models/models/manufacturer/_constants/status";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<ManufacturerModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<ManufacturerModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<ManufacturerModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/manufacturers/edit",
  } as RowActionColumn<ManufacturerModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    type: "text",
    render: (options: ColumnComponentOptions<ManufacturerModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ManufacturerModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ManufacturerModel>,

  {
    title: "Slug",
    field: "slug",
    queryField: "slug",
    type: "text",
    render: (options: ColumnComponentOptions<ManufacturerModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ManufacturerModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ManufacturerModel>,

  {
    title: "Description",
    field: "description",
    queryField: "description",
  },

  {
    title: "Assets",
    field: "asset_count",
    queryField: "asset_count",
    format: "number",
  },
];
