import { TableState } from "@/models/store/state/TableState";
import { ReactNode } from "react";

export type MassAction<T extends object> = (
  options: MassActionProps<T>,
) => ReactNode;

export type MassActionProps<T extends object> = {
  allRows: boolean;
  tableState: TableState<T>;
};

export type ExpandedComponent<T extends object> = (
  options: ExpandedComponentProps<T>,
) => ReactNode;

export type ExpandedComponentProps<T extends object> = {
  record: any;
  tableState: TableState<T>;
};
