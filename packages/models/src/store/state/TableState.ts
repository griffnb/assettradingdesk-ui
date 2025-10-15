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
  getSearchQuery,
  getSortColumnDirection,
  getStatusFilters,
  getTableFilters,
} from "@/utils/query/builder";

import { getFilterForQueryParam } from "@/utils/filters/helpers";
import { flow, makeAutoObservable, toJS } from "mobx";
import { IColumn } from "../../../../ui/src/common/components/types/columns";
import { IFilter } from "../../../../ui/src/common/components/types/filters";

export interface TableStateProps<T extends object> {
  modelType?: StoreKeys; // The ember model name to query
  filters?: IFilter[]; // The filters to display
  columns: IColumn<T>[]; // The columns to display
  // Query Params
  appliedFilters?: URLParams;
  applyFilters?: (appliedFilters: URLParams) => void; //Push to query params

  customPath?: string; // The custom path to use for the table
  storeRoute?: string; // overrides the store route

  noCount?: boolean;
  defaultLimit?: number;
  columnCacheKey?: string; // The cache key to use for the columns
  mode?: "server" | "client"; // The mode to use for the table
  infiniteScroll?: boolean; // Use infinite scroll instead of pagination

  data?: T[]; // Initial data for client mode

  parent?: unknown; // The parent object, if any
}

export interface VirtualPage<T> {
  pageIndex: number;
  data: T[];
  hasNextPage: boolean;
}

export class TableState<T extends object> {
  expanded_row_ids: { [key: string]: boolean } = {};
  selected_row_id: string | null = null;
  checked_row_ids: { [key: string]: boolean } = {};
  data: T[] = [];

  parent: unknown = null;

  filtered_data: T[] = [];
  loading: boolean = false;
  modelType: StoreKeys;
  totalCount: number = 0;

  default_columns: IColumn<T>[] = [];
  applied_columns: IColumn<T>[] = [];
  virtualPages: VirtualPage<T>[] = [];
  isLoadingMore: boolean = false;
  sortColumn: number = 0;
  sortDirection: number = 0;

  globalFilter: string = "";
  filters: IFilter[] = [];
  limit: number = 0;
  order: string = "";
  page: number = 1;
  offset: number = 0;
  searchQuery: string = "";
  columnCacheKey: string = "";

  appliedFilters: URLParams = {};

  statusFilters: number[] = [];
  tableFilters: URLParams = {};

  mode: "server" | "client" = "server";
  customPath: string | null = null;
  storeRoute: string | null = null;
  noCount: boolean | null = null;

  infiniteScroll: boolean = false;

  _applyFilters: ((params: URLParams) => void) | null = null;

  setData(data: T[]) {
    this.data = data;
    this.filtered_data = data;
  }

  addFilter(key: string, value: string) {
    const current = (this.tableFilters[key] as string[] | string) || [];
    let newFilters: string[] = [];

    if (Array.isArray(current)) {
      if (!current.includes(value.toString())) {
        newFilters = [...current, value.toString()];
      }
    } else {
      newFilters = [current, value.toString()];
    }

    const newTableFilters = {
      ...this.tableFilters,
      [key]: newFilters.length > 0 ? newFilters : [],
    };
    this.applyTableFilters(newTableFilters);
  }

  removeFilter(key: string, value: string) {
    const current = (this.tableFilters[key] as string[] | string) || [];
    let newFilters: string[] = [];

    if (Array.isArray(current)) {
      if (current.includes(value.toString())) {
        newFilters = current.filter((v) => v !== value.toString());
      }
    } else {
      if (current == value.toString()) {
        newFilters = [];
      } else {
        newFilters = [current];
      }
    }

    const newTableFilters = {
      ...this.tableFilters,
      [key]: newFilters.length > 0 ? newFilters : [],
    };
    this.applyTableFilters(newTableFilters);
  }

  applyTableFilters(params: URLParams) {
    this.tableFilters = params;
    this.updateAppliedFilters();
  }

