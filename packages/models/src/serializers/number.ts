import { AttrOptions } from "../decorators/attr";
import { ISerializer } from "./iserializer";

export default class Number implements ISerializer {
  deserialize(serialized: any, options?: AttrOptions) {
    if ((serialized == null || serialized == undefined) && options?.nullable) {
      return null;
    }
    const num = parseFloat(serialized);
    if (isNaN(num)) {
      if (options?.nullable) {
        return null;
      }
      return 0;
    }
    return num;
  }

  serialize(deserialized: any, options?: AttrOptions) {
    if (deserialized != null) {
      const num = parseFloat(deserialized);
      if (isNaN(num)) {
        return 0;
      }
      return num;
    } else {
      if (options?.nullable) {
        return null;
      }
      return 0;
    }
  }
}
