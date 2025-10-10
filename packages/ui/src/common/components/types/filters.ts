import { TableState } from "@/models/store/state/TableState";
import { IConstant } from "@/models/types/constants";
import { StoreKeys } from "@/models/types/store_keys";
import { BaseModelSelectProps } from "../fields/types";

export interface IField {
  queryParam: string;
  postgresColumn: string;
  elasticsearchColumn: string;
}

interface IBaseFilter {
  placeholder: string;
  field: string | IField; // If all three are the same, you can just pass a string
}

type IModelSearchSelectFilter = IBaseFilter &
  Omit<BaseModelSelectProps<any>, "handleChange" | "value"> & {
    type: "model-search-select" | "model-search-multi-select";
    modelSearchParam: string;
    modelSearchFilters?: { [key: string]: string | string[] };
    dynamicSearchFilters?: (tableState: TableState<any>) => {
      [key: string]: string | string[];
    };
  };

type IModelSelectFilter = IBaseFilter &
  Omit<BaseModelSelectProps<any>, "handleChange" | "value"> & {
    type: "model-select" | "model-multi-select";
    modelName: StoreKeys;
    modelDisplayField: string;
    modelSearchField: string;
    modelSearchFilters?: { [key: string]: string | string[] };
    customPath?: string;
    dynamicSearchFilters?: (tableState: TableState<any>) => {
      [key: string]: string | string[];
    };
  };

interface ISelectFilter extends IBaseFilter {
  type: "simple-select" | "multi-select";
  options: IConstant[];
}
interface ITagFilter extends IBaseFilter {
  type: "tag";
}

interface ITextFilter extends IBaseFilter {
  type: "text" | "email" | "number";
}

interface IHiddenFilter extends IBaseFilter {
  type: "hidden";
}

interface ICheckboxFilter extends IBaseFilter {
  type: "checkbox";
  uncheckedValue: string | number;
  checkedValue: string | number;
}

export interface IDateRangeFilter extends IBaseFilter {
  type: "date-range";
  field: `between:${string}` | "reporting_period" | IField;
  format: string;
  position?: "left" | "right";
}

export type IFilter =
  | IModelSearchSelectFilter
  | IModelSelectFilter
  | ISelectFilter
  | ITextFilter
  | ICheckboxFilter
  | IDateRangeFilter
  | IHiddenFilter
  | ITagFilter
  | IBlank
  | IGap;

export interface IGap extends IBaseFilter {
  type: "gap";
  label: string;
}
export interface IBlank extends IBaseFilter {
  type: "blank";
}

export interface IGroup {
  label: string;
  group_value: string;
  default?: boolean;
  gap?: boolean;
}

export interface IMathFilter {
  label: string;
  placeholder: string;
  field: string;
}