  applySort = (
    sortColumn: number,
    sortDirection: number,
    newTableFilters?: URLParams,
  ) => {
    // Update the query param
    const col = this.columns[sortColumn];
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
        if (this.searchQuery !== "") {
          fieldName = col.queryField.elasticsearchColumn;
        } else {
          fieldName = col.queryField.postgresColumn;
        }
      } else {
        fieldName = col.queryField;
      }
      order = `${fieldName} ${sortDirection == Direction.ASC ? "asc" : "desc"}`;
    }

    this.order = order;

    this.sortColumn = sortColumn;
    this.sortDirection = sortDirection;
    this.page = 1;
    this.offset = 0;
    if (newTableFilters) {
      this.tableFilters = newTableFilters;
    }

    this.updateAppliedFilters();
  };

  toggleSort = (columnIndex: number) => {
    if (this.sortColumn != columnIndex) {
      this.applySort(columnIndex, Direction.ASC);
      return;
    } else {
      let sortDirection = this.sortDirection;
      sortDirection++;
      if (sortDirection > Direction.DESC) {
        sortDirection = Direction.NONE;
      }
      this.applySort(columnIndex, sortDirection);
      return;
    }
  };

  unselectRow() {
    this.selected_row_id = null;
  }

  selectRow(id: string) {
    this.selected_row_id = id;
  }

  applyRouteFilters(params: URLParams) {
    // Check if the incoming params are different from current applied filters
    const noChange = deepEqual(this.appliedFilters, params);
    if (!noChange) {
      console.log("APPLYING ROUTE FILTERS", params);
      this.loadFilters(params);
      this.reloadData();
    }
  }

  updateAppliedFilters(pageOnly?: boolean) {
    if (this.mode === "client") {
      this.applyLocalFilters();
      return;
    }

    this.appliedFilters = this.getCombinedFilters();

    if (this._applyFilters) {
      this._applyFilters(this.appliedFilters);
    }

    if (!pageOnly || !this.virtualPages[this.page - 1]) {
      this.loadServerData(this.page);
    }
  }

  applySearchQuery(query: string) {
    this.searchQuery = query;
    this.updateAppliedFilters();
  }

  applyStatusFilters(statusFilters: number[]) {
    this.statusFilters = statusFilters;
    this.updateAppliedFilters();
  }

  loadFilters(appliedFilters: URLParams) {
    this.appliedFilters = appliedFilters;
    this.statusFilters = getStatusFilters(appliedFilters);
    this.tableFilters = getTableFilters(appliedFilters);

    console.log(
      "Loaded Filters",
      toJS(this.statusFilters),
      toJS(this.tableFilters),
    );

    this.limit = getLimit(appliedFilters, this.limit);
    this.page = getPage(this.appliedFilters, this.limit);
    this.searchQuery = getSearchQuery(appliedFilters);
  }

  applyPage(page: number) {
    this.page = page;
    this.offset = (page - 1) * this.limit;
    this.updateAppliedFilters(true);
  }

  applyLimit(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.updateAppliedFilters();
  }

  get start() {
    return this.offset + 1;
  }

  get end() {
    if (this.infiniteScroll) {
      return this.rows.length;
    }
    return this.offset + this.limit;
  }

  loadServerData = flow(function* (this: TableState<T>, pageToLoad?: number) {
    if (!this.isLoadingMore) {
      this.loading = true;
    }

    let query: URLParams = {};
    if (pageToLoad && pageToLoad > 1) {
      query = buildQuery(
        {
          ...this.appliedFilters,
          offset: ((pageToLoad - 1) * this.limit).toString(),
        },
        this.filters,
      );
    } else {
      query = buildQuery(this.appliedFilters, this.filters);
    }

    try {
      if (!this.storeRoute) {
        const response = yield Store[this.modelType].queryRecords(
          this.customPath || "",
          query,
        );

        if (response.data) {
          if (pageToLoad && pageToLoad > 1) {
            // Add to virtual pages for infinite scrolling
            const newPage: VirtualPage<T> = {
              pageIndex: pageToLoad,
              data: response.data as T[],
              hasNextPage: (response.data as T[]).length === this.limit,
            };

            this.virtualPages.push(newPage);
            if (this.infiniteScroll) {
              this.data.push(...response.data);
            }
          } else {
            this.data = response.data as T[];
            if (this.mode === "client") {
              this.filtered_data = this.data;
            }
            this.virtualPages = [
              {
                pageIndex: 1,
                data: response.data as T[],
                hasNextPage: (response.data as T[]).length === this.limit,
              },
            ];
          }
        }
      } else {
        const response = yield ServerService.callGet(
          this.storeRoute,
          this.customPath || "",
          query,
        );
        if (response.success && response.data) {
          const loadedData = Store[this.modelType].loadMany(
            response.data,
          ) as T[];
          if (pageToLoad && pageToLoad > 1) {
            const newPage: VirtualPage<T> = {
              pageIndex: pageToLoad,
              data: loadedData,
              hasNextPage: loadedData.length === this.limit,
            };
            this.virtualPages.push(newPage);
            if (this.infiniteScroll) {
              this.data.push(...loadedData);
            }
          } else {
            this.data = loadedData;

            this.virtualPages = [
              {
                pageIndex: 1,
                data: loadedData,
                hasNextPage: loadedData.length === this.limit,
              },
            ];
          }
        }
      }

      // Load count if needed
      if (!this.noCount && (!pageToLoad || pageToLoad === 1)) {
        const countPath = this.storeRoute
          ? `${this.customPath || ""}/count`
          : `${this.customPath ? this.customPath + "/" : ""}count`;

        const countResponse = this.storeRoute
          ? yield ServerService.callGet(this.storeRoute, countPath, query)
          : yield ServerService.callGet(
              Store[this.modelType].modelRoute,
              countPath,
              query,
            );

        if (countResponse.success && countResponse.data) {
          this.totalCount = countResponse.data;
        }
      }
    } catch (error) {
      console.error("Error loading server data:", error);
    } finally {
      if (this.loading) {
        this.loading = false;
      }
      if (this.isLoadingMore) {
        this.isLoadingMore = false;
      }
    }
  });

  getCombinedFilters() {
    const combinedFilters = { ...this.tableFilters };
    if (this.statusFilters.length > 0) {
      combinedFilters["status"] = this.statusFilters.map((status: number) =>
        status.toString(),
      );
    }

    if (this.searchQuery !== "") {
      combinedFilters["q"] = this.searchQuery;
    }

    if (this.page > 1) {
      combinedFilters["offset"] = this.offset.toString();
    }

    combinedFilters["limit"] = this.limit.toString();

    if (this.order !== "") {
      combinedFilters["order"] = this.order;
    }

    return combinedFilters;
  }

  reloadData = () => {
    if (this.mode == "client") {
      this.applyLocalFilters();
      return;
    }

    this.loadServerData();
  };

  applyColumns(columns: IColumn<T>[], clear?: boolean) {
    this.applied_columns = columns;
    if (clear) {
      CacheService.delete(`columns_${this.columnCacheKey}`);
    } else {
      CacheService.set(`columns_${this.columnCacheKey}`, columns);
    }
  }

  get columns() {
    if (this.applied_columns.length > 0) {
      return this.applied_columns;
    }

    const cachedCols = CacheService.get<IColumn<T>[]>(
      `columns_${this.columnCacheKey}`,
    );

    if (cachedCols) {
      const colMapByTitle = new Map<string, IColumn<T>>();
      const colPositionByTitle = new Map<string, number>();
      cachedCols.forEach((col, i) => {
        colMapByTitle.set(col.title, col);
        colPositionByTitle.set(col.title, i);
      });

      let newCols: IColumn<T>[] = [];
      this.default_columns.forEach((rawCol, i) => {
        const col = { ...rawCol };
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
        newCols[this.default_columns.length + i] = col;
      });
      newCols = newCols.filter((col) => col !== undefined);

      this.applied_columns = newCols;
      return newCols;
    } else {
      return this.default_columns;
    }
  }

  get rows() {
    if (this.mode === "client") {
      return this.filtered_data;
    }

    if (this.infiniteScroll) {
      return this.data;
    }

    const currentPage = this.virtualPages[this.page - 1];

    if (currentPage) {
      return currentPage.data;
    }

    return [];
  }

  loadMoreData() {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;
    const lastPage = this.virtualPages[this.virtualPages.length - 1];
    let pageIndex = 0;
    if (lastPage) {
      pageIndex = lastPage.pageIndex;
    }

    return this.loadServerData(pageIndex + 1);
  }

  checkRow(id: string) {
    this.checked_row_ids[id] = true;
  }

  uncheckRow(id: string) {
    delete this.checked_row_ids[id];
  }

  toggleRowCheck(id: string) {
    if (this.checked_row_ids[id]) {
      this.uncheckRow(id);
    } else {
      this.checkRow(id);
    }
  }

  get allChecked() {
    return (
      this.rows.length > 0 &&
      this.rows.every(
        (row) =>
          this.checked_row_ids[(row["id" as keyof T] as number).toString()],
      )
    );
  }

  checkAll() {
    this.rows.forEach((row) => {
      this.checkRow((row["id" as keyof T] as number).toString());
    });
  }

  uncheckAll() {
    this.rows.forEach((row) => {
      this.uncheckRow((row["id" as keyof T] as number).toString());
    });
  }

  expandRow(id: string) {
    this.expanded_row_ids[id] = true;
  }

  collapseRow(id: string) {
    delete this.expanded_row_ids[id];
  }

  sortLocal(data: T[]): T[] {
    if (
      this.sortDirection === Direction.NONE ||
      !this.columns[this.sortColumn]
    ) {
      return data;
    }

    const col = this.columns[this.sortColumn];
    if (!col || col.noSort) {
      return data;
    }

    let fieldName = "";
    if (typeof col.queryField === "object") {
      // For local sorting, we'll use the postgres column as the default
      fieldName = col.queryField.postgresColumn;
    } else if (col.queryField) {
      fieldName = col.queryField;
    } else if (col.field) {
      fieldName = col.field as string;
    } else {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = a[fieldName as keyof T];
      const bVal = b[fieldName as keyof T];

      // Handle null/undefined values
      if (aVal === null || aVal === undefined) {
        if (bVal === null || bVal === undefined) return 0;
        return this.sortDirection === Direction.ASC ? -1 : 1;
      }
      if (bVal === null || bVal === undefined) {
        return this.sortDirection === Direction.ASC ? 1 : -1;
      }

      // Handle different data types
      if (typeof aVal === "string" && typeof bVal === "string") {
        const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
        return this.sortDirection === Direction.ASC ? comparison : -comparison;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return this.sortDirection === Direction.ASC ? aVal - bVal : bVal - aVal;
      }

      // For dates or other comparable types
      if (aVal < bVal) {
        return this.sortDirection === Direction.ASC ? -1 : 1;
      }
      if (aVal > bVal) {
        return this.sortDirection === Direction.ASC ? 1 : -1;
      }
      return 0;
    });
  }

  filterLocal(data: T[]): T[] {
    if (!this.tableFilters || Object.keys(this.tableFilters).length === 0) {
      return data;
    }

    const filterValues: { [key: string]: string | string[] } = {};

    for (const [field, filterValue] of Object.entries(this.tableFilters)) {
      const filter = getFilterForQueryParam(this.filters, field);
      if (!filter) {
        continue;
      }

      // Handle array of filter values
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) continue;

        const stringValues = filterValue.map((v) => v.toString().toLowerCase());

        filterValues[field] = stringValues;
        continue;
      } else {
        // Handle single filter value
        const filterValueString = filterValue.toString().toLowerCase();
        filterValues[field] = filterValueString;
      }
    }

    return data.filter((row) => {
      for (const [field, filterValue] of Object.entries(filterValues)) {
        const rowValue = row[field as keyof T];

        // Field doesnt exist
        if (rowValue === undefined) {
          continue;
        }

        const rowValueString = rowValue?.toString().toLowerCase() || "";

        if (Array.isArray(filterValue)) {
          if (!filterValue.includes(rowValueString)) {
            return false;
          }
        } else {
          if (rowValueString !== filterValue) {
            return false;
          }
        }
      }
      return true;
    });
  }

  filterStatusLocal(data: T[]): T[] {
    if (!this.statusFilters || this.statusFilters.length === 0) {
      return data;
    }

    return data.filter((row) => {
      const statusValue = row["status" as keyof T];
      if (statusValue === undefined || statusValue === null) {
        return false;
      }
      return this.statusFilters.includes(statusValue as number);
    });
  }

  filterQuery(data: T[]): T[] {
    if (!this.searchQuery || this.searchQuery.trim() === "") {
      return data;
    }

    const query = this.searchQuery.toLowerCase().trim();

    return data.filter((row) => {
      // Search through all searchable columns
      for (const col of this.columns) {
        const fieldValue = row[col.field as keyof T];

        if (fieldValue && fieldValue.toString().toLowerCase().includes(query)) {
          return true;
        }
      }
      return false;
    });
  }

  applyLocalFilters(): void {
    let filteredData = [...this.data];

    // Apply field-based filters first
    filteredData = this.filterLocal(filteredData);

    // Apply status filters
    filteredData = this.filterStatusLocal(filteredData);

    // Apply search query filter
    filteredData = this.filterQuery(filteredData);

    // Apply sorting
    filteredData = this.sortLocal(filteredData);

    // Update the filtered data
    this.filtered_data = filteredData;

    // Update total count for local mode
    if (this.mode === "client") {
      this.totalCount = filteredData.length;
    }
  }

  async exportData(all?: boolean) {
    const query = buildQuery(this.appliedFilters, this.filters);
    let exportData = this.data;
    if (all) {
      if (!this.storeRoute) {
        const resp = await Store[this.modelType].queryRecords(
          this.customPath || "",
          { ...query, limit: "999999" },
        );

        if (resp.success && resp.data) {
          exportData = resp.data as T[];
        }
      } else {
        const resp = await ServerService.callGet(
          this.storeRoute,
          this.customPath || "",
          { ...query, limit: "999999" },
        );

        if (resp.success && resp.data) {
          exportData = resp.data as T[];
        }
      }
    }

    let csvContent = "";

    const exportableColumns = this.columns.filter(
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
    downloadLink.download = `${this.modelType}_export.csv`;

    // Trigger the download by simulating a click on the anchor element.
    downloadLink.click();

    // Clean up the URL object.
    URL.revokeObjectURL(url);
  }

  constructor(props: TableStateProps<T>) {
    makeAutoObservable(this);
    this.mode = props.mode || "server";
    if (props.appliedFilters) {
      this.loadFilters(props.appliedFilters);
    }
    this.limit = props.defaultLimit || 100;
    this.filters = props.filters || [];
    this.appliedFilters = props.appliedFilters || {};
    this.data = props.data || [];
    this.filtered_data = props.data || [];
    this.parent = props.parent || null;

    if (props.appliedFilters) {
      const { sortColumn, sortDirection } = getSortColumnDirection(
        props.appliedFilters,
        props.columns,
      );
      this.sortColumn = sortColumn;
      this.sortDirection = sortDirection;
      const limit = getLimit(props.appliedFilters, props.defaultLimit);
      this.limit = limit;
      const page = getPage(props.appliedFilters, limit);
      this.page = page;
      this.offset = (page - 1) * limit;
      this.searchQuery = getSearchQuery(props.appliedFilters);
      this.statusFilters = getStatusFilters(props.appliedFilters);
      this.tableFilters = getTableFilters(props.appliedFilters);
    }

    this.modelType = props.modelType as StoreKeys;
    this.customPath = props.customPath || null;
    this.storeRoute = props.storeRoute || null;
    this.noCount = props.noCount || null;
    this._applyFilters = props.applyFilters || null;
    this.default_columns = props.columns;
    this.infiniteScroll = props.infiniteScroll || false;
    this.columnCacheKey = props.columnCacheKey || `columns_${props.modelType}`;

    if (this.mode === "server") {
      this.loadServerData();
    } else {
      // For client mode, apply local filters after data is loaded
      this.applyLocalFilters();
    }
  }
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && Object.prototype.toString.call(v) === "[object Object]";

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return a !== 0 || 1 / (a as number) === 1 / (b as number); // -0
  if (a !== a && b !== b) return true; // NaN

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    const bEntries = Array.from(b.entries());
    const used = new Set<number>();
    for (const [ka, va] of a) {
      let matched = false;
      for (const [i, pair] of bEntries.entries()) {
        if (used.has(i)) continue;
        const [kb, vb] = pair;
        if (deepEqual(ka, kb) && deepEqual(va, vb)) {
          used.add(i);
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return true;
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const ka = Object.keys(a),
      kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!deepEqual((a as any)[k], (b as any)[k])) return false;
    }
    return true;
  }

  return Object.is(a, b);
}
