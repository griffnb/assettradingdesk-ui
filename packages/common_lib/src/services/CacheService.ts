// type error, alert, saving, success

type CacheObject<T> = {
  data: T;
  lastUpdated: number;
};

const CACHE_PREFIX = "_CACHE_";

class CacheServiceClass {
  private static instance: CacheServiceClass;

  public static getInstance(): CacheServiceClass {
    if (!CacheServiceClass.instance) {
      CacheServiceClass.instance = new CacheServiceClass();
    }

    return CacheServiceClass.instance;
  }

  set<T>(key: string, data: T): void {
    const cacheData: CacheObject<T> = {
      data: data,
      lastUpdated: Date.now(),
    };

    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheData));
  }

  delete(key: string): void {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  }

  get<T>(key: string): T | null {
    const cacheString = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cacheString) {
      return null;
    }
    const cacheData = JSON.parse(cacheString);
    if (cacheData && cacheData.data) {
      return cacheData.data as T;
    }
    return null;
  }

  getExpiring<T>(key: string, timeoutMS: number): T | null {
    const cacheString = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cacheString) {
      return null;
    }
    const cacheData = JSON.parse(cacheString);
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
export const CacheService = CacheServiceClass.getInstance();
