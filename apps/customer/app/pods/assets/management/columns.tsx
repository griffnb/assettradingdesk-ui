import { constants } from "@/models/constants";
import { status } from "@/models/models/asset/_constants/status";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MenuOption } from "@/ui/common/components/menu/MenuOption";
import InlineEditCellSelect, {
  InlineEditCellSelectColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellSelect";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import {
  RowActionColumn,
  RowActions,
  RowActionsActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
import { runInAction } from "mobx";

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
        >
          <RowActionsActions>
            <MenuOption
              onClick={() => {
                runInAction(() => {
                  options.record.status = 100; // Active
                  options.record.save();
                });
              }}
              prependIcon={<i className="fa fa-play mr-2 text-green-500"></i>}
            >
              Activate
            </MenuOption>
            <MenuOption
              onClick={() => {
                runInAction(() => {
                  options.record.status = 200; // Archived/Disabled
                  options.record.save();
                });
              }}
              prependIcon={<i className="fa fa-pause mr-2 text-yellow-500"></i>}
            >
              Disable
            </MenuOption>
            <MenuOption
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this asset?")
                ) {
                  runInAction(() => {
                    options.record.status = 300; // Deleted
                    options.record.save();
                  });
                }
              }}
              prependIcon={<i className="fa fa-trash mr-2 text-error-500"></i>}
            >
              Delete
            </MenuOption>
            <MenuOption
              as="a"
              href={`/manage/assets/edit/${options.record.id}`}
              prependIcon={<i className="fa fa-pencil mr-2"></i>}
            >
              Edit
            </MenuOption>
            <MenuOption
              onClick={() => {
                alert("View Messages clicked");
              }}
              prependIcon={<i className="fa fa-envelope mr-2"></i>}
            >
              View Messages
            </MenuOption>
          </RowActionsActions>
        </RowActions>
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
