import type { Settings } from "@/models/models/sage_product/SageProductBaseModel";
import { getPublicEnvVar } from "@/utils/env";

export const SiteDefaults = (productSettings: Settings): Settings => {
  let siteDefaults: Settings;

  switch (getPublicEnvVar("PUBLIC_ENVIRONMENT")) {
    case "production":
      siteDefaults = {
        bing_id: "",
        meta_id: "",
        adwords_id: "",
        google_ua_id: "",
        google_gtm_id: "GTM-WNDSQ8T",
        adwords_send_to_conversion_event: "", // "AW-10880607912/RZNHCMnh49UDEKjNo8Qo",
        adwords_conversion_event: "",
        bing_conversion_event: "",
        default_ad_id: 55,
        default_lp_id: 7,
        utm_ad_map: {},
      };
      break;
    default:
      siteDefaults = {
        bing_id: "",
        adwords_id: "",
        meta_id: "",
        google_ua_id: "",
        google_gtm_id: "GTM-WNDSQ8T",
        adwords_send_to_conversion_event: "",
        adwords_conversion_event: "",
        bing_conversion_event: "",
        default_ad_id: 1,
        default_lp_id: 1,
        utm_ad_map: {},
      };
      break;
  }

  const cleanSettings = Object.keys(productSettings).reduce((acc, key) => {
    const value = productSettings[key as keyof Settings];
    if (value !== null) {
      // @ts-ignore
      acc[key as keyof Settings] = value as any;
    }
    return acc;
  }, {} as Partial<Settings>);

  const mergedValues: Settings = { ...siteDefaults, ...cleanSettings };
  return mergedValues;
};
