import { DotPath, getValue } from "@/common_lib/utils/path";

export function getColumnValue<T>(record: T, field: keyof T | DotPath<T>): any {
  if (typeof field === "string" && field.includes(".")) {
    return getValue(record, field as DotPath<T>);
  } else {
    return record[field as keyof T];
  }
}
