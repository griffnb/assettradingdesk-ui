import { ISerializer } from "./iserializer";

export default class UUID implements ISerializer {
  deserialize(serialized: string | null) {
    if (serialized) {
      return serialized.toString();
    }
    return null;
  }

  serialize(deserialized: string | null) {
    if (deserialized) {
      if (deserialized == "") {
        return null;
      }

      return deserialized.toString();
    } else {
      return null;
    }
  }
}
