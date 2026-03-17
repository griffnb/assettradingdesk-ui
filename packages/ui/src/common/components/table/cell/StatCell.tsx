import { formatNumber } from "@/common_lib/utils/numbers";
import { observer } from "mobx-react-lite";
import { IColumn, TableCellProps } from "../../types/columns";
import { getColumnValue } from "./helpers";

interface StatCellProps<T extends object> extends TableCellProps<T> {
  column: IColumn<T>;
}

const StatCell = observer(<T extends object>(props: StatCellProps<T>) => {
  const getDisplayField = (record: T, column: IColumn<T>): string => {
    if ("displayField" in column && column.displayField) {
      return getFormattedField(
        getColumnValue(record, column.displayField) as string,
        column,
      );
    }
    if ("field" in column) {
      return getFormattedField(
        getColumnValue(record, column.field) as string,
        column,
      );
    }

    return "";
  };

  const getFormattedField = (value: string, column: IColumn<T>): string => {
    switch (column.format) {
      case "number":
        return formatNumber(parseFloat(value), 0);
      case "decimal":
        return formatNumber(parseFloat(value), 2);
      case "dollars":
        return `$${formatNumber(parseFloat(value), 2)}`;
      case "percent":
        return `${(parseFloat(value) * 100).toFixed(2)}%`;
      case "boolean":
        return parseInt(value) === 1 ? "Yes" : "No";
      default:
        return value;
    }
  };

  return <>{getDisplayField(props.record, props.column)}</>;
});

export default StatCell;
