import { StoreKeys } from "../types/store_keys";

export interface AttrOptions {
  readOnly?: boolean;
  saveFormat?: string;
  defaultValue?: any;
  stat?: boolean;
  nullable?: boolean;
  noSchemaValidation?: boolean;
  classType?: any;
  storeKey?: StoreKeys;
}
interface Attribute {
  type: string;
  options?: AttrOptions;
}

export type AttrType =
  | "bool"
  | "string"
  | "number"
  | "decimal"
  | "json"
  | "ts-dayjs"
  | "uuid"
  | "date-dayjs";

export function attr(value: AttrType, options?: AttrOptions) {
  return (target: any, context: any) => {
    target[`_meta_${context}`] = { type: value, options };
  };
}

export const getAttrMap = (
  obj: any,
  mapping: { [key: string]: Attribute } = {}
): { [key: string]: Attribute } => {
  if (!obj) return mapping;

  for (const key of Object.keys(obj)) {
    if (key.startsWith("_meta_")) {
      mapping[key.replace("_meta_", "")] = obj[key];
    }
  }

  return getAttrMap(Object.getPrototypeOf(obj), mapping);
};
