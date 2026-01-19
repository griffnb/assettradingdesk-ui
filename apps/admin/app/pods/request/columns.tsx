import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
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
export const columns: IColumn<RequestModel>[] = [
  {
    title: "Status",
    field: "status",
    fixed: true,
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <RowActions
          {...options}
          column={options.column as RowActionColumn<RequestModel>}
        />
      );
    },
    queryField: "status",
    statuses: status,
    headerClass: "action-header",
    edit: "/requests/edit",
  } as RowActionColumn<RequestModel>,
  {
    title: "Model Name",
    field: "model_name",
    queryField: "model_name",
    displayField: "label",
    linkTo: "/requests/details/[id]",
    class: "max-w-64 px-3",
    paramMapping: { id: "id" },
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <LinkCell
          {...options}
          column={options.column as LinkCellColumn<RequestModel>}
          className="inline-block w-64 truncate"
        />
      );
    },
  } as LinkCellColumn<RequestModel>,
  {
    title: "Matches",
    field: "match_count",
    queryField: "match_count",
  },
  {
    title: "Price Range",
    field: "min_price",
    queryField: "min_price",
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <div>
          {options.record.min_price} - {options.record.max_price}
        </div>
      );
    },
  },
  {
    title: "Year Range",
    queryField: {
      queryParam: "min_year",
      postgresColumn: "meta_data.min_year",
      elasticsearchColumn: "meta_data.min_year",
    },
    field: "id",
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <div>
          {options.record.meta_data.min_year} -{" "}
          {options.record.meta_data.max_year}
        </div>
      );
    },
  },
  {
    title: "Install Statuses",
    field: "id",
    noSort: true,
    queryField: "install_statuses",
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <div className="flex flex-col gap-1">
          {options.record.meta_data.install_statusesFmt.map((status) => {
            return <div key={status}>{status}</div>;
          })}
        </div>
      );
    },
  },
  {
    title: "Operational Statuses",
    field: "id",
    noSort: true,
    queryField: "operational_statuses",
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return (
        <div className="flex flex-col gap-1">
          {options.record.meta_data.operational_statusesFmt.map((status) => {
            return <div key={status}>{status}</div>;
          })}
        </div>
      );
    },
  },
];
