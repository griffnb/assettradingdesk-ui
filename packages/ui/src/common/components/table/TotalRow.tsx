import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { formatNumber, formatPercent } from "@/utils/numbers";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "border-b border-t-2 border-gray-300 bg-blue-50 text-sm",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TotalRowProps<T extends object>
  extends VariantProps<typeof styleVariants> {
  tableState: TableState<T>;
  selectRows?: boolean; // Whether or not the table has a checkbox column
}

/**
 *
 * Total row
 *
 * @slot {"total-row"} data-slot="total-row"
 *
 */

export const TotalRow = observer(
  <T extends object>(props: TotalRowProps<T>) => {
    const { variant, tableState } = props;

    const totalColumns = useMemo(() => {
      const rows = tableState.rows;
      const columns = tableState.columns;

      const totals = new Map();
      const totalColumnFields = new Map();

      columns.forEach((column) => {
        if (column.total) {
          totalColumnFields.set(column.field, true);
          totals.set(column.field, 0);
        }
      });

      if (rows.length > 0) {
        rows.forEach((record) => {
          Array.from(totalColumnFields.keys()).forEach((name: string) => {
            const value = record[name as keyof T];
            if (value) {
              totals.set(name, totals.get(name) + parseFloat(value as any));
            }
          });
        });
      }

      const totalColumns = [];

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (!column || column.hidden) {
          continue;
        }
        let result = "";
        if (i === 0) {
          if (props.selectRows) {
            totalColumns.push("Totals");
          } else {
            result = "Totals";
          }
        } else {
          if (column.total) {
            switch (column.totalFormat) {
              case "sum":
                result = formatNumber(totals.get(column.field));
                break;
              case "sum_dollars":
                result = `$${formatNumber(totals.get(column.field), 2)}`;
                break;
              case "average":
                result = formatNumber(
                  totals.get(column.field) / rows.length,
                  2,
                );
                break;
              case "average_dollars":
                result = `$${formatNumber(
                  totals.get(column.field) / rows.length,
                  2,
                )}`;
                break;
              case "average_percent":
                result = formatPercent(
                  totals.get(column.field) / rows.length,
                  2,
                );
                break;
              default:
                result = formatNumber(totals.get(column.field));
                break;
            }
          }
        }

        totalColumns.push(result);
      }

      return totalColumns;
    }, [tableState.rows, tableState.columns, props.selectRows]);

    return (
      <>
        {tableState.rows && (
          <tr data-slot="total-row" className={cn(styleVariants({ variant }))}>
            {totalColumns.map((column, index) => (
              <td
                key={index}
                className={`px-3 py-2 ${column != "" && column != "Totals" ? "border-l text-right" : ""}`}
              >
                {column}
              </td>
            ))}
          </tr>
        )}
      </>
    );
  },
);
