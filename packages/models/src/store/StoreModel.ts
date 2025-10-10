import { attr, getAttrMap } from "../decorators/attr";
import { deserializeObject, serializeObject } from "../serializers/serializer";

import { action, makeObservable, observe } from "mobx";
import { IStore, StoreResponse } from "../types/store";

export class StoreModel {
  // store to save through

  @attr("uuid") id: string | null = null;
  _model_name: string = "";
  _store: IStore<any>;
  _dirtyAttributes: { [key: string]: any } = {};
  _newModel: boolean = true;
  _loaded_attributes: { [key: string]: any } = {};

  constructor(store: IStore<any>) {
    this._store = store;
  }

  setAttributes(attrs: any, dirty?: boolean) {
    deserializeObject(this, attrs);
    if (!dirty) {
      this._loaded_attributes = attrs;
      this._dirtyAttributes = {};
    } else {
      this._dirtyAttributes = attrs;
    }
    if (this.id && this.id != "") {
      this._newModel = false;
    }
  }

  getAttributes(): object {
    const attrMap = getAttrMap(this);
    const data: { [key: string]: any } = {};
    for (const key in attrMap) {
      data[key] = this[key as keyof this];
    }

    return data;
  }

  getWriteFields(): string[] {
    const attrMap = getAttrMap(this);
    const keys: string[] = [];
    for (const key in attrMap) {
      // Allow tags
      if (attrMap[key]?.options?.readOnly && key !== "tags") {
        continue;
      }

      keys.push(key);
    }

    return keys;
  }

  toBaseObject<T>(): T {
    const attrMap = getAttrMap(this);
    const data: { [key: string]: any } = {};
    for (const key in attrMap) {
      // Allow tags
      if (attrMap[key]?.options?.readOnly && key !== "tags") {
        continue;
      }

      if (attrMap[key]?.type === "json") {
        const values = { ...this[key as keyof this] };
        delete values["validationRules" as keyof typeof values];
        delete values["tryValidation" as keyof typeof values];
        data[key] = values;
      } else {
        data[key] = this[key as keyof this];
      }
    }

    return data as T;
  }

  copyChangesFrom(other: StoreModel) {
    for (const key in other._dirtyAttributes) {
      //@ts-expect-error this copies over dirty attributes, it doesnt like it in typescript since its lower level
      this[key as keyof this] = other[key as keyof typeof other];
    }
  }

  rollback() {
    /* setting to null first causes issues with the mobx observables
    //const keys = Object.keys(this.attrMap);
    keys.forEach((key) => {
      //@ts-expect-error - i should be able to set these null before reseerializing
      this[key] = null;
    });
    */
    deserializeObject(this, this._loaded_attributes);
    this._dirtyAttributes = {};
  }

  get isDirty(): boolean {
    return Object.keys(this._dirtyAttributes).length > 0;
  }

  serialize(): object {
    return serializeObject(this);
  }

  async save(
    extraParams?: {
      [key: string]: string | string[];
    },
    allData?: boolean
  ): Promise<StoreResponse<undefined>> {
    const serializedData = serializeObject(this, allData);
    if (this.id && this.id != "" && !this._newModel) {
      const data = await this._store.saveUpdate(
        this.id,
        serializedData,
        extraParams
      );

      if (data.success && data.data) {
        this.setAttributes(data.data);
      }
      return data;
    } else {
      const data = await this._store.saveNew(serializedData, extraParams);

      if (data.success && data.data) {
        this.setAttributes(data.data);
      }

      return data;
    }
  }

  async reload(): Promise<StoreResponse<undefined>> {
    if (this.id) {
      const data = await this._store.getRaw(this.id);
      if (data.success && data.data) {
        this.setAttributes(data.data);
      }
      return data;
    } else {
      return Promise.resolve({ success: true });
    }
  }

  get attrMap() {
    return getAttrMap(this);
  }

  addObserve(obj: any, parentClass?: any, dirtyField?: string) {
    const properties: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (key[0] !== "_") {
        properties[key] = true;
      }
    });

    if (!parentClass) {
      properties["save"] = action;
      properties["reload"] = action;
      properties["setAttributes"] = action;
      properties["rollback"] = action;
      properties["_dirtyAttributes"] = true;
    }

    makeObservable(obj, properties);

    observe(obj, (change: any) => {
      // For subclasses, this sets the parent attribute as dirty when there is a change
      if (parentClass && dirtyField) {
        parentClass._dirtyAttributes[dirtyField] = change.newValue;
        return;
      }

      if (change.name == "_dirtyAttributes") {
        return;
      }

      obj._dirtyAttributes[change.name] = change.newValue;
    });
  }
}
