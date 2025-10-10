import { TableState } from "@/models/store/state/TableState";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
import { SkeletonBlock } from "../loading/SkeletonBlock";
import { TableRow } from "./TableRow";
import { TableSettings } from "./TableSettings";

interface TableBodyProps<T extends object> extends TableSettings<T> {
  tableState: TableState<T>;
  indexes: number[];
  setRowRef: (index: number) => (element: HTMLElement | null) => void;
  topPad: number;
  bottomPad: number;
  topSpacerStyle: CSSProperties;
  bottomSpacerStyle: CSSProperties;
  className?: string;
}
export const TableBody = observer(function TableBody<T extends object>(
  rawProps: TableBodyProps<T>,
) {
  const {
    tableState,
    className,
    indexes,
    setRowRef,
    topPad,
    bottomPad,
    topSpacerStyle,
    bottomSpacerStyle,
    // Extract TableSettings props to pass to TableRow
    selectRows,
    expandRows,
    expandedComponent,
    rowClickAction,
  } = rawProps;

  return (
    <tbody data-slot="tbody" className={className}>
      {tableState.rows.length === 0 && (
        <tr>
          <td
            colSpan={tableState.columns.length + 1}
            className="border-b bg-white px-5 py-4 text-left font-semibold"
            data-slot="no-data"
          >
            No data available
          </td>
        </tr>
      )}
      {/* top spacer row */}
      {topPad > 0 && (
        <tr aria-hidden="true">
          <td
            colSpan={
              tableState.columns.length +
              (selectRows ? 1 : 0) +
              (expandRows ? 1 : 0)
            }
            style={topSpacerStyle}
          >
            <div className="flex size-full flex-1 flex-col self-stretch p-3">
              <SkeletonBlock barHeight={10} gap={5} />
            </div>
          </td>
        </tr>
      )}

      {/* visible window */}
      {indexes.map((virtualIndex) => {
        const row = tableState.rows[virtualIndex] as T;
        return (
          <TableRow<T>
            key={(row["id" as keyof T] as string) || virtualIndex}
            record={row}
            rowIndex={virtualIndex}
            tableState={tableState}
            setRowRef={setRowRef}
            selectRows={selectRows}
            expandRows={expandRows}
            expandedComponent={expandedComponent}
            rowClickAction={rowClickAction}
            // Only pass the specific props that TableRow needs, not the entire props object
          />
        );
      })}

      {/* bottom spacer row */}
      {bottomPad > 0 && (
        <tr aria-hidden="true">
          <td
            colSpan={
              tableState.columns.length +
              (selectRows ? 1 : 0) +
              (expandRows ? 1 : 0)
            }
            style={bottomSpacerStyle}
          >
            <div className="flex size-full flex-1 flex-col self-stretch p-3">
              <SkeletonBlock barHeight={10} gap={5} />
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
});
