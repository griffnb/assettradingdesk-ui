import { TableState } from "@/models/store/state/TableState";
import { IConstant } from "@/models/types/constants";
import { getQueryParamField } from "@/utils/filters/helpers";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { CountBadge } from "../badge/CountBadge";
import { Button } from "../buttons/Button";
import { CheckboxInput } from "../fields/CheckboxInput";
import { DateRangeInput } from "../fields/DateRangeInput";
import { ModelMultiSelectInput } from "../fields/ModelMultiSelectInput";
import { ModelSearchMultiSelectInput } from "../fields/ModelSearchMultiSelectInput";
import { ModelSearchSelectInput } from "../fields/ModelSearchSelectInput";
import { ModelSelectInput } from "../fields/ModelSelectInput";
import { MultiSelectInput } from "../fields/MultiSelectInput";
import { SelectInput } from "../fields/SelectInput";
import { TextInput } from "../fields/TextInput";
import { Tag, TagInputBase } from "../fields/base/TagInputBase";
import { IDateRangeFilter, IFilter } from "../types/filters";
interface TableFiltersProps<T extends object> {
  tableState: TableState<T>;
}
export const TableFilters = observer(
  <T extends object>(rawProps: TableFiltersProps<T>) => {
    const { tableState } = rawProps;

    const [filterValues, setFilterValues] = useState<{
      [key: string]: string | string[];
    }>(tableState.tableFilters);

    useEffect(() => {
      setFilterValues(tableState.tableFilters);
    }, [tableState.tableFilters]);

    const setFilterValue = (
      filter: IFilter,
      value:
        | string
        | number
        | string[]
        | number[]
        | (string | number)[]
        | undefined,
    ) => {
      if (value === undefined) {
        delete filterValues[getQueryParamField(filter)];
      } else if (typeof value === "number") {
        filterValues[getQueryParamField(filter)] = value.toString();
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          filterValues[getQueryParamField(filter)] = value.map((val) =>
            val.toString(),
          );
        } else {
          delete filterValues[getQueryParamField(filter)];
        }
      } else {
        filterValues[getQueryParamField(filter)] = value;
      }
      setFilterValues({ ...filterValues });
    };

    const applyFilters = () => {
      tableState.applyTableFilters({ ...filterValues });
    };
    const clearFilters = () => {
      tableState.applyTableFilters({});
    };

    const getDateRangeFilter = (filter: IDateRangeFilter) => {
      const value = filterValues[getQueryParamField(filter)];
      if (value === undefined) {
        return { from: undefined, to: undefined };
      }

      if (Array.isArray(value)) {
        // This does not support multiple values, has to be a string
        return { from: undefined, to: undefined };
      }

      const [from, to] = value.split("|");
      if (from && to) {
        return {
          from: dayjs(from, filter.format),
          to: dayjs(to, filter.format),
        };
      }
      return { from: undefined, to: undefined };
    };

    const filtersApplied = tableState.tableFilters["f"] == "1";

    return (
      <Popover className="relative">
        <PopoverButton
          as={Button}
          variant="tertiary"
          size="md"
          className="py-2"
        >
          <i className="fa fa-filter"></i>
          <span className="ml-2">Filters</span>
          <span className="mr-2 text-xs text-text-neutral-quaternary">
            ({tableState.totalCount} Total)
          </span>
          <i className="fa-solid fa-chevron-down fa-sm ml-4"></i>
          {filtersApplied && (
            <CountBadge
              color="primary"
              className="absolute -right-1 -top-1"
              size="md"
              count={Object.keys(tableState.tableFilters).length - 1}
            />
          )}
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel className="absolute left-0 z-popover mt-3 min-w-[900px] divide-y divide-gray-100 rounded-lg border-2 border-gray-300 bg-white shadow-sm sm:px-0">
            {({ close }) => (
              <>
                <div className="flex items-center justify-between pl-4 text-gray-900">
                  <h3 className="text-lg leading-5">Filter</h3>
                  <button
                    className="p-4"
                    onClick={() => {
                      close();
                    }}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 px-4 py-2">
                  {tableState.filters.map((filter, index) => {
                    switch (filter.type) {
                      case "blank":
                        return <div className="" key={index}></div>;
                      case "gap":
                        return (
                          <div
                            className="col-span-3 my-1 border-b px-3"
                            key={index}
                          >
                            {filter.label}
                          </div>
                        );
                      case "text":
                      case "email":
                      case "number":
                        return (
                          <TextInput
                            key={index}
                            value={
                              filterValues[getQueryParamField(filter)] as string
                            }
                            handleChange={(value: string) => {
                              setFilterValue(filter, value);
                            }}
                            {...filter}
                          />
                        );
                      case "checkbox":
                        return (
                          <CheckboxInput
                            key={index}
                            value={
                              filterValues[getQueryParamField(filter)] as
                                | string
                                | number
                            }
                            handleChange={(
                              value: string | number | boolean,
                            ) => {
                              if (value == filter.uncheckedValue) {
                                setFilterValue(filter, undefined);
                              } else {
                                setFilterValue(
                                  filter,
                                  value as string | number,
                                );
                              }
                            }}
                            {...filter}
                          />
                        );
                      case "simple-select":
                        return (
                          <SelectInput
                            key={index}
                            value={
                              filterValues[getQueryParamField(filter)] as string
                            }
                            handleChange={(value: IConstant | undefined) => {
                              setFilterValue(filter, value?.id);
                            }}
                            errorMessages={[]}
                            {...filter}
                          />
                        );
                      case "multi-select":
                        return (
                          <MultiSelectInput
                            key={index}
                            values={
                              filterValues[getQueryParamField(filter)] as (
                                | string
                                | number
                              )[]
                            }
                            handleChange={(values: IConstant[]) => {
                              setFilterValue(
                                filter,
                                values.map((v) => v.id),
                              );
                            }}
                            errorMessages={[]}
                            {...filter}
                          />
                        );
                      case "model-search-select": {
                        const filterProps = { ...filter };
                        if (filter.dynamicSearchFilters) {
                          filterProps.modelSearchFilters = {
                            ...filter.modelSearchFilters,
                            ...filter.dynamicSearchFilters(tableState),
                          };
                        }

                        return (
                          <ModelSearchSelectInput<any>
                            {...filterProps}
                            key={index}
                            value={
                              filterValues[getQueryParamField(filter)]
                                ? (filterValues[
                                    getQueryParamField(filter)
                                  ] as string)
                                : undefined
                            }
                            handleChange={(value: any | undefined) => {
                              if (value) {
                                setFilterValue(
                                  filter,
                                  value[filter.idField || "id"],
                                );
                              } else {
                                setFilterValue(filter, undefined);
                              }
                            }}
                            errorMessages={[]}
                          />
                        );
                      }
                      case "model-search-multi-select": {
                        const filterProps = { ...filter };
                        if (filter.dynamicSearchFilters) {
                          filterProps.modelSearchFilters = {
                            ...filter.modelSearchFilters,
                            ...filter.dynamicSearchFilters(tableState),
                          };
                        }
                        return (
                          <ModelSearchMultiSelectInput<any>
                            {...filterProps}
                            key={index}
                            values={
                              filterValues[
                                getQueryParamField(filter)
                              ] as string[]
                            }
                            handleChange={(values: any[]) => {
                              if (values.length > 0) {
                                setFilterValue(
                                  filter,
                                  values.map((v) => v[filter.idField || "id"]),
                                );
                              } else {
                                setFilterValue(filter, undefined);
                              }
                            }}
                            errorMessages={[]}
                          />
                        );
                      }
                      case "model-select": {
                        const filterProps = { ...filter };
                        if (filter.dynamicSearchFilters) {
                          filterProps.modelSearchFilters = {
                            ...filter.modelSearchFilters,
                            ...filter.dynamicSearchFilters(tableState),
                          };
                        }
                        return (
                          <ModelSelectInput<any>
                            {...filterProps}
                            key={index}
                            value={
                              filterValues[getQueryParamField(filter)]
                                ? (filterValues[
                                    getQueryParamField(filter)
                                  ] as string)
                                : undefined
                            }
                            handleChange={(value: any | undefined) => {
                              const key = filter.idField || "id";
                              setFilterValue(filter, value?.[key]);
                            }}
                            errorMessages={[]}
                          />
                        );
                      }
                      case "model-multi-select": {
                        const filterProps = { ...filter };
                        if (filter.dynamicSearchFilters) {
                          filterProps.modelSearchFilters = {
                            ...filter.modelSearchFilters,
                            ...filter.dynamicSearchFilters(tableState),
                          };
                        }
                        return (
                          <ModelMultiSelectInput<any>
                            {...filterProps}
                            key={index}
                            values={
                              filterValues[
                                getQueryParamField(filter)
                              ] as string[]
                            }
                            handleChange={(values: any[]) => {
                              if (values.length > 0) {
                                setFilterValue(
                                  filter,
                                  values.map((v) => v[filter.idField || "id"]),
                                );
                              } else {
                                setFilterValue(filter, undefined);
                              }
                            }}
                            errorMessages={[]}
                          />
                        );
                      }
                      case "date-range":
                        return (
                          <DateRangeInput
                            {...filter}
                            key={index}
                            start={getDateRangeFilter(filter).from}
                            end={getDateRangeFilter(filter).to}
                            handleChange={(start, end) => {
                              setFilterValue(
                                filter,
                                `${start.format(filter.format)}|${end.format(filter.format)}`,
                              );
                            }}
                          />
                        );
                      case "tag":
                        return (
                          <TagInputBase
                            {...filter}
                            key={index}
                            tags={
                              filterValues[
                                getQueryParamField(filter)
                              ] as string[]
                            }
                            handleChange={(values: Tag[]) => {
                              setFilterValue(filter, values);
                            }}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
                <div className="flex gap-x-2 p-4">
                  <Button
                    variant={"tertiary"}
                    onClick={() => {
                      clearFilters();
                      close();
                    }}
                    appendIcon={<i className="fa fa-close"></i>}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      applyFilters();
                      close();
                    }}
                    appendIcon={<i className="fa fa-check-square"></i>}
                  >
                    Apply
                  </Button>
                </div>
              </>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    );
  },
);

export default TableFilters;
