import { LayerService } from "@/common_lib/services/LayerService";
import { status } from "@/models/models/request/_constants/status";
import { RequestModel } from "@/models/models/request/model/RequestModel";
import {
  RowActionColumn,
  RowActions,
} from "@/ui/common/components/table/cell/RowActions";
import {
  ColumnComponentOptions,
  IColumn,
} from "@/ui/common/components/types/columns";
import {
  RequestFormModal,
  RequestFormModalId,
} from "./components/RequestFormModal";
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
    edit: (record: RequestModel, reloadData: () => void) => {
      LayerService.add(RequestFormModalId, RequestFormModal, {
        record,
        onSave: () => {
          LayerService.remove(RequestFormModalId);
          reloadData();
        },
        onCancel: () => {
          LayerService.remove(RequestFormModalId);
        },
      });
    },
  } as RowActionColumn<RequestModel>,
  {
    title: "Make/Model",
    field: "label",
    queryField: "make_model",
  },
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
      return options.record.meta_data.install_statusesFmt;
    },
  },
  {
    title: "Operational Statuses",
    field: "id",
    noSort: true,
    queryField: "operational_statuses",
    render: (options: ColumnComponentOptions<RequestModel>) => {
      return options.record.meta_data.operational_statusesFmt;
    },
  },
];
