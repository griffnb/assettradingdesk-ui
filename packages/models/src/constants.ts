import { browser } from "@/models/constants/browser";
import { os } from "@/models/constants/os";
import { platform } from "@/models/constants/platform";
import { states } from "@/models/constants/states";
import { countries } from "./constants/countries";
import { constants as account } from "./models/account/constants";
import { constants as admin } from "./models/admin/constants";
import { constants as asset } from "./models/asset/constants";
import { constants as asset_file } from "./models/asset_file/constants";
import { constants as category } from "./models/category/constants";
import { constants as client } from "./models/client/constants";
import { constants as company } from "./models/company/constants";
import { constants as facility } from "./models/facility/constants";
import { constants as industry } from "./models/industry/constants";
import { constants as manufacturer } from "./models/manufacturer/constants";
import { constants as opportunity } from "./models/opportunity/constants";
import { constants as organization } from "./models/organization/constants";
import { constants as pipeline } from "./models/pipeline/constants";
import { constants as request } from "./models/request/constants";
import { IConstant, Status } from "./types/constants";
export function findConstant(
  collection: IConstant[],
  attrValue: number | string,
  attrName: keyof IConstant = "id",
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
  attrName: keyof IConstant = "id",
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
  attrName: keyof Status = "id",
): Status {
  const constant = collection.find((el: Status) => {
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
  asset,
  asset_file,
  category,
  client,
  company,
  facility,
  industry,
  manufacturer,
  organization,
  opportunity,
  pipeline,
  request,
};

export const constants = {
  ...model_constants,
  countries,
  states,
  browser,
  platform,
  os,
};
