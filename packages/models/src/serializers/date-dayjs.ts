import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AttrOptions } from "../decorators/attr";
import { ISerializer } from "./iserializer";
// Globally Extends dayjs
dayjs.extend(utc);
export default class DateDayJS implements ISerializer {
  deserialize(serialized: any, options?: AttrOptions) {
    if (serialized) {
      if (options?.saveFormat) {
        return dayjs.utc(serialized, options.saveFormat);
      }
      return dayjs.utc(serialized);
    }
    return serialized;
  }

  serialize(deserialized: any, options?: AttrOptions) {
    if (deserialized && dayjs.isDayjs(deserialized)) {
      return deserialized.format(options?.saveFormat || "YYYY-MM-DD");
    }
    return deserialized;
  }
}
