import dayjs from "dayjs";
import { attr } from "./decorators/attr";

import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { StoreModel } from "./store/StoreModel";
// Globally Extends dayjs
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export type SafeBaseModel<T> = BaseModel & T;

export class BaseModel extends StoreModel {
  tryValidation: boolean = false;

  @attr("string") urn: string = "";
  @attr("number") disabled: number = 0;
  @attr("number") deleted: number = 0;

  @attr("number") status: number = 0;

  @attr("string") created_by_urn: string | null = null;
  @attr("string") updated_by_urn: string | null = null;
  @attr("date-dayjs", { readOnly: true }) created_at: dayjs.Dayjs | null = null;
  @attr("date-dayjs", { readOnly: true }) updated_at: dayjs.Dayjs | null = null;

  @attr("string") created_by_name: string = "";
  @attr("string") updated_by_name: string = "";

  get createdAtFmt() {
    if (!this.created_at) {
      return "";
    }
    return this.created_at.tz(dayjs.tz.guess()).format("YYYY-MM-DD HH:mm");
  }

  get updatedAtFmt() {
    if (!this.updated_at) {
      return "";
    }

    return this.updated_at.tz(dayjs.tz.guess()).format("YYYY-MM-DD HH:mm");
  }
}
