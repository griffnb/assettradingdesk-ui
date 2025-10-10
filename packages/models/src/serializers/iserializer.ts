import { AttrOptions } from "../decorators/attr";

export interface ISerializer {
  deserialize(serialized: any, options?: AttrOptions): any;
  serialize(deserialized: any, options?: AttrOptions): any;
}
