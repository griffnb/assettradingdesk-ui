import { status } from "@/models/models/message/_constants/status";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import {
  LinkCell,
  LinkCellColumn,
} from "@/ui/common/components/table/cell/LinkCell";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  InlineEditCellCheckbox,
  InlineEditCellCheckboxColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellCheckbox";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<MessageModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<MessageModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<MessageModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/messages/edit",
  } as RowActionColumn<MessageModel>,

  {
    title: "From",
    field: "from_account_name",
    queryField: "from_account_name",
  },

  {
    title: "To",
    field: "to_account_name",
    queryField: "to_account_name",
  },

  {
    title: "Message",
    field: "label",
    queryField: "body",
    linkTo: "/messages/details/[id]",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<MessageModel>) => {
      return (
        <LinkCell
          record={options.record}
          column={options.column as LinkCellColumn<MessageModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as LinkCellColumn<MessageModel>,

  {
    title: "Read",
    field: "is_read",
    queryField: "is_read",
    render: (options: ColumnComponentOptions<MessageModel>) => {
      return (
        <InlineEditCellCheckbox
          record={options.record}
          column={options.column as InlineEditCellCheckboxColumn<MessageModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellCheckboxColumn<MessageModel>,

  {
    title: "Asset",
    field: "asset_make_model",
    queryField: "asset_make_model",
  },

  {
    title: "Seller Org",
    field: "seller_organization_id",
    queryField: "seller_organization_id",
  },

  {
    title: "Buyer Org",
    field: "buyer_organization_id",
    queryField: "buyer_organization_id",
  },

  {
    title: "Created",
    field: "created_at",
    queryField: "created_at",
    displayField: "createdAtFmt",
  },
];
