import { constants } from "@/models/constants";
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
    title: "",
    field: "id",
    queryField: "id",
    noSort: true,
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <img
          src={options.record.thumbnail}
          alt="Asset Thumbnail"
          className="size-12 rounded object-cover"
        />
      );
    },
  },
  {
    title: "Make/Model",
    field: "model_name",
    queryField: "model_name",
    displayField: "label",
  },
  {
    title: "Location",
    field: "location",
    queryField: "location",
  },

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
    displayField: "install_statusFmt",
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
    options: constants.asset.install_status,
  } as InlineEditCellSelectColumn<AssetModel>,

  {
    title: "Operational Status",
    field: "operational_status",
    queryField: "operational_status",
    displayField: "operational_statusFmt",
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
    options: constants.asset.operational_status,
  } as InlineEditCellSelectColumn<AssetModel>,
];
