import { status } from "@/models/models/asset/_constants/status";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import InlineEditCellSelect, {
  InlineEditCellSelectColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellSelect";
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

export const columns: IColumn<AssetModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<AssetModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/assets/edit",
  } as RowActionColumn<AssetModel>,

  {
    title: "Description",
    field: "description",
    queryField: "description",
    type: "text",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,

  {
    title: "Serial Number",
    field: "serial_number",
    queryField: "serial_number",
    type: "text",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,

  {
    title: "Year",
    field: "year",
    queryField: "year",
    type: "number",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,

  {
    title: "Quantity",
    field: "quantity",
    queryField: "quantity",
    type: "number",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,

  {
    title: "Price",
    field: "price",
    queryField: "price",
    format: "dollars",
  },

  {
    title: "Install Status",
    field: "install_status",
    queryField: "install_status",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellSelect
          record={options.record}
          column={options.column as InlineEditCellSelectColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
    options: [],
  } as InlineEditCellSelectColumn<AssetModel>,

  {
    title: "Operational Status",
    field: "operational_status",
    queryField: "operational_status",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellSelect
          record={options.record}
          column={options.column as InlineEditCellSelectColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
    options: [],
  } as InlineEditCellSelectColumn<AssetModel>,

  {
    title: "Verified Date",
    field: "verified_at_ts",
    queryField: "verified_at_ts",
  },

  {
    title: "Notes",
    field: "notes",
    queryField: "notes",
    type: "text",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,

  {
    title: "Configuration Notes",
    field: "configuration_notes",
    queryField: "configuration_notes",
    type: "text",
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AssetModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AssetModel>,
];
