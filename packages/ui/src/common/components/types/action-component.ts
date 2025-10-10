import { ReactNode } from "react";

export type ActionComponent = (options: ActionComponentOptions) => ReactNode;

export type ActionComponentOptions = {
  modelType: string;
  appliedFilters: { [key: string]: string | string[] };
  selectedIds: { [key: string]: boolean };
  deselectAll: () => void;
  allRows: boolean;
  selectedCount: number;
  totalCount: number;
};
