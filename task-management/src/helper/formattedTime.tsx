import dayjs from "dayjs";

export function formatTimeRange(startTime: string, endTime: string) {
  const start = dayjs(startTime, "HH:mm");
  const end = dayjs(endTime, "HH:mm");

  const formattedStart = start.format("HH:mm");
  const formattedEnd = end.format("HH:mm");

  return `${formattedStart} - ${formattedEnd}`;
}
