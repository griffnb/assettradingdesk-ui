import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { formatNumber } from "@/utils/numbers";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { Button } from "../buttons/Button";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "w-full border-t border-gray-200 text-sm bg-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TablePaginationProps<T extends object>
  extends VariantProps<typeof styleVariants> {
  tableState: TableState<T>;
  pageSizes?: number[]; // The page sizes to display in the dropdown
  className?: string;
  infiniteScroll?: boolean;
}
/**
 *
 *
 * @slot {"table-pagination"} data-slot="table-pagination"
 * @slot {"table-pagination-page-size"} data-slot="table-pagination-page-size"
 * @slot {"table-pagination-start-end"} data-slot="table-pagination-start-end"
 */

export const TablePagination = observer(
  <T extends object>(fullProps: TablePaginationProps<T>) => {
    const { className, variant, tableState, ...props } = fullProps;
    return (
      <div
        data-slot="table-pagination"
        className={cn(styleVariants({ variant, className }))}
      >
        <div className="flex items-center justify-end gap-x-2 px-6 py-3">
          {props.infiniteScroll ? (
            <div
              data-slot="table-pagination-total"
              className="flex h-10 flex-row items-center gap-2 overflow-hidden text-gray-400"
            >
              <span className="text-text-neutral-primary">Total Records:</span>
              <span>{formatNumber(tableState.totalCount)}</span>
            </div>
          ) : (
            <>
              <select
                onChange={(e) =>
                  tableState.applyLimit(parseInt(e.target.value))
                }
                data-slot="table-pagination-page-size"
                className="flex gap-2 rounded border border-gray-200 bg-white py-1 pl-2 focus:border-blue-500 focus:ring-blue-500"
                value={tableState.limit}
              >
                {props.pageSizes?.map((pageSize, index) => (
                  <option
                    key={index}
                    value={pageSize}
                    selected={pageSize == tableState.limit}
                  >
                    {pageSize}
                  </option>
                ))}
              </select>

              <div
                data-slot="table-pagination-start-end"
                className="text-gray-400"
              >
                {tableState.start} - {tableState.end}
                <span className="px-1">of</span>
                {tableState.totalCount}
              </div>
              <Button
                variant={"tertiary"}
                onClick={() =>
                  tableState.applyPage(
                    tableState.page > 1 ? tableState.page - 1 : 1,
                  )
                }
                disabled={tableState.page == 1}
              >
                <i className="fa fa-angle-left"></i>
              </Button>

              <Button
                variant={"tertiary"}
                onClick={() => tableState.applyPage(tableState.page + 1)}
                disabled={tableState.end >= tableState.totalCount}
              >
                <i className="fa fa-angle-right"></i>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  },
);
