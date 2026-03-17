import { IConstant } from "../types/constants";
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
  /** Enum constants array for automatic lookup getter generation */
  enum?: IConstant[];
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
  | "date-dayjs"
  | "answers";

/**
 * Finds a constant in a collection by its id value.
 * Used internally by enum getters.
 */
function findEnumConstant(
  collection: IConstant[],
  attrValue: number | string,
): IConstant {
  const constant = collection.find((el: IConstant) => el.id === attrValue);
  return constant ?? { id: -1, label: "" };
}

export function attr(value: AttrType, options?: AttrOptions) {
  return (target: any, context: any) => {
    target[`_meta_${context}`] = { type: value, options };

    // If enum option is provided, add a getter for the enum lookup
    if (options?.enum) {
      const enumGetterName = `${context}Enum`;
      const enumCollection = options.enum;

      Object.defineProperty(target, enumGetterName, {
        get() {
          return findEnumConstant(enumCollection, this[context]);
        },
        enumerable: true,
        configurable: true,
      });
    }
  };
}

export const getAttrMap = (
  obj: any,
  mapping: { [key: string]: Attribute } = {},
): { [key: string]: Attribute } => {
  if (!obj) return mapping;

  for (const key of Object.keys(obj)) {
    if (key.startsWith("_meta_")) {
      mapping[key.replace("_meta_", "")] = obj[key];
    }
  }

  return getAttrMap(Object.getPrototypeOf(obj), mapping);
};
