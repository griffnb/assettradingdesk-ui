import * as dayjs from "dayjs";
import { ISerializer } from "./iserializer";

export default class TSDayJS implements ISerializer {
  deserialize(serialized: unknown) {
    if (typeof serialized == "string") {
      const seconds = parseFloat(serialized);
      if (!isNaN(seconds) && isFinite(seconds)) {
        if (seconds == 0) {
          return null;
        }

        if (isMilliseconds(seconds)) {
          return dayjs.unix(seconds / 1000);
        }

        return dayjs.unix(seconds);
      } else {
        if (serialized == "" || serialized == "null") {
          return null;
        }
      }
    } else if (typeof serialized == "number") {
      if (isMilliseconds(serialized)) {
        return dayjs.unix(serialized / 1000);
      }
      if (serialized == 0) {
        return null;
      }
      return dayjs.unix(serialized);
    }
    return serialized;
  }

  serialize(deserialized: unknown) {
    if (deserialized && dayjs.isDayjs(deserialized)) {
      if (deserialized.unix() === 0) {
        return null;
      }
      return deserialized.unix();
    }

    return deserialized;
  }
}

const isMilliseconds = (num: number) => num > 1e10; // 10,000,000,000 (roughly after 2001 in ms)
