import crypto from "node:crypto";
import { v4 as uuidv4, validate } from "uuid";
// Generate a UUID
export function generateUUID(): string {
  return uuidv4();
}
export function isUUID(val: string): boolean {
  return validate(val);
}

export function getUrlString(
  params: object,
  keys: string[] = [],
  isArray = false
): string {
  const p = Object.keys(params)
    .map((key) => {
      //@ts-expect-error its url params
      const val = params[key];

      if (
        "[object Object]" === Object.prototype.toString.call(val) ||
        Array.isArray(val)
      ) {
        if (Array.isArray(params)) {
          keys.push("");
        } else {
          keys.push(key);
        }
        return getUrlString(val, keys, Array.isArray(val));
      } else {
        let tKey = key;

        if (keys.length > 0) {
          const tKeys = isArray ? keys : [...keys, key];
          tKey = tKeys.reduce((str, k) => {
            return "" === str ? k : `${str}[${k}]`;
          }, "");
        }
        if (isArray) {
          return `${tKey}[]=${val}`;
        } else {
          return `${tKey}=${val}`;
        }
      }
    })
    .join("&");

  keys.pop();
  return p;
}

/**
 * Returns the plural of an English word.
 *
 * @export
 * @param {string} word
 * @param {number} [amount]
 * @returns {string}
 */
export function plural(word: string): string {
  const plural: { [key: string]: string } = {
    "(quiz)$": "$1zes",
    "^(ox)$": "$1en",
    "([m|l])ouse$": "$1ice",
    "(matr|vert|ind)ix|ex$": "$1ices",
    "(x|ch|ss|sh)$": "$1es",
    "([^aeiouy]|qu)y$": "$1ies",
    "(hive)$": "$1s",
    "(?:([^f])fe|([lr])f)$": "$1$2ves",
    "(shea|lea|loa|thie)f$": "$1ves",
    sis$: "ses",
    "([ti])um$": "$1a",
    "(tomat|potat|ech|her|vet)o$": "$1oes",
    "(bu)s$": "$1ses",
    "(alias)$": "$1es",
    "(octop)us$": "$1i",
    "(ax|test)is$": "$1es",
    "(us)$": "$1es",
    "([^s]+)$": "$1s",
  };
  const irregular: { [key: string]: string } = {
    move: "moves",
    foot: "feet",
    goose: "geese",
    sex: "sexes",
    child: "children",
    man: "men",
    tooth: "teeth",
    person: "people",
  };
  const uncountable: string[] = [
    "sheep",
    "fish",
    "deer",
    "moose",
    "series",
    "species",
    "money",
    "rice",
    "information",
    "equipment",
    "bison",
    "cod",
    "offspring",
    "pike",
    "salmon",
    "shrimp",
    "swine",
    "trout",
    "aircraft",
    "hovercraft",
    "spacecraft",
    "sugar",
    "tuna",
    "you",
    "wood",
  ];
  // save some time in the case that singular and plural are the same
  if (uncountable.indexOf(word.toLowerCase()) >= 0) {
    return word;
  }
  // check for irregular forms
  for (const w in irregular) {
    const pattern = new RegExp(`${w}$`, "i");
    const replace = irregular[w];
    if (pattern.test(word)) {
      return word.replace(pattern, replace as string);
    }
  }
  // check for matches using regular expressions
  for (const reg in plural) {
    const pattern = new RegExp(reg, "i");
    if (pattern.test(word)) {
      return word.replace(pattern, plural[reg] as string);
    }
  }
  return word;
}

export function genHash(): string {
  return (Math.random() + 1).toString(36).substring(2);
}

export function extractDomainFromEmail(email: string): string {
  // Check if the email is valid
  if (!email || !email.includes("@")) {
    return "";
  }

  // Split the email by '@' and return the domain part
  return email.split("@")[1] as string;
}

export function normalizeStr(str: string): string {
  //Match golang backend sanatizing
  return str.replace(/[^a-zA-Z0-9\\+]+/, "").toLowerCase();
}

