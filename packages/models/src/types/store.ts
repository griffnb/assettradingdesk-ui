import { IJSONAPI } from "@/common_lib/services/ServerService";

type QueryParams = { [key: string]: string | string[] };
export interface IStore<T> {
  query(params: QueryParams, skipCache?: boolean): Promise<StoreResponse<T[]>>;
  queryRecord(
    path: string,
    params: QueryParams,
    skipCache?: boolean
  ): Promise<StoreResponse<T>>;
  queryRecords(
    path: string,
    params: QueryParams,
    skipCache?: boolean
  ): Promise<StoreResponse<T[]>>;
  get(id: string, skipCache?: boolean): Promise<StoreResponse<T>>;
  create(attrs?: any): T;
  dataToRecord(data: any): T;
  dataToRecords(data: any): T[];
  getRaw(id: string): Promise<IJSONAPI>;
  saveNew(
    payload: any,
    extraParams?: { [key: string]: string | string[] }
  ): Promise<StoreResponse<T>>;
  saveUpdate(
    id: string,
    payload: any,
    extraParams?: { [key: string]: string | string[] }
  ): Promise<StoreResponse<T>>;
}

export type StoreResponse<T> = {
  data?: T;
  success: boolean;
  error?: string;
};
