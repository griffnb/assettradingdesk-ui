export const getUserTimezone = (): string => {
  const offset = -new Date().getTimezoneOffset() / 60; // Offset in hours
  const sign = offset >= 0 ? "+" : "-";
  const formattedOffset = Math.abs(offset).toString().padStart(2, "0"); // Pad single digits

  return `GMT${sign}${formattedOffset}`;
};

export function formatDateToWords(inputTargetDate: string | Date): {
  day: string;
  time: string;
} {
  let targetDate: Date;
  if (typeof inputTargetDate === "string") {
    targetDate = new Date(inputTargetDate); // Parse date
  } else {
    targetDate = inputTargetDate;
  }
  const now = new Date();

  // Define days and time display variables
  let dayLabel = "";
  const isToday = now.toDateString() === targetDate.toDateString();
  const isTomorrow =
    new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
    targetDate.toDateString();

  if (isToday) {
    dayLabel = "Today";
  } else if (isTomorrow) {
    dayLabel = "Tomorrow";
  } else {
    dayLabel = targetDate.toLocaleDateString(undefined, { weekday: "long" }); // e.g., "Monday"
  }

  // Format time in AM/PM format
  const timeString = targetDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { day: dayLabel, time: timeString };
}

type TimezoneOffsets = {
  gmtOffset: string;
  utcOffset: string;
};

export function getTimezoneOffsets(timezone: string): TimezoneOffsets {
  const date = new Date();

  // Get the local time in the specified timezone
  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: timezone })
  );

  // Calculate the offset in minutes relative to UTC
  const timezoneOffsetMinutes = Math.round(
    (localDate.getTime() - date.getTime()) / (1000 * 60)
  );

  // Convert the offset to hours and minutes
  const offsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60);
  const offsetMinutes = Math.abs(timezoneOffsetMinutes) % 60;

  // Format GMT and UTC offsets
  const sign = timezoneOffsetMinutes >= 0 ? "+" : "-";
  const gmtOffset = `${sign}${offsetHours}`;
  const utcOffset = `${sign}${String(offsetHours).padStart(2, "0")}:${String(
    offsetMinutes
  ).padStart(2, "0")}`;

  return { gmtOffset, utcOffset };
}
