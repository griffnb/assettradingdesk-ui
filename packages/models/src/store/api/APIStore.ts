import { IJSONAPI, ServerService } from "@/common_lib/services/ServerService";
import { URLParams } from "@/common_lib/types/url";

import { NoLeadingSlash } from "@/common_lib/types/helpers";
import { StoreResponse } from "../../types/store";
import { StoreKeys } from "../../types/store_keys";
import { BaseStore, IBaseStoreModel, ModelClass } from "../BaseStore";

type APIStoreOptions<T> = {
  _class: ModelClass<T>;
  modelName: StoreKeys;
  modelRoute?: string;
};

type CacheObject = {
  data: any;
  lastUpdated: number;
};

// Set to 0 to disable
const DEFAULT_TTL = 500; // 500 ms

interface Options extends RequestInit {
  skipCache?: boolean;
  silentError?: boolean;
  customTTL?: number;
}

export class APIStore<T extends IBaseStoreModel> extends BaseStore<T> {
  modelName: StoreKeys | "" = "";
  modelRoute: string = "";
  _cache: Map<string, CacheObject> = new Map();

  removeKey(key: string): void {
    this._cache.delete(key);
  }

  checkCache(key: string, ttl: number): any {
    if (ttl === 0) return null;

    const cache = this._cache.get(key);
    if (cache && Date.now() - cache.lastUpdated < ttl) {
      return cache.data;
    } else {
      this.removeKey(key);
    }
    return null;
  }

  setCache(key: string, data: any): void {
    this._cache.set(key, { data, lastUpdated: Date.now() });
  }

  buildKey(modelName: string, path: string, params: any): string {
    return `${modelName}-${path}-${JSON.stringify(params)}`;
  }

  constructor(options: APIStoreOptions<T>) {
    super();
    this._class = options._class;
    this.modelName = options.modelName;
    this.modelRoute = options.modelRoute || options.modelName;
  }

  async query(
    params: URLParams,
    options?: Options,
  ): Promise<StoreResponse<T[]>> {
    const cacheData = this.checkCache(
      this.buildKey(this.modelRoute, "", params),
      options?.customTTL || DEFAULT_TTL,
    );
    if (cacheData && !options?.skipCache) {
      return {
        success: true,
        data: this.loadMany(cacheData) || [],
      } as StoreResponse<T[]>;
    }

    const resp = await ServerService.callGet(
      this.modelRoute,
      "",
      params,
      options,
    );
    if (resp && resp.data) {
      this.setCache(this.buildKey(this.modelRoute, "", params), resp.data);
      return { success: true, data: this.loadMany(resp.data) || [] };
    } else {
      return { success: false, error: resp.error };
    }
  }

  async queryRecord<Path extends string>(
    path: NoLeadingSlash<Path>,
    params: URLParams,
    options?: Options,
  ): Promise<StoreResponse<T>> {
    const cacheData = this.checkCache(
      this.buildKey(this.modelRoute, path, params),
      options?.customTTL || DEFAULT_TTL,
    );
    if (cacheData && !options?.skipCache) {
      if (Array.isArray(cacheData) && cacheData.length > 0) {
        return {
          data: this.load(cacheData),
          success: true,
        };
      }
      return { success: true, data: this.load(cacheData) };
    }

    const resp = await ServerService.callGet(
      this.modelRoute,
      path,
      params,
      options,
    );
    if (resp && resp.data) {
      this.setCache(this.buildKey(this.modelRoute, "", params), resp.data);
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        return {
          data: this.load(resp.data[0]),
          success: true,
        };
      }
      return { success: true, data: this.load(resp.data) };
    } else {
      return { success: false, error: resp.error };
    }
  }

  async queryRecords<Path extends string>(
    path: NoLeadingSlash<Path>,
    params: URLParams,
    options?: Options,
  ): Promise<StoreResponse<T[]>> {
    const cacheData = this.checkCache(
      this.buildKey(this.modelRoute, path, params),
      options?.customTTL || DEFAULT_TTL,
    );
    if (cacheData && !options?.skipCache) {
      return { success: true, data: this.loadMany(cacheData) } as StoreResponse<
        T[]
      >;
    }

    const resp = await ServerService.callGet(
      this.modelRoute,
      path,
      params,
      options,
    );
    if (resp && resp.data) {
      this.setCache(this.buildKey(this.modelRoute, "", params), resp.data);
      return {
        success: true,
        data: this.loadMany(resp.data) as T[],
      } as StoreResponse<T[]>;
    } else {
      return { success: false, error: resp.error } as StoreResponse<T[]>;
    }
  }

  async get(id: string, options?: Options): Promise<StoreResponse<T>> {
    const cacheData = this.checkCache(
      this.buildKey(this.modelRoute, "", { id }),
      options?.customTTL || DEFAULT_TTL,
    );
    if (cacheData && !options?.skipCache) {
      return { success: true, data: this.load(cacheData) };
    }

    const resp = await ServerService.callGet(
      this.modelRoute,
      `${id}`,
      undefined,
      options,
    );
    if (resp && resp.data) {
      this.setCache(this.buildKey(this.modelRoute, "", { id }), resp.data);
      return { success: true, data: this.load(resp.data) };
    } else {
      return { success: false, error: resp.error };
    }
  }

  async getRaw(id: string, options?: Options): Promise<StoreResponse<unknown>> {
    const cacheData = this.checkCache(
      this.buildKey(this.modelRoute, "", { id }),
      options?.customTTL || DEFAULT_TTL,
    );
    if (cacheData && !options?.skipCache) {
      return { success: true, data: cacheData };
    }

    const resp = await ServerService.callGet(
      this.modelRoute,
      `${id}`,
      undefined,
      options,
    );
    return resp;
  }

  async saveNew(
    serializedData: any,
    extraParams?: URLParams,
  ): Promise<IJSONAPI | null> {
    const payload = {
      data: {
        ...serializedData,
      },
    };
    const resp = await ServerService.callPost(
      this.modelRoute,
      ``,
      payload,
      extraParams || {},
    );

    return resp;
  }

  async saveUpdate(
    id: string,
    serializedData: any,
    extraParams?: URLParams,
  ): Promise<IJSONAPI | null> {
    const payload = {
      data: {
        ...serializedData,
      },
    };
    const resp = await ServerService.callPut(
      this.modelRoute,
      `${id}`,
      payload,
      extraParams || {},
    );

    return resp;
  }

  dataToRecord(data: any): T {
    const record = this.load(data) as T;
    return record;
  }

  dataToRecords(data: any): T[] {
    return this.loadMany(data) || [];
  }
}
