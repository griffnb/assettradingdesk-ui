import { status } from "@/models/models/asset/_constants/status";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
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
    title: "Model Name",
    field: "model_name",
    queryField: "model_name",
    displayField: "label",
    linkTo: "/assets/details/[id]",
    class: "max-w-64 px-3",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<AssetModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<AssetModel>}
          className="inline-block w-64 truncate"
        />
      );
    },
  } as LinkCellColumn<AssetModel>,

  {
    title: "Description",
    field: "description",
    queryField: "description",
    class: "line-clamp-4 text-wrap w-64 py-0 my-1",
  },

  {
    title: "Serial Number",
    field: "serial_number",
    queryField: "serial_number",
  },

  {
    title: "Year",
    field: "year",
    queryField: "year",
  },

  {
    title: "Quantity",
    field: "quantity",
    queryField: "quantity",
  },

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
    displayField: "install_statusEnum.label",
  },

  {
    title: "Operational Status",
    field: "operational_status",
    queryField: "operational_status",
    displayField: "operational_statusEnum.label",
  },

  {
    title: "Verified Date",
    field: "verified_at_ts",
    queryField: "verified_at_ts",
  },

  {
    title: "Notes",
    field: "notes",
    queryField: "notes",
    class: "line-clamp-4 text-wrap w-64 py-0 my-1",
  },

  {
    title: "Configuration Notes",
    field: "configuration_notes",
    queryField: "configuration_notes",
    class: "line-clamp-4 text-wrap w-64 py-0 my-1",
  },
];
