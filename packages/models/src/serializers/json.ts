import { AttrOptions } from "../decorators/attr";
import { Store } from "../store/Store";
import { ISerializer } from "./iserializer";

export default class JSONB implements ISerializer {
  [key: string]: any;
  deserialize(serialized: any, options?: AttrOptions) {
    if (typeof serialized == "string") {
      if (serialized == "") {
        return options?.defaultValue || null;
      }

      try {
        const jsonObj = JSON.parse(serialized);

        if (options?.classType) {
          const classType = options.classType;
          const classObj = new classType();
          if (classObj.setAttributes) {
            classObj.setAttributes(serialized);
            return classObj;
          } else {
            Object.assign(classObj, jsonObj);
            return classObj;
          }
        }

        return jsonObj;
      } catch (e) {
        console.error(e, serialized);
        return options?.defaultValue || null;
      }
    } else if (serialized == null) {
      return options?.defaultValue || serialized;
    } else if (!Array.isArray(serialized) && typeof serialized == "object") {
      if (options?.classType) {
        const classType = options.classType;
        const classObj = new classType();
        if (classObj.setAttributes) {
          classObj.setAttributes(serialized);
          return classObj;
        } else {
          Object.assign(classObj, serialized);
          return classObj;
        }
      }

      if (options?.storeKey) {
        return Store[options.storeKey].load(serialized);
      }

      return serialized;
    } else if (Array.isArray(serialized)) {
      if (options?.classType) {
        const classes = serialized.map((item: any) => {
          const classType = options.classType;
          const classObj = new classType();
          if (classObj.setAttributes) {
            classObj.setAttributes(item);

            return classObj;
          } else {
            Object.assign(classObj, item);
            return classObj;
          }
        });
        return classes;
      }

      return serialized;
    } else {
      console.error("Invalid JSON Type", serialized, typeof serialized);
    }
    return serialized;
  }

  serialize(deserialized: any): string {
    const cleanObject = (obj: any): any => {
      if (Array.isArray(obj)) {
        // Recursively clean each element if it's an array
        return obj.map((item) => cleanObject(item));
      } else if (typeof obj === "object" && obj !== null) {
        const cleanObj: { [key: string]: any } = {};
        Object.keys(obj).forEach((key) => {
          if (key === "validationRules" || key === "tryValidation") return; // Skip these keys
          if (key.startsWith("_")) return; // Skip keys that start with "_"

          cleanObj[key] = cleanObject(obj[key]); // Recursively clean nested objects
        });
        return cleanObj;
      }
      return obj; // Return primitive values as they are
    };

    try {
      const cleaned = cleanObject(deserialized);
      return cleaned;
    } catch (e) {
      console.error(e);
      return "";
    }
  }
}
