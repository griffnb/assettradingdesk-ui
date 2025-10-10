import { MemoryCache } from "@/common_lib/services/MemoryCache";
import { SageProductModel } from "@/models/models/sage_product/SageProductModel";
import { SageInitialize } from "@/sage/SageInitialize";
import { SageServerService } from "@/sage/SageServerService";
import type { SageCvars } from "@/sage/types/Cvars";
import type { TrackingValues } from "@/sage/types/Types";

import { Store } from "@/models/store/Store";
import type { AstroCookies } from "astro";
import Log from "../logger";
import { getDomain, productKeyFromHostname } from "./helpers";

export const getAdID = (
  product: SageProductModel,
  searchParams: URLSearchParams,
): number | null => {
  const targetPriority = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_adgroupid",
    "utm_term",
  ];

  if (
    !product.settings.utm_ad_map ||
    Object.keys(product.settings.utm_ad_map).length === 0
  ) {
    return product.settings.default_ad_id;
  }

  const paramKeys = Object.keys(product.settings.utm_ad_map);

  let currentTargetPriority = -1;
  let currentAdID = product.settings.default_ad_id;

  paramKeys.forEach((key) => {
    const keyParts = key.split("=");

    if (searchParams.get(keyParts[0]) === keyParts[1]) {
      const priorityLevel = targetPriority.indexOf(keyParts[0]);
      if (priorityLevel > currentTargetPriority) {
        currentTargetPriority = priorityLevel;
        if (product.settings.utm_ad_map && product.settings.utm_ad_map[key]) {
          currentAdID = product.settings.utm_ad_map[key];
        }
      }
    }
  });

  return currentAdID;
};

export const loadSite = async (
  url: URL,
  testMode: boolean,
  defaultKey: string,
): Promise<SageProductModel> => {
  // ------ Load Product/Site -------------------
  let product = MemoryCache.getExpiring<SageProductModel>(
    `product_${url.hostname}`,
    1000 * 60 * 60 * 2,
  ); // expire after 2 hours

  if (!product || testMode) {
    try {
      const rawData = await SageServerService.site(url.hostname, testMode);

      if (rawData) {
        product = Store.sage_product.create();
        product.setAttributes(rawData);
      }
      if (product && product.id) {
        MemoryCache.set(`product_${url.hostname}`, product);
      }
    } catch (e) {
      Log.Error(url.hostname, "Error in fetching product", {
        host: url.hostname,
        testMode,
        error: String(e),
      });
    }
  }

  if (!product || !product.id) {
    product = Store.sage_product.create();
    product.product_key = productKeyFromHostname(url.hostname, defaultKey);
  }

  return product;
};

const adIdMap: { [key: string]: string } = {
  "/": "fXhhV",
  "/m": "Ivwfvj",
  "/news/v1": "xvqiBV",
  "/tv": "bvitVNQ",
  "/kit": "pfVNqs",
  "/starter/kit": "OVvNeg",
};

export const loadSage = async (
  encodedAdID: string,
  url: URL,
  cookies: AstroCookies,
  testMode: boolean,
): Promise<TrackingValues> => {
  const isThankyouPage = url.pathname.includes("/thankyou");
  let existingTrackingValues: TrackingValues = {};

  if (!testMode) {
    const rawSageTrackingValues = cookies.get("sage_tracking");
    if (rawSageTrackingValues) {
      existingTrackingValues = rawSageTrackingValues.json();
    }
  }

  const adIdFromMap = adIdMap[url.pathname];
  if (!url.searchParams.get("a") && adIdFromMap) {
    url.searchParams.set("a", adIdFromMap);
    delete existingTrackingValues.lp;
    delete existingTrackingValues.a;
  }

  const hasUtmInUrl = [...url.searchParams.keys()].some((key) =>
    key.startsWith("utm_"),
  );
  if (hasUtmInUrl && !isThankyouPage) existingTrackingValues = {};
  const hasLPInUrl = [...url.searchParams.keys()].some((key) =>
    key.startsWith("lp"),
  );
  if (hasLPInUrl) {
    delete existingTrackingValues.lp;
    delete existingTrackingValues.a;
  }

  try {
    const newSageTrackingValues = await SageInitialize({
      adID: encodedAdID,
      url: url,
      beaconType: "ad",
      existingTrackingValues,
      hostname: url.hostname,
    });

    const { utm_partner, partner_id, ...withoutPartnerTracking } =
      newSageTrackingValues;

    cookies.set("sage_tracking", JSON.stringify(withoutPartnerTracking), {
      path: "/",
      domain: `.${url.hostname}`,
      maxAge: 60 * 60 * 24 * 90,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 5),
    });

    storeSageCookies(
      url.hostname,
      {
        c_sk: newSageTrackingValues.c_sk || "",
        c_guid: newSageTrackingValues.c_guid || "",
      },
      cookies,
    );

    return newSageTrackingValues;
  } catch (e) {
    Log.Error(url.hostname, "Error in fetching sage", {
      error: String(e),
      adID: encodedAdID,
      url: url,
      beaconType: "ad",
      existingTrackingValues,
      hostname: url.hostname,
    });
    return existingTrackingValues;
  }
};

export const loadCvars = async (
  url: URL,
  encodedLPID: string,
  testMode: boolean,
): Promise<SageCvars> => {
  let cvars = MemoryCache.getExpiring<SageCvars>(
    `cvars_${encodedLPID}`,
    1000 * 60 * 60 * 2,
  ); // expire after 2 hours

  //TODO: Add default cvars
  const cvarDefaults = {};
  if (!cvars || (testMode && encodedLPID && encodedLPID != "")) {
    try {
      cvars = await SageServerService.cvars(encodedLPID, testMode);

      if (cvars) {
        MemoryCache.set(`cvars_${encodedLPID}`, cvars);
      }
    } catch (e) {
      Log.Error(url.hostname, "Error in fetching cvars", {
        error: String(e),
        encodedLPID,
        testMode,
      });
    }
  }

  if (!cvars) {
    cvars = {
      cvars: {},
      id: 0,
      css: "",
      variation: "",
    };
  }

  cvars.cvars = Object.assign({}, cvarDefaults, cvars?.cvars);
  return cvars;
};

export const storeSageCookies = async (
  host: string,
  cookieValues: { c_sk: string; c_guid: string },
  cookies: AstroCookies,
) => {
  for (const key in cookieValues) {
    const val = cookieValues[key as keyof typeof cookieValues];
    if (!val || val === "") {
      continue;
    }
    cookies.set(key, val, {
      path: "/",
      domain: `.${getDomain(host)}`,
      maxAge: 60 * 60 * 24 * 90,
    });
  }
};
