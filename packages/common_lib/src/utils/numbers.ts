import dayjs from "dayjs";

// Safe checking of number or string
export function equals(a: number | string, b: number | string): boolean {
  if (typeof a == "number" || typeof b == "number") {
    if (typeof a == "number") {
      a = a.toString();
    }

    if (typeof b == "number") {
      b = b.toString();
    }

    return a === b;
  }

  return a === b;
}

// Safe checking of array that could be string or number
export function inArray(
  array: (number | string)[],
  value: number | string
): boolean {
  for (const item of array) {
    if (equals(item, value)) {
      return true;
    }
  }

  return false;
}

export function getPrecision(str: string): number {
  if (!str.includes(".")) return 0;
  return str.split(".")?.[1]?.length || 0;
}

export function formatNumber(num: number, x = 0): string {
  if (isNaN(num)) return "0";
  const strNum = num.toFixed(x);
  if (x > 0) {
    return strNum.replace(/\B(?=(\d{3})+(?!\d)(?=\.))/g, ",");
  } else {
    return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatPercent(percent: number, decimalPlaces = 2): string {
  // Format the percent with the specified decimal places
  const formattedPercent = (percent * 100).toFixed(decimalPlaces);

  // Add the percentage symbol
  return `${formattedPercent}%`;
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNumeric(num: any): boolean {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

export function roundToDecimal(num: number, decPlaces = 0) {
  const multiplier = 10 ** decPlaces;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

export function weekOfMonth(input = dayjs()) {
  const firstDayOfMonth = input.clone().startOf("month");
  const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

  const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

  return Math.ceil((input.date() + offset) / 7);
}
