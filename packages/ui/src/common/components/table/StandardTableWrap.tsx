import { TableState, TableStateProps } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { SelectAllNav } from "./nav/SelectAllNav";
import { TableNav } from "./nav/TableNav";
import { TableBase, TableBaseVariants } from "./TableBase";
import { TableSettings } from "./TableSettings";

export interface StandardTableWrapProps<T extends object>
  extends TableSettings<T>,
    TableStateProps<T>,
    TableBaseVariants {
  className?: string;
}

/**
 *
 * @example
 * [&_*[data-slot='thead-tr']]:border-t
 * [&_*[data-slot='table-wrap']]:overflow-x-auto
 *
 *
 * ## StandardTableWrap Slots
 * @slot {"loader"} data-slot="loader" data-[slot=loader]: [data-slot="loader"]:
 *
 *
 * ## TableNav Slots
 *
 * @slot {"table-nav"} data-slot="table-nav" [data-slot="table-nav"]:
 * @slot {"table-nav-left"} data-slot="table-nav-left" [data-slot="table-nav-left"]:
 * @slot {"table-nav-right"} data-slot="table-nav-right" [data-slot="table-nav-right"]:
 * @slot {"table-nav-action-components"} data-slot="action-components" [data-slot="action-components"]:
 * @slot {"table-nav-search"} data-slot="table-search" [data-slot="table-search"]:
 * @slot {"table-nav-reporting"} data-slot="table-reporting" [data-slot="table-reporting"]:
 *
 *
 * ## SelectAllNav Slots
 *
 * @slot {"table-selectall-nav"} data-slot="table-selectall-nav" [data-slot="table-selectall-nav"]:
 * @slot {"table-selectall-nav-action-components"} data-slot="table-selectall-nav-action-components" [data-slot="table-selectall-nav-action-components"]:
 * @slot {"table-selectall-nav-left"} data-slot="table-selectall-nav-left" [data-slot="table-selectall-nav-left"]:
 * @slot {"table-selectall-nav-right"} data-slot="table-selectall-nav-right" [data-slot="table-selectall-nav-right"]:
 *
 *
 * ## TableBase slots
 * @slot {"table-wrap"} data-slot="table-wrap" [data-slot="table-wrap"]:
 * @slot {"table"} data-slot="table" [data-slot="table"]:
 * @slot {"thead"} data-slot="thead" [data-slot="thead"]:
 * @slot {"tbody"} data-slot="tbody" [data-slot="tbody"]:
 * @slot {"no-data"} data-slot="no-data" [data-slot="no-data"]:
 *
 * ## Table Row slots
 * @slot {"tr"} data-slot="tr" [data-slot="tr"]:
 * @slot {"expand-row-td"} data-slot="expand-row-td" [data-slot="expand-row-td"]:
 *
 *
 * ## Header Slots
 * @slot {"thead-tr"} data-slot="thead-tr" [data-slot="thead-tr"]:
 * @slot {"thead-checkbox-div"} data-slot="thead-checkbox-div" [data-slot="thead-checkbox-div"]:
 * @slot {"thead-checkbox"} data-slot="thead-checkbox" [data-slot="thead-checkbox"]:
 *
 *
 * ## Footer Slots
 * @slot {"tfoot"} data-slot="tfoot" [data-slot="tfoot"]:
 * @slot {"total-row"} data-slot="total-row" [data-slot="total-row"]:
 * @slot {"table-pagination"} data-slot="table-pagination" [data-slot="table-pagination"]:
 * @slot {"table-pagination-page-size"} data-slot="table-pagination-page-size" [data-slot="table-pagination-page-size"]:
 * @slot {"table-pagination-start-end"} data-slot="table-pagination-start-end" [data-slot="table-pagination-start-end"]:
 *
 */

export const StandardTableWrap = observer(
  <T extends object>(rawProps: StandardTableWrapProps<T>) => {
    const {
      variant,
      className,
      pageSizes = [100, 500, 1000],
      ...props
    } = rawProps;
    const [tableState] = useState<TableState<T>>(
      () => new TableState<T>(props),
    );

    useEffect(() => {
      if (props.appliedFilters) {
        tableState.applyRouteFilters(props.appliedFilters);
      }
    }, [props.appliedFilters]);

    return (
      <div className={cn(className)}>
        {tableState.loading && (
          <div className="absolute z-modal-popover flex size-full flex-row items-center justify-center bg-gray-500/50">
            <i className="fa fa-spinner fa-spin text-7xl text-gray-800"></i>
          </div>
        )}
        <SelectAllNav {...props} tableState={tableState} />
        <TableNav {...props} tableState={tableState} />
        <TableBase<T>
          {...props}
          pageSizes={pageSizes}
          tableState={tableState}
          variant={variant}
        />
      </div>
    );
  },
);
