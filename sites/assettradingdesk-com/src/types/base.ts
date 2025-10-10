import type { RegistrationModel } from "@/models/models/registration/RegistrationModel";
import type { Settings } from "@/models/models/sage_product/SageProductBaseModel";
import type { SageProductModel } from "@/models/models/sage_product/SageProductModel";
import type { SagePage } from "@/sage/SageLibrary";
import type { TrackingValues } from "@/sage/types/Types";

export interface BaseProps<T> {
  product: SageProductModel;
  trackingValues: TrackingValues;
  productSettings: Settings;
  cvars: T;
  sageURL: string;
  page: SagePage;
  testMode?: boolean;
  debugMode?: boolean;
  variation: string;
  ad_id: number;
  lp_id: number;
  geo: Geo;
  registration?: RegistrationModel;
}

export type Geo = {
  city: string | null;
  country: string | null;
  continent: string | null;
  longitude: string | null;
  latitude: string | null;
  region: string | null;
  region_code: string | null;
  metro_code: string | null;
  postal_code: string | null;
  timezone: string | null;
  ip: string | null;
  utc_offset?: string;
  gmt_offset?: string;
};
