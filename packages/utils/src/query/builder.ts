import { IColumn } from "@/ui/common/components/types/columns";
import { IFilter } from "@/ui/common/components/types/filters";
import { ParsedUrlQuery } from "querystring";
import { NavigateFunction } from "react-router";
import { getFieldForQuery, getFilterForQueryParam } from "../filters/helpers";

export enum Direction {
  NONE,
  ASC,
  DESC,
}

export function setDefaults(
  params: { [key: string]: string | string[] },
  limit: number,
  order: string
) {
  if (!params["limit"]) {
    params["limit"] = limit.toString();
  }
  if (!params["order"]) {
    params["order"] = order;
  }
}

export function getSearchQuery(params: {
  [key: string]: string | string[];
}): string {
  if (params && params["q"]) {
    return params["q"] as string;
  }

  return "";
}

export function getReportPeriod(params: {
  [key: string]: string | string[];
}): string {
  if (params && params["reporting_period"]) {
    return params["reporting_period"] as string;
  }

  return "";
}

export function getLimit(
  params: { [key: string]: string | string[] },
  defaultLimit = 20
): number {
  if (params && params["limit"] && typeof params["limit"] == "string") {
    const limit = parseInt(params["limit"]);
    if (!isNaN(limit)) {
      return limit;
    }
  }

  return defaultLimit;
}

export function getStatusFilters(
  params: { [key: string]: string | string[] },
  defaultFilters = []
): number[] {
  if (params && params["status"]) {
    if (Array.isArray(params["status"])) {
      return params["status"].map((status) => parseInt(status));
    } else {
      return [parseInt(params["status"])];
    }
  }

  return defaultFilters;
}

export function getTableGroups(params: { [key: string]: string | string[] }): {
  [key: string]: string;
} {
  const groups: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(params)) {
    // Defaults

    // Report Groups
    if (key.startsWith("g_")) {
      groups[key] = value as string;
    }
  }
  return groups;
}

export function getTableMathFilters(params: {
  [key: string]: string | string[];
}): {
  [key: string]: string;
} {
  const mathFilters: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(params)) {
    // Defaults

    // Report Math Filters
    if (key.startsWith("f_")) {
      mathFilters[key] = value as string;
    }
  }
  return mathFilters;
}

export function getTableFilters(params: { [key: string]: string | string[] }): {
  [key: string]: string | string[];
} {
  const filters: { [key: string]: string | string[] } = {};

  for (const [key, value] of Object.entries(params)) {
    // Defaults

    // Report Groups
    if (key.startsWith("g_")) {
      continue;
    }
    // Report Math Filters
    if (key.startsWith("f_")) {
      continue;
    }

    switch (key) {
      case "limit":
        continue;
      case "q":
        continue;
      case "offset":
        continue;
      case "order":
        continue;
      case "status":
        continue;
      case "reporting_period":
        continue;
      default:
        filters[key] = value;
    }
  }
  return filters;
}

export function getPage(
  params: { [key: string]: string | string[] },
  limit: number,
  defaultPage = 1
): number {
  // Page

  if (params["offset"] && typeof params["offset"] == "string") {
    const offset = parseInt(params["offset"]);
    if (!isNaN(offset)) {
      const page = Math.ceil(offset / limit) + 1;
      return page;
    }
  }

  return defaultPage;
}

export function getSortColumnDirection<T extends object>(
  params: { [key: string]: string | string[] },
  columns: IColumn<T>[]
) {
  let sortColumn = 0;
  let sortDirection = 0;
  if (params["order"]) {
    const order = params["order"];

    if (typeof order == "string") {
      const orderParts = order.split(" ");
      if (orderParts.length != 2) {
        return { sortColumn, sortDirection };
      }

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        if (col && "field" in col && col.field == orderParts[0]) {
          sortColumn = i;
          break;
        }
      }

      sortDirection = orderParts[1] == "asc" ? Direction.ASC : Direction.DESC;
    }
  }

  return { sortColumn, sortDirection };
}

export function formatQuery(rawQuery: ParsedUrlQuery) {
  const query: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(rawQuery)) {
    query[key] = value;
  }

  return query;
}

export function queryToFilters(
  rawQuery: ParsedUrlQuery,
  defaultValues?: { [key: string]: any },
  reportingPeriod?: boolean
): { [key: string]: string | string[] } {
  const queryParams = formatQuery(rawQuery);

  if (!queryParams.f) {
    for (const key in defaultValues) {
      if (!queryParams[key]) {
        queryParams[key] = defaultValues[key];
      }
    }

    if (!queryParams.reporting_period && reportingPeriod) {
      queryParams.reporting_period =
        localStorage.getItem("reporting_period") || "";
    }
  }
  return queryParams;
}

export function buildQuery(
  filterValues: { [key: string]: string | string[] },
  filters: IFilter[]
) {
  const query: { [key: string]: any } = {};

  // Check whether we need to use ElasticSearch fields or not
  let esQuery = false;
  if ("q" in filterValues && filterValues["q"] !== "") {
    esQuery = true;
  }

  for (const [key, value] of Object.entries(filterValues)) {
    //Groups
    if (key.startsWith("g_")) {
      query[key] = value;
      continue;
    }

    //restrictions
    if (key.startsWith("r_")) {
      query[key] = value;
      continue;
    }

    //having filters
    if (key.startsWith("f_")) {
      query[key] = value;
      continue;
    }

    // Defaults
    switch (key) {
      // F is for telling the system that its filtering
      case "f":
        continue;
      case "limit":
        query[key] = value;
        continue;
      case "offset":
        query[key] = value;
        continue;
      case "order":
        query[key] = value;
        continue;
      case "q":
        query[key] = value;
        continue;
      case "status":
        query[key] = value;
        continue;
      case "reporting_period":
        query[key] = value;
        continue;
    }

    if (value === "") {
      continue;
    }

    // If theres no filters, just add the key value pair
    if (filters.length == 0) {
      query[key] = value;
      continue;
    }

    const filter = getFilterForQueryParam(filters, key);
    if (!filter) {
      // Custom Fields
      if (key.startsWith("_c:")) {
        query[key] = value;
        continue;
      }

      if (key.includes(":")) {
        query[key] = value;
        continue;
      }

      continue;
    }

    let queryValue = value;
    if (filter.type == "checkbox" && filter.checkedValue) {
      queryValue = filter.checkedValue.toString();
    }

    const queryField = getFieldForQuery(filter, esQuery);
    query[queryField] = queryValue;
  }

  return query;
}

export const cleanObject = <T extends object>(obj: T): Partial<T> => {
  return (Object.keys(obj) as (keyof T)[]).reduce((acc, key) => {
    const v = obj[key];
    if (v != null) acc[key] = v;
    return acc;
  }, {} as Partial<T>);
};



export const parseSearchParams = (searchParams: URLSearchParams): { [key: string]: string | string[] } => {
  const params: { [key: string]: string | string[] } = {};
  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value);
      } else {
        params[key] = [params[key] as string, value];
      }
    } else {
      params[key] = value;
    }
  });
  return params;
};


export function applyQueryFilters(
  nav: NavigateFunction,
  params: { [key: string]: string | string[] },
) {

  const searchString = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v) => searchString.append(key, v));
    } else {
      searchString.append(key, value);
    }
  }

  nav({
    search: searchString.toString(),
  });
}
