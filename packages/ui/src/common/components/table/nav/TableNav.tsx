import { Status } from "@/models/types/constants";

import { TableState } from "@/models/store/state/TableState";

import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

import {
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Button } from "../../buttons/Button";
import { MassAction } from "../../types/mass-actions";
import { ActionComponents } from "../ActionComponents";
import { TableFilters } from "../TableFilters";
import { TableStatusFilters } from "../TableStatusFilters";
import { ColumnSelector } from "./ColumnSelector";

const styleVariants = cva(
  "flex flex-row w-full items-center justify-between px-4 py-3 ",
  {
    variants: {
      variant: {
        compact: "bg-white",
        default: "bg-bg-neutral-quaternary",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TableNavProps<T extends object>
  extends VariantProps<typeof styleVariants> {
  tableState: TableState<T>;
  newComponent?: string | ReactNode | (() => void); // The component to render when the "Create New" button is clicked

  //Search filters
  tableSearch?: boolean; // Whether or not to display the table search

  //Status Filters
  statuses?: Status[]; // The status filters to display

  tableReporting?: boolean; // Whether or not to display the table reporting

  tableExport?: boolean; // Whether or not to display the table export
  tableImport?: boolean; // Whether or not to display the table import
  massActions?: MassAction<T>[]; // a component name

  actionComponents?: MassAction<T>[]; // The action components to display

  hideColumnSelector?: boolean;

  className?: string;
  hideStatus?: boolean;
  hideFilters?: boolean;
  title?: string | ReactNode; // The title to display in the nav
}

/**
 *
 * ## TableNav Slots
 *
 * @slot {"table-nav"} data-slot="table-nav"
 * @slot {"table-nav-left"} data-slot="table-nav-left"
 * @slot {"table-nav-right"} data-slot="table-nav-right"
 * @slot {"table-nav-action-components"} data-slot="action-components"
 * @slot {"table-nav-search"} data-slot="table-search"
 * @slot {"table-nav-reporting"} data-slot="table-reporting"
 *
 *
 */

export const TableNav = observer(
  <T extends object>(rawProps: TableNavProps<T>) => {
    const { variant, className, tableState, ...props } = rawProps;
    const [queryValue, setQueryValue] = useState(tableState.searchQuery || "");
    const [debouncedQueryValue, setDebouncedQueryValue] = useState<
      string | null
    >(null);
    const nav = useNavigate();

    // need this use effect cause if you debounce the parent function, it wont retain the filter/sort values
    useEffect(() => {
      if (debouncedQueryValue === null) return;
      tableState.applySearchQuery(debouncedQueryValue);
    }, [debouncedQueryValue]);
    // Debounce the callback. The search will be triggered after 500ms of inactivity.
    const debouncedSearch = useCallback(
      debounce((query: string) => {
        setDebouncedQueryValue(query);
      }, 500),
      []
    );

    if (Object.keys(tableState.checked_row_ids).length > 0) {
      return null;
    }

    return (
      <div
        className={cn(styleVariants({ variant, className }))}
        data-slot="table-nav"
      >
        <div
          data-slot="table-nav-left"
          className={clsx(
            "mt-0 flex flex-1 flex-row items-center justify-start gap-x-2 text-sm font-medium text-gray-700",
            {
              "mr-6": variant != "compact",
            }
          )}
        >
          {props.title && (
            <span
              data-section={props.title}
              className="whitespace-nowrap border-l border-border-neutral-primary pl-2 text-lg font-semibold text-text-neutral-secondary"
            >
              {props.title}
            </span>
          )}
          {variant === "compact" && <div className="flex flex-1"></div>}
          {props.newComponent && (
            <>
              {typeof props.newComponent === "string" ? (
                <Button
                  variant={"primary"}
                  onClick={() => nav(props.newComponent as string)}
                >
                  <i className="fa fa-add"></i>
                </Button>
              ) : typeof props.newComponent === "function" ? (
                <Button onClick={props.newComponent} variant={"primary"}>
                  <i className="fa fa-add"></i>
                </Button>
              ) : (
                isValidElement(props.newComponent) && props.newComponent
              )}
            </>
          )}
          {!props.hideStatus && props.statuses && (
            <TableStatusFilters
              statuses={props.statuses}
              tableState={tableState}
              variant={variant}
            />
          )}

          {props.tableSearch && (
            <div
              data-slot="table-nav-search"
              className="flex items-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm"
            >
              <label className="m-2 flex items-center justify-center text-gray-400">
                <i className="u u-search-lg text-xl"></i>
              </label>
              <input
                type="text"
                value={queryValue}
                placeholder="Table Search"
                className="flex flex-row rounded-lg border-none px-0 py-[8.5px] text-xs text-gray-700 !ring-0 placeholder:text-gray-500 disabled:text-gray-300"
                onChange={(e) => {
                  setQueryValue(e.target.value);
                  debouncedSearch(e.target.value);
                }}
              />
            </div>
          )}

          {!props.hideFilters &&
            tableState.filters &&
            tableState.filters.length > 0 && (
              <TableFilters tableState={tableState} />
            )}
          {variant !== "compact" && <div className="mr-auto"></div>}
          {props.actionComponents && (
            <>
              <ActionComponents
                actions={props.actionComponents || [() => <></>]}
                allRows={false}
                tableState={tableState}
              />
            </>
          )}
        </div>
        <div
          data-slot="table-nav-right"
          className="flex flex-row items-center gap-x-2"
        >
          {!props.hideColumnSelector && (
            <ColumnSelector tableState={tableState} position={"right"} />
          )}

          {props.tableExport && (
            <Button
              variant={"custom"}
              onClick={() => tableState.exportData(false)}
              prependIcon={
                <i className="u u-file-x-03 text-icon-neutral-secondary"></i>
              }
              className="border border-border-neutral-primary bg-white py-2 text-text-neutral-secondary shadow-sm"
            >
              Export
            </Button>
          )}
        </div>
      </div>
    );
  }
);
