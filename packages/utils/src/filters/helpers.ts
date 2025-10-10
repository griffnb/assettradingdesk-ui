import { IFilter } from "@/ui/common/components/types/filters";

// Pass a queryParam string, get a filter object
export function getFilterForQueryParam(
  filters: IFilter[],
  queryParam: string,
): IFilter | undefined {
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (!filter) {
      break;
    }

    if (typeof filter.field === "object") {
      if (filter.field.queryParam == queryParam) {
        return filter;
      }
    } else {
      if (filter.field == queryParam) {
        return filter;
      }
    }
  }
}

// For a filter object, return the field that we need to use in the query (ElasticSearch or Postgres)
export function getFieldForQuery(filter: IFilter, esQuery: boolean): string {
  if (typeof filter.field === "object") {
    /* TODO we dont have elastic search setup yet
    return esQuery
      ? filter.field.elasticsearchColumn
      : filter.field.postgresColumn;
      */
    return esQuery ? filter.field.postgresColumn : filter.field.postgresColumn;
  }

  return filter.field;
}

// For a filter object, return the field that we need to use in the query params
export function getQueryParamField(filter: IFilter): string {
  if (typeof filter.field === "object") {
    return filter.field.queryParam;
  }

  return filter.field;
}

export function getFilterForField(
  filters: IFilter[],
  field: string,
): IFilter | undefined {
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (!filter) {
      break;
    }

    if (typeof filter.field === "object") {
      if (filter.field.postgresColumn == field) {
        return filter;
      } else if (filter.field.elasticsearchColumn == field) {
        return filter;
      } else if (filter.field.queryParam == field) {
        return filter;
      }
    } else {
      if (filter.field == field) {
        return filter;
      }
    }
  }
}
