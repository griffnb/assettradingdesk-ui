import { ValidationClass } from "@/utils/validations";

export class MetaData extends ValidationClass {
  legacy_id: number = 0;
  small_image: string = "";
  medium_image: string = "";
  large_image: string = "";

  constructor(data?: Partial<MetaData>) {
    super();
    Object.assign(this, data);
  }
}
