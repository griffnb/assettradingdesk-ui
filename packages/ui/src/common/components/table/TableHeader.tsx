import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { Direction } from "@/utils/query/builder";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { TableSettings } from "./TableSettings";

const styleVariants = cva("", {
  variants: {
    variant: {
      default:
        "whitespace-nowrap bg-gray-50 text-sm tracking-wide border-b border-gray-300 sticky top-0 z-10",
      compact:
        "whitespace-nowrap bg-white text-sm tracking-wide border-y border-gray-300 sticky top-0 z-10",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const headerVariants = cva("", {
  variants: {
    variant: {
      default: "p-3 font-semibold text-xs text-text-neutral-tertiary",
      compact: "p-2 font-semibold text-xs text-text-neutral-tertiary",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TableHeaderProps<T extends object>
  extends TableSettings<T>,
    VariantProps<typeof styleVariants> {
  tableState: TableState<T>;
  className?: string;
}

/**
 *
 * Table header
 *
 * @slot {"thead-tr"} data-slot="thead-tr"
 * @slot {"thead-checkbox-div"} data-slot="thead-checkbox-div"
 * @slot {"thead-checkbox"} data-slot="thead-checkbox"
 *
 */

export const TableHeader = observer(
  <T extends object>(rawProps: TableHeaderProps<T>) => {
    const { variant, tableState, className, ...props } = rawProps;
    return (
      <tr
        data-slot="thead-tr"
        className={cn(styleVariants({ variant, className }))}
      >
        {props.expandRows && (
          <th
            scope="col"
            className={cn(headerVariants({ variant }), "!w-[15px] text-center")}
          ></th>
        )}
        {props.selectRows && (
          <th
            scope="col"
            className={cn(headerVariants({ variant }), "!w-[15px] text-center")}
          >
            <div data-slot="thead-checkbox-div" className="inline">
              <input
                data-slot="thead-checkbox"
                type="checkbox"
                className={cn([
                  `size-4 rounded border-gray-300`,
                  "hover:border-gray-400",
                  "focus:ring-0 focus:checked:ring-1 focus:checked:ring-blue-dark-600 focus:checked:ring-offset-0",
                  "checked:text-blue-dark-500 checked:ring-1 checked:ring-blue-dark-600 checked:ring-offset-0",
                ])}
                checked={tableState.allChecked}
                onChange={(e) => {
                  if (e.target.checked) {
                    tableState.checkAll();
                  } else {
                    tableState.uncheckAll();
                  }
                }}
              />
            </div>
          </th>
        )}

        {tableState.columns.map((column, index) =>
          column.hidden ? null : (
            <Fragment key={index}>
              {column.noSort ? (
                <th
                  scope="col"
                  className={cn(
                    headerVariants({ variant }),
                    column.headerClass,
                  )}
                >
                  {column.title}
                </th>
              ) : (
                <th
                  scope="col"
                  className={cn(
                    headerVariants({ variant }),
                    "cursor-pointer",
                    column.headerClass,
                  )}
                  onClick={() => tableState.toggleSort(index)}
                >
                  {column.title}

                  {tableState.sortColumn === index && (
                    <>
                      {tableState.sortDirection === Direction.ASC && (
                        <i className="fa fa-angle-up ml-3"></i>
                      )}
                      {tableState.sortDirection === Direction.DESC && (
                        <i className="fa fa-angle-down ml-3"></i>
                      )}
                    </>
                  )}
                </th>
              )}
            </Fragment>
          ),
        )}
      </tr>
    );
  },
);
