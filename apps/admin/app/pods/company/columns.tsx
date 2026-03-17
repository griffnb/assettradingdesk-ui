import { status } from "@/models/models/company/_constants/status";
import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import { LinkCellColumn } from "@/ui/common/components/table/cell/LinkCell";
import { MultiBadgeCell } from "@/ui/common/components/table/cell/MultiBadgeCell";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<CompanyModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<CompanyModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<CompanyModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/companies/edit",
  } as RowActionColumn<CompanyModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    type: "text",
    render: (options: ColumnComponentOptions<CompanyModel>) => {
      return (
        <InlineEditCellText
          tableState={options.tableState}
          record={options.record}
          column={options.column as InlineEditCellTextColumn<CompanyModel>}
          index={options.index}
        />
      );
    },
  } as InlineEditCellTextColumn<CompanyModel>,

  {
    title: "Country",
    field: "country",
    queryField: "country",
  },

  {
    title: "City",
    field: "address",
    displayField: "address",
    queryField: "address.city",
    render: (options: ColumnComponentOptions<CompanyModel>) => {
      return <>{options.record.address?.city || ""}</>;
    },
  },

  {
    title: "Phone",
    field: "phone",
    queryField: "phone",
  },

  {
    title: "Email",
    field: "email",
    queryField: "email",
  },

  {
    title: "Website",
    field: "website",
    queryField: "website",
    target: "_new",
  } as LinkCellColumn<CompanyModel>,

  {
    title: "Company Types",
    field: "meta_data.company_types",
    queryField: "meta_data.company_types",
    noSort: true,
    render: (options: ColumnComponentOptions<CompanyModel>) => {
      return <MultiBadgeCell {...options} />;
    },
  },

  {
    title: "Wafer Sizes",
    field: "meta_data.wafer_sizes",
    queryField: "meta_data.wafer_sizes",
    noSort: true,
    render: (options: ColumnComponentOptions<CompanyModel>) => {
      return <MultiBadgeCell {...options} />;
    },
  },
];
