import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@heroui/react";

const toDoubleTimeDigits = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${toDoubleTimeDigits(year)}-${toDoubleTimeDigits(month)}-${toDoubleTimeDigits(day)} ${toDoubleTimeDigits(hour)}:${toDoubleTimeDigits(minute)}:${toDoubleTimeDigits(second)}`;
  return result;
};

export const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

export const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);
  const date = dateObject.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  return `${date} WIB`;
};

export function toISODateString(
  date: string | DateValue | undefined,
): string | undefined {
  if (!date) return undefined;

  // Jika sudah string → kembalikan apa adanya
  if (typeof date === "string") {
    return date;
  }

  // Jika DateValue → ubah ke string (HeroUI DateValue → CalendarDate)
  if ("toString" in date) {
    return date.toString(); // Output: "2025-11-30"
  }

  return undefined;
}
