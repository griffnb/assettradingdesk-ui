import { CacheService } from "@/common_lib/services/CacheService";
import { ServerService } from "@/common_lib/services/ServerService";
import { URLParams } from "@/common_lib/types/url";
import { Store } from "@/models/store/Store";
import { StoreKeys } from "@/models/types/store_keys";
import {
  buildQuery,
  Direction,
  getLimit,
  getPage,
  getReportPeriod,
  getSearchQuery,
  getSortColumnDirection,
  getStatusFilters,
  getTableFilters,
} from "@/utils/query/builder";
import { useEffect, useState } from "react";
import { IColumn } from "../../types/columns";
import { IFilter } from "../../types/filters";

export interface UseServerTableProps<T extends object> {
  modelType: StoreKeys; // The ember model name to query
  filters: IFilter[]; // The filters to display
  columns: IColumn<T>[]; // The columns to display
  // Query Params
  appliedFilters: URLParams;
  applyFilters: (appliedFilters: URLParams) => void; //Push to query params

  customPath?: string; // The custom path to use for the table
  storeRoute?: string; // overrides the store route

  noCount?: boolean;
  defaultLimit?: number;
  columnCacheKey?: string; // The cache key to use for the columns
}

const useServerTable = <T extends object>(props: UseServerTableProps<T>) => {
  const [statusFilters, setStatusFilters] = useState<number[]>([]);
  const [tableFilters, setTableFilters] = useState<{
    [key: string]: string | string[];
  }>({});
  const [limit, setLimit] = useState(0);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [reportPeriod, setReportPeriod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn<T>[]>(props.columns);
  const [columnsReady, setColumnsReady] = useState<boolean>(false);

  // Default limit

  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setLoading(true);
    const limitValue = getLimit(props.appliedFilters, props.defaultLimit);
    setLimit(limitValue);
    setPage(getPage(props.appliedFilters, limitValue));
    const { sortColumn, sortDirection } = getSortColumnDirection(
      props.appliedFilters,
      props.columns,
    );
    setSortColumn(sortColumn);

    setSortDirection(sortDirection);

    const col = props.columns[sortColumn];
    let order = "";

    if (col && sortDirection != Direction.NONE) {
      let fieldName = "";
      if (typeof col.queryField === "object") {
        if (tableSearchQuery !== "") {
          fieldName = col.queryField.elasticsearchColumn;
        } else {
          fieldName = col.queryField.postgresColumn;
        }
      } else {
        fieldName = col.queryField;
      }
      order = `${fieldName} ${sortDirection == Direction.ASC ? "asc" : "desc"}`;
    }

    setOrder(order);

    setStatusFilters(getStatusFilters(props.appliedFilters));
    setTableFilters(getTableFilters(props.appliedFilters));
    setTableSearchQuery(getSearchQuery(props.appliedFilters));
    const reportPeriod = getReportPeriod(props.appliedFilters);

    setReportPeriod(reportPeriod);

    const query = buildQuery(props.appliedFilters, props.filters);

    if (!props.storeRoute) {
      Store[props.modelType]
        .queryRecords(props.customPath || "", query)
        .then((response) => {
          if (response.data) {
            setData(response.data as T[]);
          }
          setLoading(false);
        });

      if (!props.noCount) {
        ServerService.callGet(
          Store[props.modelType].modelRoute,
          `${props.customPath ? props.customPath + "/" : ""}count`,
          { ...query, limit: "" },
        ).then((resp) => {
          if (resp.success && resp.data !== null) {
            setTotalCount(resp.data);
          }
        });
      }
    } else {
      ServerService.callGet(
        props.storeRoute,
        props.customPath || "",
        query,
      ).then((resp) => {
        if (resp.success && resp.data) {
          setData(Store[props.modelType].loadMany(resp.data) as T[]);
        }
        setLoading(false);
      });
      if (!props.noCount) {
        ServerService.callGet(
          props.storeRoute,
          `${props.customPath || ""}/count`,
          { ...query, limit: "" },
        ).then((resp) => {
          if (resp.success && resp.data !== null) {
            setTotalCount(resp.data);
          }
        });
      }
    }
  }, [
    props.appliedFilters,
    props.modelType,
    props.filters,
    props.columns,
    props.noCount,
    props.defaultLimit,
  ]);

  const columnCacheKey = props.columnCacheKey
    ? props.columnCacheKey
    : `columns_${props.modelType}`;

  useEffect(() => {
    const cols = CacheService.get<IColumn<T>[]>(columnCacheKey);
    if (cols) {
      const colMapByTitle = new Map<string, IColumn<T>>();
      const colPositionByTitle = new Map<string, number>();
      cols.forEach((col, i) => {
        colMapByTitle.set(col.title, col);
        colPositionByTitle.set(col.title, i);
      });

      let newCols: IColumn<T>[] = [];

      props.columns.forEach((col, i) => {
        const columnSetting = colMapByTitle.get(col.title);
        const columnPosition = colPositionByTitle.get(col.title);

        if (columnSetting && columnPosition !== undefined) {
          if (columnSetting.hidden) {
            newCols[columnPosition] = Object.assign({}, col, { hidden: true });
            return;
          }
          newCols[columnPosition] = col;
          return;
        }

        newCols[props.columns.length + i] = col;
      });
      newCols = newCols.filter((col) => col !== undefined);
      setColumns([...newCols]);
    } else {
      setColumns([...props.columns]);
    }
    setColumnsReady(true);
  }, [props.columns, props.modelType]);

  const applyColumns = (columns: IColumn<T>[], clear?: boolean) => {
    setColumns([...columns]);
    if (clear) {
      CacheService.delete(columnCacheKey);
    } else {
      CacheService.set(columnCacheKey, columns);
    }
  };

  const reloadData = () => {
    applyFilters(
      tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      page,
      limit,
      order,
    );
  };

  const applySort = (
    sortColumn: number,
    sortDirection: number,
    newTableFilters?: URLParams,
  ) => {
    setSortColumn(sortColumn);
    setSortDirection(sortDirection);
    setPage(1);
    // Update the query param
    const col = props.columns[sortColumn];
    if (!col) {
      return;
    }

    if (col.noSort) {
      return;
    }

    let order = "";
    if (sortDirection != Direction.NONE) {
      let fieldName = "";
      if (typeof col.queryField === "object") {
        if (tableSearchQuery !== "") {
          fieldName = col.queryField.elasticsearchColumn;
        } else {
          fieldName = col.queryField.postgresColumn;
        }
      } else {
        fieldName = col.queryField;
      }
      order = `${fieldName} ${sortDirection == Direction.ASC ? "asc" : "desc"}`;
    }

    setOrder(order);

    applyFilters(
      newTableFilters ? newTableFilters : tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const applyPage = (page: number) => {
    setPage(page);
    applyFilters(
      tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      page,
      limit,
      order,
    );
  };

  const applyLimit = (limit: number) => {
    setLimit(limit);
    setPage(1);
    applyFilters(
      tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const applyFilters = (
    tableFilters: { [key: string]: string | string[] },
    statusFilters: number[],
    tableSearchQuery: string,
    reportPeriod: string,
    page: number,
    limit: number,
    order: string,
  ) => {
    const combinedFilters = { ...tableFilters };
    if (statusFilters.length > 0) {
      combinedFilters["status"] = statusFilters.map((status: number) =>
        status.toString(),
      );
    }

    if (tableSearchQuery !== "") {
      combinedFilters["q"] = tableSearchQuery;
    } else {
      delete combinedFilters["q"];
    }
    if (page > 1) {
      combinedFilters["offset"] = ((page - 1) * limit).toString();
    }

    combinedFilters["limit"] = limit.toString();

    if (order !== "") {
      combinedFilters["order"] = order;
    } else {
      delete combinedFilters["order"];
    }

    if (reportPeriod !== "") {
      combinedFilters["reporting_period"] = reportPeriod;
    }

    props.applyFilters({ ...combinedFilters });
  };

  const applyTableFilters = (filters: { [key: string]: string | string[] }) => {
    setTableFilters(filters);
    setPage(1);
    applyFilters(
      filters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const applyStatusFilters = (statusFilters: number[]) => {
    setStatusFilters(statusFilters);
    setPage(1);
    applyFilters(
      tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const applySearchQuery = (query: string) => {
    setTableSearchQuery(query);
    setPage(1);
    applyFilters(
      tableFilters,
      statusFilters,
      query,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const applyReportPeriod = (reportPeriod: string) => {
    setReportPeriod(reportPeriod);
    setPage(1);
    localStorage.setItem("reporting_period", reportPeriod);
    applyFilters(
      tableFilters,
      statusFilters,
      tableSearchQuery,
      reportPeriod,
      1,
      limit,
      order,
    );
  };

  const exportData = async (all?: boolean) => {
    const query = buildQuery(props.appliedFilters, props.filters);
    let exportData = data;
    if (all) {
      if (!props.storeRoute) {
        const resp = await Store[props.modelType].queryRecords(
          props.customPath || "",
          { ...query, limit: "999999" },
        );

        if (resp.success && resp.data) {
          exportData = resp.data as T[];
        }
      } else {
        const resp = await ServerService.callGet(
          props.storeRoute,
          props.customPath || "",
          { ...query, limit: "999999" },
        );

        if (resp.success && resp.data) {
          exportData = resp.data as T[];
        }
      }
    }

    let csvContent = "";

    const exportableColumns = props.columns.filter(
      (col) => !("noExport" in col) || !col.noExport,
    );

    // Adding header row.
    csvContent +=
      exportableColumns
        .map((col) => {
          if ("csvHeaderName" in col && col.csvHeaderName != "") {
            return col.csvHeaderName;
          } else {
            return col.title;
          }
        })
        .join(",") + "\r\n";

    for (let i = 0; i < exportData.length; i++) {
      const row = exportData[i];
      if (!row) {
        continue;
      }

      const rowData = exportableColumns.map((column) => {
        let colName = "";
        if (column.csvPropertyName && column.csvPropertyName != "") {
          colName = column.csvPropertyName as string;
        } else if (column.displayField) {
          colName = column.displayField as string;
        } else if (column.field) {
          colName = column.field as string;
        }

        const val = row[colName as keyof T];

        if (val === null || val === undefined) {
          return "";
        }

        return '"' + val.toString().replace(/"/g, '""') + '"';
      });

      csvContent += rowData.join(",") + "\r\n";
    }

    // Create a Blob with the CSV content.
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set its properties for download.
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${props.modelType}_export.csv`;

    // Trigger the download by simulating a click on the anchor element.
    downloadLink.click();

    // Clean up the URL object.
    URL.revokeObjectURL(url);
  };

  return {
    data,
    columns,
    loading,
    totalCount,
    limit,
    page,
    sortColumn,
    sortDirection,
    tableFilters,
    statusFilters,
    tableSearchQuery,
    reportPeriod,
    applyColumns,
    applyPage,
    applyLimit,
    applySort,
    applyTableFilters,
    applyStatusFilters,
    applySearchQuery,
    applyReportPeriod,
    exportData,
    reloadData,
    columnsReady,
  };
};

export default useServerTable;
