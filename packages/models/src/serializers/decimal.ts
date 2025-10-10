import { ISerializer } from "./iserializer";

export default class Decimal implements ISerializer {
  deserialize(serialized: any) {
    const num = parseFloat(serialized);
    if (isNaN(num)) {
      return 0;
    }
    return num;
  }

  serialize(deserialized: any) {
    if (deserialized) {
      return deserialized.toString();
    } else {
      return "0";
    }
  }
}
