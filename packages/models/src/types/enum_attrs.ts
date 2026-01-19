import { IConstant } from "./constants";
/**
 * Generates getter names for enum fields.
 * Transforms "role" -> "roleEnum", "org_role" -> "org_roleEnum"
 */
type EnumGetterName<K extends string> = `${K}Enum`;

/**
 * Creates a type with enum getters for specified field names.
 * Pass a union of field names and get back {fieldName}Enum getters.
 *
 * @example
 * ```typescript
 * // Simple union of field names
 * interface AccountBaseModel extends WithEnumGetters<"role" | "org_role"> {}
 *
 * // Now available: account.roleEnum, account.org_roleEnum
 * ```
 */
export type WithEnumGetters<TFields extends string> = {
  readonly [K in TFields as EnumGetterName<K>]: IConstant;
};
