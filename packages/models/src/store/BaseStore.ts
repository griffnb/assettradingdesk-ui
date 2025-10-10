import { IStore } from "../types/store";

export type ModelClass<T> = {
  new (store: IStore<T>): T;
};

export type IBaseStoreModel = {
  _store: IStore<any>;
  _newModel: boolean;
  setAttributes(attributes: any, dirty?: boolean): void;
};

export class BaseStore<T extends IBaseStoreModel> {
  _class: ModelClass<T> = {} as any;

  loadMany(data: any[]): T[] {
    const records: T[] = [];
    data.forEach((record) => {
      const obj = this.load(record);
      records.push(obj);
    });

    return records;
  }

  load(data: any): T {
    const obj = this._createObject(data);
    return obj;
  }

  create(attrs?: Partial<T>): T {
    const obj = this._createObject(attrs || {}, true);
    obj._newModel = true;
    return obj;
  }

  _createObject(attributes: any, dirty?: boolean): T {
    const obj = new this._class(this as any);
    obj._store = this as unknown as IStore<any>;
    obj.setAttributes(attributes, dirty);
    return obj;
  }
}
