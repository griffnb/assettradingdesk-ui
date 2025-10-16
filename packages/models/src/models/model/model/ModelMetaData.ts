import { ValidationClass } from "@/utils/validations";

export class ModelMetaData extends ValidationClass {
  legacy_id: number = 0;

  constructor() {
    super();
  }
}
