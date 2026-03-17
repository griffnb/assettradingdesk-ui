/**
 * Format phone number to (xxx) xxx-xxxx format.
 */
export const formatPhone = (value: string | null | undefined) => {
  if (!value) {
    return "";
  }

  const digits = value.replace("+1", "").replace(/[^\d]/g, "");
  if (digits.length == 11) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  }
  if (digits.length <= 3) return digits;
  if (digits.length <= 7)
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 7)}`;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Format phone number to E164 format. Assumes this is
 * a US number and adds the +1 international code if not present.
 */
export const toE164 = (phone: string) => {
  if (phone.startsWith("+1")) return phone.replace(/[^+0-9]/gi, "");
  return `+1${phone.replace(/[^0-9]/gi, "")}`;
};

/**
 * Standardize a phone number for comparisons by removing any non-numeric characters.
 */
export function standardizePhoneNumber(phone = "") {
  return phone.replace(/[^0-9]/gi, "");
}

export function isPhoneNumberMatch(phone1: string, phone2: string) {
  return (
    /\d+/.test(phone1) &&
    /\d+/.test(phone2) &&
    standardizePhoneNumber(phone1) === standardizePhoneNumber(phone2)
  );
}

export function isValidPhone(string: string) {
  return toE164(string).length === 12;
}
