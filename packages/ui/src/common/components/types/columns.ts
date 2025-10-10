// This function takes a component and returns a new component that renders the original component with common props

import { AccountModel } from "@/models/models/account/model/AccountModel";
import { TableState } from "@/models/store/state/TableState";
import { ReactNode } from "react";
import { IField } from "./filters";

export type TextFormat =
  | "dollars"
  | "dollars_fractional"
  | "percent"
  | "number"
  | "decimal"
  | "boolean"
  | "date"
  | "datetime";

export type TotalFormat =
  | "sum"
  | "sum_dollars"
  | "average"
  | "average_dollars"
  | "average_percent";

export interface IColumn<T extends object> {
  title: string;
  field: keyof T; // The object field name
  displayField?: keyof T; // If the display field is different from the field
  queryField: string | IField; // The field name to query on, needed for sorting and/or filtering
  filterValueField?: string | IField; // The field value to pull for filtering, only used for reporting
  filterTargetField?: string; // the filter target, only used for reporting
  csvHeaderName?: string; // If you want to define a different title in the CSV export
  csvPropertyName?: keyof T; // If you want to define a different property name in the CSV export
  render?: ColumnComponent<T>; // Need this defined so glint shuts up about the signature, componentColumn already has column defined
  noSort?: boolean; // If you want to disable sorting on this column
  class?: string; // If you want to add a class to the column
  headerClass?: string; // If you want to add a class to the header column
  total?: boolean;
  totalFormat?: TotalFormat;
  hidden?: boolean;
  fixed?: boolean;
  format?: TextFormat;
  noExport?: boolean;
}

export interface TableCellProps<T extends object> {
  record: T;
  column: IColumn<T>;
  index: number;
  tableState: TableState<T>;
}

export interface AccountTableCellProps<T extends object> {
  record: T;
  column: IColumn<T>;
  index: number;
  account?: AccountModel;
  tableState: TableState<T>;
}

export type ColumnComponent<T extends object> = (
  options: ColumnComponentOptions<T>,
) => ReactNode;

export type ColumnComponentOptions<T extends object> = {
  record: T;
  column: IColumn<T>;
  index: number;
  account?: AccountModel;
  tableState: TableState<T>;
};
