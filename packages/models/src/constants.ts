import { browser } from "@/models/constants/browser";
import { os } from "@/models/constants/os";
import { platform } from "@/models/constants/platform";
import { states } from "@/models/constants/states";
import { countries } from "./constants/countries";
import { constants as account } from "./models/account/constants";
import { constants as admin } from "./models/admin/constants";
import { IConstant, Status } from "./types/constants";
export function findConstant(
  collection: IConstant[],
  attrValue: number | string,
  attrName: keyof IConstant = "id"
): IConstant {
  const constant = collection.find((el: IConstant) => {
    if (typeof attrValue === "string") {
      return (
        el[attrName]?.toString().toLowerCase() ===
        attrValue.toString().toLowerCase()
      );
    } else {
      return el[attrName] === attrValue;
    }
  });

  if (constant) {
    return constant;
  }

  return {
    id: -1,
    label: "",
  };
}

export function findConstantOrUndefined(
  collection: IConstant[],
  attrValue: number | string,
  attrName: keyof IConstant = "id"
): IConstant | undefined {
  const constant = findConstant(collection, attrValue, attrName);

  if (constant && constant.id === -1) {
    return undefined;
  }

  return constant;
}

export function findStatus(
  collection: Status[],
  attrValue: number,
  attrName = "id"
): Status {
  const constant = collection.find((el: any) => {
    return el[attrName] === attrValue;
  });

  if (constant) {
    return constant;
  }

  return {
    id: -1,
    label: "",
    class: "",
  };
}

export const model_constants = {
  admin,
  account,
};

export const constants = {
  ...model_constants,
  countries,
  states,
  browser,
  platform,
  os,
};
