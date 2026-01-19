import { status } from "@/models/models/client/_constants/status";
import { ClientModel } from "@/models/models/client/model/ClientModel";
import {
  LinkCell,
  LinkCellColumn,
} from "@/ui/common/components/table/cell/LinkCell";
import {
  RowActions,
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import {
  InlineEditCellCheckbox,
  InlineEditCellCheckboxColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellCheckbox";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<ClientModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<ClientModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/clients/edit",
  } as RowActionColumn<ClientModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    linkTo: "/clients/details/[id]",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <LinkCell
          record={options.record}
          column={options.column as LinkCellColumn<ClientModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as LinkCellColumn<ClientModel>,

  {
    title: "Title",
    field: "title",
    queryField: "title",
    type: "text",
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ClientModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ClientModel>,

  {
    title: "Email",
    field: "email",
    queryField: "email",
    type: "email",
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ClientModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ClientModel>,

  {
    title: "Phone",
    field: "phone",
    queryField: "phone",
    type: "tel",
    inputMode: "tel",
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ClientModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ClientModel>,

  {
    title: "Mobile",
    field: "mobile",
    queryField: "mobile",
    type: "tel",
    inputMode: "tel",
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<ClientModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<ClientModel>,

  {
    title: "Decision Maker",
    field: "is_decision_maker",
    queryField: "is_decision_maker",
    format: "boolean",
    render: (options: ColumnComponentOptions<ClientModel>) => {
      return (
        <InlineEditCellCheckbox
          record={options.record}
          column={
            options.column as InlineEditCellCheckboxColumn<ClientModel>
          }
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellCheckboxColumn<ClientModel>,

  {
    title: "Company",
    field: "company_name",
    queryField: "company_name",
  },

  {
    title: "Facility",
    field: "facility_name",
    queryField: "facility_name",
  },

  {
    title: "Supervisor",
    field: "supervisor_name",
    queryField: "supervisor_name",
  },

  {
    title: "Created",
    field: "created_at",
    queryField: "created_at",
    displayField: "createdAtFmt",
  },
];
