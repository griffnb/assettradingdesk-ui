import isEmpty from "@/utils/empty";

const getMergedValues = <T extends Record<string, any>>(cvars: T, defaultCvars: T): T => {
  const mergedValues: T = { ...defaultCvars };
  for (const key in defaultCvars) {
    if (defaultCvars.hasOwnProperty(key)) {
      const cvarKey = key as keyof T;
      const value = cvars[cvarKey];
      if (!isEmpty(value)) {
        mergedValues[cvarKey] = value;
      }
      if (value === "__blank__") {
        mergedValues[cvarKey] = "" as T[keyof T];
      }
    }
  }

  return mergedValues;
}

export default getMergedValues;
