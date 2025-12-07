import { status } from "@/models/models/account/_constants/status";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import {
  LinkCell,
  LinkCellColumn,
} from "@/ui/common/components/table/cell/LinkCell";
import { RowActionColumn } from "@/ui/common/components/table/cell/RowActions";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
import { AccountRowActions } from "./components/AccountRowActions";

export const columns: IColumn<AccountModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<AccountModel>) => {
      return (
        <AccountRowActions
          {...options}
          column={options.column as RowActionColumn<AccountModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/accounts/edit",
  } as RowActionColumn<AccountModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    linkTo: "/accounts/details/[id]",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<AccountModel>) => {
      return (
        <LinkCell
          record={options.record}
          column={options.column as LinkCellColumn<AccountModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as LinkCellColumn<AccountModel>,

  {
    title: "Email",
    field: "email",
    queryField: "email",
  },

  {
    title: "Phone",
    field: "phone",
    queryField: "phone",
    type: "tel",
    inputMode: "tel",
    render: (options: ColumnComponentOptions<AccountModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<AccountModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<AccountModel>,

  {
    title: "Organization",
    field: "organization_name",
    queryField: "organization_name",
  },

  {
    title: "Email Verified",
    field: "email_verified_at_ts",
    queryField: "email_verified_at_ts",
    displayField: "emailVerifiedAtFmt",
  },

  {
    title: "Last Login",
    field: "last_login_ts",
    queryField: "last_login_ts",
    displayField: "lastLoginFmt",
  },

  {
    title: "Created",
    field: "created_at",
    queryField: "created_at",
    displayField: "createdAtFmt",
  },
];
