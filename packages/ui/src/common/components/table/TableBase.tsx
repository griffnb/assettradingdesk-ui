import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { TableSettings } from "./TableSettings";
import { TotalRow } from "./TotalRow";
import { useVirtualization } from "./virtual/useVirtual";

const styleVariants = cva(
  "text-xs w-full table-auto border-collapse text-left text-gray-700 border-b-2 border-gray-300 bg-white",
  {
    variants: {
      variant: {
        compact: "",
        default: "",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const wrapVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      compact: "px-4 bg-white",
      default: "",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TableBaseProps<T extends object>
  extends TableSettings<T>,
    VariantProps<typeof styleVariants> {
  tableState: TableState<T>;
  className?: string;
}

/**
 *
 * ## TableBase slots
 * @slot {"table-wrap"} data-slot="table-wrap"
 * @slot {"table"} data-slot="table"
 * @slot {"thead"} data-slot="thead"
 * @slot {"tbody"} data-slot="tbody"
 * @slot {"no-data"} data-slot="no-data"
 *
 * ## Table Row slots
 * @slot {"tr"} data-slot="tr"
 * @slot {"expand-row-td"} data-slot="expand-row-td"
 *
 *
 * ## Header Slots
 * @slot {"thead-tr"} data-slot="thead-tr"
 * @slot {"thead-checkbox-div"} data-slot="thead-checkbox-div"
 * @slot {"thead-checkbox"} data-slot="thead-checkbox"
 *
 *
 * ## Footer Slots
 * @slot {"tfoot"} data-slot="tfoot"
 * @slot {"total-row"} data-slot="total-row"
 * @slot {"table-pagination"} data-slot="table-pagination"
 * @slot {"table-pagination-page-size"} data-slot="table-pagination-page-size"
 * @slot {"table-pagination-start-end"} data-slot="table-pagination-start-end"
 */

export interface TableBaseVariants extends VariantProps<typeof styleVariants> {}

export const TableBase = observer(function TableBase<T extends object>(
  rawProps: TableBaseProps<T>,
) {
  const {
    variant,
    tableState,
    className,
    infiniteScroll,
    rowHeight,
    overscan,
    ...props
  } = rawProps;

  const loadMore = useCallback(() => {
    if (tableState.totalCount > tableState.data.length && !tableState.loading) {
      tableState.loadMoreData();
    }
  }, [tableState, infiniteScroll]);

  const {
    scrollRef,
    onScroll,
    topSpacerStyle,
    bottomSpacerStyle,
    topPad,
    bottomPad,
    visibleIndexes,
    setRowRef,
  } = useVirtualization({
    rows: tableState.rows.length,
    rowHeight: rowHeight || 43, // Use a fixed estimated height to avoid conflicts
    overscan: overscan || 10,
    enableDynamicHeight: true, // Let it measure actual heights
    estimatedRowHeight: rowHeight || 43, // Match the fixed height
    loadMore: infiniteScroll ? loadMore : undefined,
    scrollDebounceMs: 5,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [tableState.rows]);

  return (
    <>
      <div
        data-slot="table-wrap"
        className={cn(wrapVariants({ variant, className }))}
        ref={scrollRef}
        onScroll={onScroll}
      >
        <table data-slot="table" className={cn(styleVariants({ variant }))}>
          <thead data-slot="thead">
            <TableHeader<T>
              {...props}
              variant={variant}
              tableState={tableState}
            />
          </thead>
          <TableBody
            tableState={tableState}
            {...props}
            topSpacerStyle={topSpacerStyle}
            bottomSpacerStyle={bottomSpacerStyle}
            topPad={topPad}
            bottomPad={bottomPad}
            indexes={visibleIndexes}
            setRowRef={setRowRef}
          />

          <tfoot data-slot="tfoot">
            {!props.hideTotalRow && (
              <TotalRow tableState={tableState} {...props} />
            )}
          </tfoot>
        </table>
      </div>
      {props.pageSizes && props.pageSizes.length > 0 ? (
        <TablePagination
          pageSizes={props.pageSizes}
          infiniteScroll={infiniteScroll}
          tableState={tableState}
        />
      ) : tableState.totalCount > 0 ? (
        <div className="flex w-full flex-row items-center border-t border-gray-200 bg-white p-3 text-sm">
          <div
            data-slot="table-pagination-start-end"
            className="ml-auto text-text-neutral-primary"
          >
            Total Rows {tableState.totalCount}
          </div>
        </div>
      ) : null}
    </>
  );
});
