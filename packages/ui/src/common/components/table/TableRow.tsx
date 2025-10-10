import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { TableColumn } from "./TableColumn";
import { TableSettings } from "./TableSettings";

const rowStyleVariants = cva(
  "cursor-pointer border-y border-gray-300 bg-white data-[checked=true]:bg-bg-brand-primary",
  {
    variants: {
      variant: {
        default: [
          "text-text-neutral-primary text-xs hover:bg-gray-100",
          `[&[data-row-selected="true"]]:!bg-gray-100`,
        ],
        custom: "",
        compact: [
          "hover:bg-bg-brand-primary",
          '[&[data-row-selected="true"]]:!bg-bg-brand-primary',
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TableRowProps<T extends object>
  extends TableSettings<T>,
    VariantProps<typeof rowStyleVariants> {
  record: T;
  rowIndex: number;
  tableState: TableState<T>;
  className?: string;
  setRowRef: (index: number) => (element: HTMLElement | null) => void;
}

/**
 *
 * @slot {"tr"} data-slot="tr"
 * @slot {"expand-row-td"} data-slot="expand-row-td"
 *
 *
 */

export const TableRow = observer(function TableRow<
  T extends object & { rowClass?: string },
>(rawProps: TableRowProps<T>) {
  const { variant, className, tableState, ...props } = rawProps;

  // Extract record ID to prevent unnecessary re-renders when record object changes but ID is same
  const recordId = props.record["id" as keyof T] as string;

  const checked = Boolean(tableState.checked_row_ids[recordId]);

  const isSelected = tableState.selected_row_id === recordId;

  const isExpanded = Boolean(tableState.expanded_row_ids[recordId]);

  // Memoize the row classes to prevent unnecessary recalculations
  const rowClasses = useMemo(
    () =>
      cn(
        rowStyleVariants({
          variant,
          className,
        }),
        { "cursor-pointer": props.rowClickAction ?? false },
        props.record.rowClass,
      ),
    [variant, className, props.rowClickAction, props.record.rowClass],
  );

  // Memoize the ref callback to prevent recreation on every render
  const rowRef = useMemo(
    () => props.setRowRef(props.rowIndex),
    [props.setRowRef, props.rowIndex],
  );

  return (
    <>
      <tr
        data-checked={checked}
        ref={rowRef}
        className={rowClasses}
        data-row-selected={isSelected}
        onClick={() => {
          props.rowClickAction?.(props.record, tableState);
        }}
        data-slot="tr"
      >
        {props.expandRows && (
          <td className="!w-[15px] py-1 text-center" data-slot="expand-row-td">
            {isExpanded ? (
              <i
                className="fa fa-minus cursor-pointer"
                onClick={() => {
                  tableState.collapseRow(recordId);
                }}
              ></i>
            ) : (
              <i
                className="fa fa-plus cursor-pointer"
                onClick={() => {
                  tableState.expandRow(recordId);
                }}
              ></i>
            )}
          </td>
        )}
        {props.selectRows && (
          <td
            data-slot="column-checkbox"
            className="!w-[15px] py-1 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              data-slot="column-checkbox-input"
              type="checkbox"
              className={cn([
                "size-4 rounded border-gray-300",
                "checked:text-blue-dark-500 checked:ring-1 checked:ring-blue-dark-600 checked:ring-offset-0",
                "hover:border-gray-400",
                "focus:ring-0 focus:checked:ring-1 focus:checked:ring-blue-dark-600 focus:checked:ring-offset-0",
              ])}
              checked={checked}
              onChange={(e) => {
                if (e.target.checked) {
                  tableState.checkRow(recordId);
                } else {
                  tableState.uncheckRow(recordId);
                }
              }}
            />
          </td>
        )}
        {tableState.columns.map((column, index) =>
          column.hidden ? null : (
            <TableColumn
              key={recordId + "-" + index}
              record={props.record}
              index={index}
              column={column}
              tableState={tableState}
            />
          ),
        )}
      </tr>

      {props.expandRows && isExpanded && (
        <tr>
          <td colSpan={tableState.columns.length + 2}>
            {props.expandedComponent &&
              props.expandedComponent({
                record: props.record,
                tableState: tableState,
              })}
          </td>
        </tr>
      )}
    </>
  );
});
