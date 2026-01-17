import { ValidationRulesType } from "../utils/validations";
import { observable } from "mobx";
// use this inside of a yield* $yieldAwait(myfunction())
export function* $yieldAwait<T>(p: Promise<T>): Generator<Promise<T>, T, T> {
  const v: T = yield p;
  return v;
}

export function newObservable<T extends object>(
  obj: T,
  rules: ValidationRulesType<T> = {},
) {
  return observable({
    ...obj,
    tryValidation: false,
    validationRules: rules,
  });
}
