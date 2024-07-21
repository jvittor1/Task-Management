import { Dayjs } from "dayjs";

export function formattedDate(date: Dayjs): string {
  const dateObject = date.toDate();
  const formattedDateString = dateObject.toISOString().slice(0, 10);
  return formattedDateString;
}

export function formattedStringToDate(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);

  const now = new Date();

  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
}

export function formattedDateStringToDate(dateString: string): Date {
  const [month, day, year] = dateString.split("/").map(Number);

  return new Date(year, month - 1, day);
}

export function formatFilterDate(dateStr: string): string {
  if (!dateStr || typeof dateStr !== "string" || dateStr.length !== 10) {
    throw new Error(
      "Invalid date. Date must have the following format: YYYY-MM-DD.",
    );
  }

  const [year, month, day] = dateStr.split("-");

  return `${month}/${day}/${year}`;
}
