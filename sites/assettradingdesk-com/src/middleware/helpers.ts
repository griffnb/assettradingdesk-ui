export const productKeyFromHostname = (
  hostname: string,
  defaultKey: string,
): string => {
  const domainParts = hostname.split(".");
  if (domainParts.length < 2) {
    return defaultKey;
  }

  return domainParts[domainParts.length - 2];
};

export const getDomain = (hostname: string): string => {
  const domainParts = hostname.split(".");
  if (domainParts.length < 2) {
    if (domainParts[0].includes("localhost")) {
      return "localhost";
    }
    return "";
  }

  if (domainParts.length == 2) {
    return domainParts.join(".");
  }

  if (domainParts.length > 2) {
    return domainParts.slice(-2).join(".");
  }

  return "";
};

export const storeUrlParams = async (
  host: string,
  params: URLSearchParams,
  cookies: any, // Will be properly typed from context when called
) => {
  // Parse URL parameters from the request

  const paramsObject: Record<string, string> = {};

  const safeParams = ["gclid", "fbclid", "msclkid"];
  const unwantedParams = ["utm_partner"];
  params.forEach((value, key) => {
    if (
      (key.startsWith("utm_") || safeParams.includes(key)) &&
      !unwantedParams.includes(key)
    ) {
      paramsObject[key] = value;
    }
  });

  // Retrieve and parse existing `urlParams` cookie
  const existingParams = cookies.get("urlParams")?.json() || {};

  // If we have new params, use only those. Otherwise keep existing ones
  const mergedParams =
    Object.keys(paramsObject).length > 0 ? paramsObject : existingParams;

  // Store the merged object back in the `urlParams` cookie with a 90-day expiration
  cookies.set("urlParams", JSON.stringify(mergedParams), {
    path: "/",
    domain: `.${getDomain(host)}`,
    maxAge: 60 * 60 * 24 * 90,
  });
};
