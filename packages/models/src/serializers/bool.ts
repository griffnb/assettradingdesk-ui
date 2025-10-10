import { ISerializer } from "./iserializer";

export default class Bool implements ISerializer {
  deserialize(serialized: any) {
    if (serialized === null || serialized === undefined || serialized === "") {
      return null;
    }

    if (typeof serialized === "boolean") {
      return serialized;
    }

    if (typeof serialized === "string") {
      if (serialized.toLowerCase() === "true") {
        return true;
      } else if (serialized.toLowerCase() === "false") {
        return false;
      }
    }

    return null;
  }

  serialize(deserialized: any) {
    if (deserialized === null || deserialized === undefined) {
      return null;
    }

    if (typeof deserialized === "boolean") {
      return deserialized;
    }

    return null;
  }
}
