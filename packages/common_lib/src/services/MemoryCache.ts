// type error, alert, saving, success

type CacheObject<T> = {
  data: T;
  lastUpdated: number;
};

const CACHE_PREFIX = "_CACHE_";

class MemoryCacheServiceClass {
  private static instance: MemoryCacheServiceClass;

  cache: { [key: string]: any } = {};

  public static getInstance(): MemoryCacheServiceClass {
    if (!MemoryCacheServiceClass.instance) {
      MemoryCacheServiceClass.instance = new MemoryCacheServiceClass();
    }

    return MemoryCacheServiceClass.instance;
  }

  set<T>(key: string, data: T): void {
    const cacheData: CacheObject<T> = {
      data: data,
      lastUpdated: Date.now(),
    };

    this.cache[`${CACHE_PREFIX}${key}`] = cacheData;
  }

  delete(key: string): void {
    delete this.cache[`${CACHE_PREFIX}${key}`];
  }

  get<T>(key: string): T | null {
    const cacheData = this.cache[`${CACHE_PREFIX}${key}`];
    if (cacheData && cacheData.data) {
      return cacheData.data as T;
    }
    return null;
  }

  getExpiring<T>(key: string, timeoutMS: number): T | null {
    const cacheData = this.cache[`${CACHE_PREFIX}${key}`];

    if (
      cacheData &&
      cacheData.data &&
      Date.now() - cacheData.lastUpdated < timeoutMS
    ) {
      return cacheData.data as T;
    }
    return null;
  }

  private constructor() {}
}
// Export the single instance
export const MemoryCache = MemoryCacheServiceClass.getInstance();
