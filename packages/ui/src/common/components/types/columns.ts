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
  title: string; // the header of the column
  field: keyof T; // The object field name, only override this if you need custom query mechanisms
  displayField?: keyof T; // If the display field is different from the field, for standard types, you can just use the field + format and leave this off
  queryField: string | IField; // The field name to query on, needed for sorting and/or filtering, should be the field value normally
  filterValueField?: string | IField; // The field value to pull for filtering, only used for reporting
  filterTargetField?: string; // the filter target, only used for reporting
  csvHeaderName?: string; // If you want to define a different title in the CSV export
  csvPropertyName?: keyof T; // If you want to define a different property name in the CSV export
  render?: ColumnComponent<T>; // Used to override how the column is rendered, only need this for customizations outside of the default
  noSort?: boolean; // If you want to disable sorting on this column, mainly for if its a custom query or not standard database field
  class?: string; // If you want to add a className to the column
  headerClass?: string; // If you want to add a className to the header column
  total?: boolean; // If you want to show a total at the bottom of the column
  totalFormat?: TotalFormat; // If you want to format the total, only used if total is true
  hidden?: boolean; // If you want to hide the column by default
  fixed?: boolean; // If you want to fix the column so it cant be reordered.  Not normally used
  format?: TextFormat; // If you want to format the column, only used for standard types
  noExport?: boolean; // If you want to exclude this column from the CSV export
}

export interface TableCellProps<T extends object> {
  record: T;
  column: IColumn<T>;
  index: number;
  tableState: TableState<T>;
}

export type ColumnComponent<T extends object> = (
  options: ColumnComponentOptions<T>
) => ReactNode;

export type ColumnComponentOptions<T extends object> = {
  record: T;
  column: IColumn<T>;
  index: number;
  account?: AccountModel;
  tableState: TableState<T>;
};