export function reverseString(str: string): string {
  // Split the string into an array of characters,
  // reverse the array, and then join it back into a string.
  return str.split("").reverse().join("");
}

export function isValidUrl(url: string): boolean {
  try {
    return Boolean(new URL(url));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
}

export async function sha256Hex(input: string): Promise<string> {
  // Convert the input string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  let hashBuffer;
  if (typeof window === "undefined") {
    // Node.js environment (Server-side)

    const hash = crypto.createHash("sha256");
    hash.update(input);
    hashBuffer = hash.digest();
  } else {
    // Browser environment (Client-side)
    hashBuffer = await window.crypto.subtle?.digest("SHA-256", data);
  }

  // Convert the hash ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// uses [key] as a placeholder in the template string
export function replaceURLValues(
  template: string,
  values: Record<string, string>,
  removeFromValues?: boolean
): string {
  // Use a more explicit type signature for the replacement function
  return template.replace(
    /\[([^\]]+)\]/g,
    (match: string, key: string): string => {
      const replacement = values[key];
      if (removeFromValues) {
        delete values[key];
      }
      // Explicitly handle undefined values to ensure a string is always returned
      if (replacement) {
        return replacement.toString();
      }
      return match;
    }
  );
}

function stableStringify(obj: object) {
  const allKeys: string[] = [];
  JSON.stringify(obj, (key, value) => {
    if (typeof key === "string") allKeys.push(key);
    return value;
  });
  allKeys.sort();
  return JSON.stringify(obj, allKeys);
}

export function hashPayload(payload: object) {
  const now = new Date();
  now.setSeconds(0, 0); // Sets seconds and milliseconds to 0
  const unixTimeToTheMinute = Math.floor(now.getTime() / 1000);

  const dataString = stableStringify(payload);
  return sha256Hex(dataString + unixTimeToTheMinute.toString());
}

export function capitalize(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function titleCase(sentence: string): string {
  if (!sentence) return "";
  return sentence
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to normalize phone numbers to 9 digits
export function normalizePhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, "");
  // Extract the last 10 digits (considering the scenario where we might have a leading country code)
  return digits.length >= 10 ? digits.slice(-10) : digits.padStart(10, "0");
}

// Function to format the normalized phone number according to the given pattern
export function formatPhoneNumber(
  normalizedNumber: string,
  pattern: string
): string {
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === "x" && digitIndex < normalizedNumber.length) {
      result += normalizedNumber[digitIndex++];
    } else {
      result += pattern[i];
    }
  }
  return result;
}

export function objectToQueryParams(obj: object) {
  // Ensure the input is an object
  if (typeof obj !== "object" || obj === null) {
    return "";
  }

  // Create an array to hold the encoded key-value pairs
  const queryParams: string[] = [];

  // Iterate over the object's properties
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Encode the key and the value, and combine them into a key=value pair
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(
        obj[key as keyof typeof obj] as string
      );
      queryParams.push(encodedKey + "=" + encodedValue);
    }
  }

  // Join the key-value pairs with '&' and return
  return queryParams.join("&");
}

export function snakeCase(sentence: string): string {
  return sentence.replace(/\s+/g, "_").toLowerCase();
}

export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}

// Parses query string into proper array objects
export function getQueryParams(
  search: string
): Record<string, string | string[]> {
  const params = new URLSearchParams(search);
  const queryParams: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    if (queryParams[key]) {
      // If the parameter already exists, convert it to an array and append the new value
      if (Array.isArray(queryParams[key])) {
        (queryParams[key] as string[]).push(value);
      } else {
        queryParams[key] = [queryParams[key] as string, value];
      }
    } else {
      queryParams[key] = value; // First occurrence of the parameter
    }
  });

  return queryParams;
}

export function buildQueryString(params: Record<string, any>): string {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // If the value is an array, create multiple instances of the same key
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      } else {
        // Otherwise, just encode the key-value pair
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join("&");

  return queryString;
}
