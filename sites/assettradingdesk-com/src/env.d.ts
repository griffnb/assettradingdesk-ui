/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// import type ProductModel from "@/models/models/product/ProductModel";

declare namespace App {
  interface Locals {
    ad_id: number | null;
    lp_id: number | null;
    product?: any;
    metas?: any;
    trackingValues?: import("@/sage/types/Types").TrackingValues;
    cvars?: import("@/sage/types/Cvars").SageCvars;
    sageURL?: string;
    urlVariation?: string;
    pageType?: string;
    testMode?: boolean;
    debugMode?: boolean;
    geo: import("@/models/types/base").Geo;
  }
}
