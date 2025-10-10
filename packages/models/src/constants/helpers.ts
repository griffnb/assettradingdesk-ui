import { IConstant } from "../types/constants";

export function areEqual(a: IConstant, b: IConstant): boolean {
  return a.id.toString() === b.id.toString();
}

export function isIDEqual(a: IConstant, id: string | number): boolean {
  return a.id.toString() === id.toString();
}
