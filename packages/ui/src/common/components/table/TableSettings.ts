import { TableState } from "@/models/store/state/TableState";
import { Status } from "@/models/types/constants";
import { ReactNode } from "react";
import { ExpandedComponent, MassAction } from "../types/mass-actions";

export interface TableSettings<T extends object> {
  statuses?: Status[];
  selectRows?: boolean;
  expandRows?: boolean; // Whether or not to expand rows
  expandedComponent?: ExpandedComponent<T>; // The component to display when a row is expanded
  rowClickAction?: (record: T, tableState: TableState<T>) => void; // Function to call when a row is clicked
  newComponent?: ReactNode | ((tableState: TableState<T>) => void); // The component to render when the "Create New" button is clicked
  pageSizes?: number[]; // The page sizes to display in the dropdown
  hideTotalRow?: boolean; // Whether or not to hide the total row
  hideFooter?: boolean; // Whether or not to hide the footer
  hideColumnSelector?: boolean; // Whether or not to hide the column selector
  tableReporting?: boolean; // Whether or not to display the table reporting
  tableSearch?: boolean; // Whether or not to display the table search
  tableExport?: boolean; // Whether or not to display the table export
  tableImport?: boolean; // Whether or not to display the table import
  actionComponents?: MassAction<T>[]; // The action components to display
  massActions?: MassAction<T>[]; // a component name
  className?: string;
  noCount?: boolean;
  noNav?: boolean;
  hideStatus?: boolean;
  hideFilters?: boolean; // Whether to hide the filters
  title?: string | ReactNode; // The title of the table
  infiniteScroll?: boolean; // Enable infinite scrolling
  rowHeight?: number; // Fixed row height for virtualization
  overscan?: number; // Number of extra rows to render for virtualization
}
