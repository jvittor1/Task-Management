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
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
