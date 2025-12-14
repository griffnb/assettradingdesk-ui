import { constants as assetConstants } from "@/models/models/asset/constants";
import { status } from "@/models/models/facility/_constants/status";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import InlineEditCellText, {
  InlineEditCellTextColumn,
} from "@/ui/common/components/table/cell/inline-edit/InlineEditCellText";
import { MultiBadgeCell } from "@/ui/common/components/table/cell/MultiBadgeCell";
import {
  RowActions,
  RowActionColumn,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";

export const columns: IColumn<FacilityModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<FacilityModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<FacilityModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/facilities/edit",
  } as RowActionColumn<FacilityModel>,

  {
    title: "Name",
    field: "name",
    queryField: "name",
    type: "text",
    render: (options: ColumnComponentOptions<FacilityModel>) => {
      return (
        <InlineEditCellText
          record={options.record}
          column={options.column as InlineEditCellTextColumn<FacilityModel>}
          index={options.index}
          tableState={options.tableState}
        />
      );
    },
  } as InlineEditCellTextColumn<FacilityModel>,

  {
    title: "Organization",
    field: "organization_name",
    queryField: "organization_name",
  },

  {
    title: "Company",
    field: "company_name",
    queryField: "company_name",
  },

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
    render: (options: ColumnComponentOptions<FacilityModel>) => {
      return <>{options.record.address?.city || ""}</>;
    },
  },

  {
    title: "Phone",
    field: "phone",
    queryField: "phone",
  },

  {
    title: "Wafer Sizes",
    field: "meta_data",
    displayField: "meta_data",
    queryField: "meta_data.wafer_sizes",
    noSort: true,
    render: (options: ColumnComponentOptions<FacilityModel>) => {
      const waferSizeIds = options.record.meta_data?.wafer_sizes || [];
      const waferSizeLabels = waferSizeIds
        .map((id) => {
          const constant = assetConstants.wafer_size.find((c) => c.id === id);
          return constant?.label || "";
        })
        .filter((label) => label !== "");
      return (
        <MultiBadgeCell
          record={options.record}
          column={options.column}
          index={options.index}
          tableState={options.tableState}
          values={waferSizeLabels}
        />
      );
    },
  },
];
