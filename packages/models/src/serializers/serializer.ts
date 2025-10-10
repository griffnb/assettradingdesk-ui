import isEmpty from "@/utils/empty";
import { AttrOptions, getAttrMap } from "../decorators/attr";

import Bool from "./bool";
import DateDayJS from "./date-dayjs";
import Decimal from "./decimal";
import { ISerializer } from "./iserializer";
import JSONB from "./json";
import Number from "./number";
import String from "./strings";
import TSDayJS from "./ts-dayjs";
import UUID from "./uuid";

export const deserializeObject = (obj: any, newValues: any) => {
  const attrMap = getAttrMap(obj);
  for (const key in newValues) {
    const attr = attrMap[key];
    if (attr) {
      if (attr.type == "json") {
        if (obj[key]) {
          const mapData = deserialize(newValues[key], attr.type, attr.options);
          if (mapData) {
            if (Array.isArray(mapData)) {
              obj[key] = mapData;
            } else {
              // Handles the case of we deleted a key so when its reloaded, the key doesnt come back and reset
              // the instance
              if (!attr.options?.classType) {
                const newInstance = new obj[key].constructor();
                Object.assign(obj[key], newInstance);
              } else {
                const newInstance = new attr.options.classType();
                Object.assign(obj[key], newInstance);
              }

              applyMapToInstance(obj[key], mapData);
            }
          }
          continue;
        }
      }
      obj[key] = deserialize(newValues[key], attr.type, attr.options);
    }
  }
  return obj;
};

export const serializeObject = (obj: any, allData?: boolean) => {
  const attrMap = getAttrMap(obj);
  const serialized: any = {};

  for (const key in attrMap) {
    const attr = attrMap[key];
    if (!attr) {
      continue;
    }
    if (attr.options?.readOnly) {
      continue;
    }

    if (
      !obj._newModel && // if im not new
      !allData // im not forcing sending home everything
    ) {
      // Im undefined which means i was never set, skip
      if (obj._dirtyAttributes[key] === undefined) {
        continue;
      }

      // Im null, but im not nullable or im not a uuid, skip
      if (
        obj._dirtyAttributes[key] == null &&
        !attr.options?.nullable &&
        attr.type != "uuid"
      ) {
        continue;
      }
    }

    // if new model and empty, skip
    if (obj._newModel && isEmpty(obj[key])) {
      continue;
    }

    // if im dirty or a new model,serialize it
    const serializedValue = serialize(obj[key], attr.type, attr.options);

    //   if my serialized value hasnt changed, dont push
    if (obj._loaded_attributes[key] == serializedValue && !allData) {
      continue;
    }
    serialized[key] = serializedValue;
  }

  serialized.id = obj.id;
  serialized.urn = obj.urn;

  return serialized;
};

const deserialize = (value: any, type: string, options?: AttrOptions) => {
  return SerializerRegistry[type]?.deserialize(value, options);
};

const serialize = (value: any, type: string, options?: AttrOptions) => {
  return SerializerRegistry[type]?.serialize(value, options);
};

const applyMapToInstance = (instance: any, map: any) => {
  for (const key in map) {
    instance[key] = map[key];
  }
};

const SerializerRegistry: { [key: string]: ISerializer } = {
  "date-dayjs": new DateDayJS(),
  bool: new Bool(),
  decimal: new Decimal(),
  string: new String(),
  "ts-dayjs": new TSDayJS(),
  json: new JSONB(),
  number: new Number(),
  uuid: new UUID(),
};
