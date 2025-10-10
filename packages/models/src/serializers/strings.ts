import { AttrOptions } from "../decorators/attr";
import { ISerializer } from "./iserializer";

export default class String implements ISerializer {
  deserialize(serialized: string | null, options?: AttrOptions) {
    if (serialized) {
      return serialized.toString();
    }

    if (options?.nullable) {
      return null;
    }
    return "";
  }

  serialize(deserialized: string | null, options?: AttrOptions) {
    if (deserialized) {
      return deserialized.toString();
    } else {
      if (options?.nullable) {
        return null;
      }
      return "";
    }
  }
}
