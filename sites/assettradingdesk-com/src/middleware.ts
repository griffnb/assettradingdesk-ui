import { getTimezoneOffsets } from "@/utils/time";
import { defineMiddleware } from "astro:middleware";

import type { Geo } from "./types/base";

/**
   To use cloudflare secrets and non public, you gotta do this
  const { env } = locals.runtime; // requires @astrojs/cloudflare adapter
**/

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, params, locals, request } = context;
  if (url.pathname === "/health") {
    // Health check endpoint
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
