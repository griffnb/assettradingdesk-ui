import { formatNumber, getPrecision } from "@/utils/numbers";
import dayjs from "dayjs";
import { TextFormat } from "../types/columns";

export const getFormattedField = (
  value: string | number | dayjs.Dayjs,
  format: TextFormat | undefined,
): string => {
  switch (format) {
    case "number":
      return formatNumber(parseFloat(value?.toString() || "0"), 0);
    case "decimal":
      return formatNumber(parseFloat(value?.toString() || "0"), 2);
    case "dollars":
      return `$${formatNumber(parseFloat(value?.toString() || "0"), 2)}`;
    case "dollars_fractional":
      return `$${formatNumber(parseFloat(value?.toString() || "0"), getPrecision(value?.toString() || "0"))}`;
    case "percent":
      return `${(parseFloat(value?.toString() || "0") * 100).toFixed(2)}%`;
    case "boolean":
      return parseInt(value?.toString() || "0") === 1 ? "Yes" : "No";
    case "date":
      return dayjs.isDayjs(value)
        ? value.format("MM/DD/YYYY")
        : value
          ? value.toString()
          : "";
    case "datetime":
      return dayjs.isDayjs(value)
        ? value.format("MM/DD/YYYY h:mm A")
        : value
          ? value.toString()
          : "";
    default:
      return value != null ? value.toString() : "";
  }
};
