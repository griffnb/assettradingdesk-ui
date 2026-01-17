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
  attrName = "id",
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
