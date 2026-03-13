import { ValidationClass } from "@/common_lib/utils/validations";

export class ModelMetaData extends ValidationClass {
  legacy_id: number = 0;

  constructor() {
    super();
  }
}
