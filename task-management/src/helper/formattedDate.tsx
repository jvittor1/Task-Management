import { Dayjs } from "dayjs";

export function formattedDate(date: Dayjs): string {
  console.log(date);

  const dateObject = date.toDate();

  console.log(dateObject);

  const formattedDateString = dateObject.toISOString().slice(0, 10);

  console.log(formattedDateString);

  return formattedDateString;
}
