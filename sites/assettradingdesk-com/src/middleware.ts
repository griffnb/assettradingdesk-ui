import { getSageURL } from "@/sage/SageInitialize";
import { SageLibrary } from "@/sage/SageLibrary";
import { idDecode, idEncode } from "@/utils/encode";
import { getTimezoneOffsets } from "@/utils/time";
import { defineMiddleware } from "astro:middleware";

import { getDomain, storeUrlParams } from "./middleware/helpers";
import { getAdID, loadCvars, loadSage, loadSite } from "./middleware/sage";
import type { Geo } from "./types/base";

/**
   To use cloudflare secrets and non public, you gotta do this
  const { env } = locals.runtime; // requires @astrojs/cloudflare adapter
**/

const validDomains = ["localhost", "pages.dev"];
const specialPages = ["thankyou"];

const redirects: Record<string, string> = {};

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, params, locals, request } = context;
  if (url.pathname === "/health") {
    // Health check endpoint
    return next();
  }

  if (redirects[url.pathname]) {
    return new Response(null, {
      status: 301,
      headers: { Location: redirects[url.pathname] },
    });
  }

  if (url.pathname.startsWith("/c")) {
    return next();
  }

  if (url.pathname.startsWith("/checkout")) {
    // checkout bounce
    return next();
  }

  // API endpoint, need CORS headers
  if (url.pathname.startsWith("/api/")) {
    if (request.method === "OPTIONS") {
      let headers = new Headers();
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT",
      );
      headers.append(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );
      return new Response(null, { headers });
    }

    const response = await next();

    const headers = new Headers(response.headers);
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    headers.append(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");
    headers.append("Surrogate-Control", "no-store");

    return new Response(response.body, {
      ...response,
      headers: headers,
    });
  }

  if (url.pathname.match(/\.[^.]+$/)) {
    // File extension detected
    return next();
  }

  if (!validDomains.includes(getDomain(url.hostname))) {
    return new Response("Invalid domain", { status: 403 });
  }

  // Split URL pieces
  const paramMetas: string[] = params.metas ? params.metas.split("/") : [];

  if (paramMetas.length > 0) {
    if (specialPages.includes(paramMetas[0])) {
      locals.pageType = paramMetas[0];
      locals.urlVariation = paramMetas.slice(1).join("/");
    } else {
      locals.urlVariation = paramMetas.join("/");
    }
  }

  const testMode = url.searchParams.get("testMode") === "true";

  // ------ Load Product/Site -------------------
  const product = await loadSite(url, testMode, "");
  // ---------------------------------------------

  // ------ Initialize Sage -------------------

  const adId = getAdID(product, url.searchParams);
  const encAdID = idEncode(adId || 0);
  const sageTrackingValues = await loadSage(encAdID, url, cookies, testMode);
  console.log("Sage Tracking Values", sageTrackingValues);
  // ---------------------------------------------

  // ------ Load Cvars ----------------

  let encodedLPID = sageTrackingValues.lp;

  let lpID = encodedLPID ? idDecode(encodedLPID) : 0;
  if (!encodedLPID) {
    if (product.settings && product.settings.default_lp_id) {
      encodedLPID = idEncode(product.settings.default_lp_id);
      lpID = product.settings.default_lp_id;
    } else {
      encodedLPID = "";
    }
  }

  const cvars = await loadCvars(url, encodedLPID, testMode);

  // ---------------------------------------------
  locals.ad_id = adId;
  locals.lp_id = lpID;
  locals.cvars = cvars;
  locals.sageURL = getSageURL(url.hostname);
  locals.trackingValues = sageTrackingValues;
  locals.testMode = testMode;
  locals.debugMode = url.searchParams.get("debug") === "true";

  const geo: Geo = {
    city: request.headers.get("cf-ipcity"),
    country: request.headers.get("cf-ipcountry"),
    continent: request.headers.get("cf-ipcontinent"),
    longitude: request.headers.get("cf-iplongitude"),
    latitude: request.headers.get("cf-iplatitude"),
    region: request.headers.get("cf-region"),
    region_code: request.headers.get("cf-region-code"),
    metro_code: request.headers.get("cf-metro-code"),
    postal_code: request.headers.get("cf-postal-code"),
    timezone: request.headers.get("cf-timezone"),
    ip: request.headers.get("cf-connecting-ip"),
  };
  if (geo.timezone) {
    const { utcOffset, gmtOffset } = getTimezoneOffsets(geo.timezone);
    geo.utc_offset = utcOffset;
    geo.gmt_offset = gmtOffset;
  }
  const country = url.searchParams.get("country");
  const continent = url.searchParams.get("continent");
  if (country) geo.country = country;
  if (continent) geo.continent = continent;

  locals.geo = geo;

  SageLibrary.callEvent(sageTrackingValues, `pageview`, {
    [SageLibrary.PARAM_PAGE]: locals.pageType || "landing",
  });

  // Store URL parameters in a cookie
  storeUrlParams(url.hostname, url.searchParams, cookies);

  // Dont cache the response since its dynamic
  const response = await next();
  const headers = new Headers(response.headers);
  headers.append(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  headers.append("Pragma", "no-cache");
  headers.append("Expires", "0");
  headers.append("Surrogate-Control", "no-store");

  return new Response(response.body, {
    ...response,
    headers: headers,
  });
});
