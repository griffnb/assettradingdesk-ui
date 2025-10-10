import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { IColumn } from "../types/columns";
import { getFormattedField } from "./helpers";

const styleVariants = cva("text-nowrap px-3 py-2", {
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
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface TableColumnProps<T extends object>
  extends HTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof styleVariants> {
  record: T;
  column: IColumn<T>;
  tableState: TableState<T>;
  index: number;
}
export const TableColumn = observer(function TableColumn<T extends object>(
  fullProps: TableColumnProps<T>,
) {
  const { className, variant, record, index, column, tableState } = fullProps;

  let displayField: string = "";

  if ("displayField" in column && column.displayField) {
    displayField = getFormattedField(
      record[column.displayField] as string,
      column.format,
    );
  } else if ("field" in column) {
    displayField = getFormattedField(
      record[column.field] as string | number | dayjs.Dayjs,
      column.format,
    );
  }

  return (
    <td
      className={cn(styleVariants({ variant }), className, column.class)}
      title={displayField}
    >
      {column.render
        ? column.render({
            record: record,
            column: column,
            index: index,
            tableState: tableState,
          })
        : displayField}
    </td>
  );
});
