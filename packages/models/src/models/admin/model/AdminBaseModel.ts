import { BaseModel } from "@/models/BaseModel";
import { attr } from "@/models/decorators/attr";
import { ValidationClass } from "@/utils/validations";

class Bookmarks extends ValidationClass {
  reports: Bookmark[] = [];
  pages: Bookmark[] = [];
}

export type Bookmark = {
  type: string;
  name: string;
  url: string;
};

export class AdminBaseModel extends BaseModel {
  @attr("string") name: string = "";
  @attr("string") email: string = "";
  @attr("string") phone: string = "";
  @attr("number") role: number = 0;

  @attr("string") slack_id: string = "";
  @attr("json") bookmarks: Bookmarks = new Bookmarks();
}
