import { StoreKeys } from "@/models/types/store_keys";

export type Breadcrumb = {
  title: string;
  url: string;
};

export type ParentInfo = {
  model: StoreKeys;
  id: string;
};
