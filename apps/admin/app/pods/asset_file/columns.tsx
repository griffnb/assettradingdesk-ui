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
import { InlineEditCellTextColumn } from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import InlineEditCellText from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import { BadgeCell } from "@/ui/common/components/table/cell/BadgeCell";
import { constants } from "@/models/models/asset_file/constants";
import { LinkCell, LinkCellColumn } from "@/ui/common/components/table/cell/LinkCell";

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

  {
    title: "File Name",
    field: "file_name",
    queryField: "file_name",
    type: "text",
    render: (options: ColumnComponentOptions<AssetFileModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetFileModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetFileModel>,

  {
    title: "File Type",
    field: "file_type",
    displayField: "file_type_label",
    queryField: "file_type",
    render: (options: ColumnComponentOptions<AssetFileModel>) => {
      return (
        <BadgeCell
          record={options.record}
          column={options.column}
          tableState={options.tableState}
          index={options.index}
        />
      );
    },
  },

  {
    title: "File Order",
    field: "file_order",
    queryField: "file_order",
    type: "number",
    render: (options: ColumnComponentOptions<AssetFileModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetFileModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetFileModel>,

  {
    title: "Asset",
    field: "asset_name",
    queryField: "asset_name",
    linkTo: "/assets/details/[asset_id]",
    paramMapping: {
      asset_id: "asset_id",
    },
    render: (options: ColumnComponentOptions<AssetFileModel>) => {
      return (
        <LinkCell
          record={options.record}
          column={options.column as LinkCellColumn<AssetFileModel>}
          tableState={options.tableState}
          index={options.index}
        />
      );
    },
  } as LinkCellColumn<AssetFileModel>,

  {
    title: "File Location",
    field: "file_location",
    queryField: "file_location",
  },

  {
    title: "Created By",
    field: "created_by_name",
    queryField: "created_by_name",
  },

  {
    title: "Updated At",
    field: "updated_at",
    queryField: "updated_at",
  },
];
